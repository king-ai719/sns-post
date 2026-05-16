import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { createServerSupabase } from '@/lib/supabase/server'
import { buildUserPrompt, RATE_LIMIT_PER_DAY, SYSTEM_PROMPT } from '@/constants/prompts'
import { parseGeneratedContent } from '@/lib/utils'
import type { GenerateFormInput, GenerateApiResponse } from '@/types'
import Anthropic from '@anthropic-ai/sdk'

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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert({ clerk_id: userId }, { onConflict: 'clerk_id' })
    .select('id')
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: 'プロフィールの取得に失敗しました' }, { status: 500 })
  }

  const today = new Date().toISOString().split('T')[0]!
  const { data: rateLimit } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('user_id', profile.id)
    .eq('date', today)
    .single()

  const currentCount = rateLimit?.count ?? 0
  if (currentCount >= RATE_LIMIT_PER_DAY) {
    return NextResponse.json(
      { error: `1日の生成上限（${RATE_LIMIT_PER_DAY}回）に達しました。` },
      { status: 429 },
    )
  }

  // Anthropicクライアント
  const anthropic = new Anthropic({ apiKey: process.env['ANTHROPIC_API_KEY'] })
  const userPrompt = buildUserPrompt(body)

  // メッセージ構築（画像あり/なし）
  type ContentBlock =
    | { type: 'text'; text: string }
    | { type: 'image'; source: { type: 'url'; url: string } }

  const contentBlocks: ContentBlock[] = []

  if (body.imageUrl) {
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
    supabase.from('rate_limits').upsert(
      { user_id: profile.id, date: today, count: currentCount + 1 },
      { onConflict: 'user_id,date' },
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