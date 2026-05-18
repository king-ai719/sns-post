import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { createServerSupabase } from '@/lib/supabase/server'
import { buildUserPrompt, SYSTEM_PROMPT } from '@/constants/prompts'
import { parseGeneratedContent } from '@/lib/utils'
import type { GenerateFormInput, GenerateApiResponse } from '@/types'
import Anthropic from '@anthropic-ai/sdk'

// プランごとの月間上限
const PLAN_LIMITS: Record<string, number> = {
  free: 10,
  light: 30,
  pro: 100,
}

// プランごとの画像解析可否
const PLAN_IMAGE_ALLOWED: Record<string, boolean> = {
  free: false,
  light: true,
  pro: true,
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateApiResponse>> {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  let body: GenerateFormInput
  try {
    body = (await req.json()) as GenerateFormInput
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 })
  }

  if (!body.shopName?.trim() || !body.menuName?.trim()) {
    return NextResponse.json({ error: '店舗名と商品名は必須です' }, { status: 400 })
  }

  const supabase = createServerSupabase()

  // プロフィール取得（plan列を追加で取得）
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert({ clerk_id: userId }, { onConflict: 'clerk_id' })
    .select('id, plan')
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: 'プロフィールの取得に失敗しました' }, { status: 500 })
  }

  const plan: string = profile.plan ?? 'free'
  const monthlyLimit = PLAN_LIMITS[plan] ?? 10 
  const imageAllowed = PLAN_IMAGE_ALLOWED[plan] ?? false

  // 画像制限チェック
  if (body.imageUrl && !imageAllowed) {
    return NextResponse.json(
      { error: '画像解析はLightプラン以上でご利用いただけます。' },
      { status: 403 },
    )
  }

  // 月次レート制限チェック
  const now = new Date()
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` // "2026-05"

  const { data: rateLimit } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('user_id', profile.id)
    .eq('year_month', yearMonth)
    .single()

  const currentCount = rateLimit?.count ?? 0
  if (currentCount >= monthlyLimit) {
    return NextResponse.json(
      { error: `今月の生成上限（${monthlyLimit}回）に達しました。プランをアップグレードしてください。` },
      { status: 429 },
    )
  }

  // Anthropicクライアント
  const anthropic = new Anthropic({ apiKey: process.env['ANTHROPIC_API_KEY'] })
  const userPrompt = buildUserPrompt(body)

  type ContentBlock =
    | { type: 'text'; text: string }
    | { type: 'image'; source: { type: 'url'; url: string } }

  const contentBlocks: ContentBlock[] = []

  if (body.imageUrl && imageAllowed) {
    contentBlocks.push({
      type: 'image',
      source: { type: 'url', url: body.imageUrl },
    })
  }

  contentBlocks.push({ type: 'text', text: userPrompt })

  let rawContent = ''
  let tokensUsed = 0

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: contentBlocks }],
    })

    rawContent = response.content[0]?.type === 'text' ? response.content[0].text : '{}'
    tokensUsed = response.usage.input_tokens + response.usage.output_tokens
  } catch (err) {
    console.error('Anthropic error:', err)
    return NextResponse.json(
      { error: 'AI生成中にエラーが発生しました。' },
      { status: 503 },
    )
  }

  const generated = parseGeneratedContent(rawContent)

  await Promise.all([
    // 月次カウントをupsert
    supabase.from('rate_limits').upsert(
      { user_id: profile.id, year_month: yearMonth, count: currentCount + 1 },
      { onConflict: 'user_id,year_month' },
    ),
    supabase.from('generations').insert({
      user_id: profile.id,
      shop_name: body.shopName,
      menu_name: body.menuName,
      price: body.price,
      description: body.description,
      mood: body.mood,
      target: body.target,
      image_url: body.imageUrl,
      instagram_post: generated.instagram,
      x_post: generated.xPost,
      hashtags: JSON.stringify(generated.hashtags),
      reels_caption: generated.reelsCaption,
      tokens_used: tokensUsed,
    }),
  ])

  return NextResponse.json({ data: generated, tokensUsed })
}