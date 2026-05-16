export const runtime = 'edge'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { generateText } from '@/lib/openai'
import { createServerSupabase } from '@/lib/supabase/server'
import { buildUserPrompt, RATE_LIMIT_PER_DAY, SYSTEM_PROMPT } from '@/constants/prompts'
import { parseGeneratedContent } from '@/lib/utils'
import type { GenerateFormInput, GenerateApiResponse } from '@/types'

export async function POST(req: NextRequest): Promise<NextResponse<GenerateApiResponse>> {
  // 1. 認証確認
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  // 2. リクエストボディのパース
  let body: GenerateFormInput
  try {
    body = (await req.json()) as GenerateFormInput
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 })
  }

  // 3. バリデーション
  if (!body.shopName?.trim() || !body.menuName?.trim()) {
    return NextResponse.json({ error: '店舗名と商品名は必須です' }, { status: 400 })
  }

  const supabase = createServerSupabase()

  // 4. プロフィール取得（なければ作成）
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert({ clerk_id: userId }, { onConflict: 'clerk_id' })
    .select('id')
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: 'プロフィールの取得に失敗しました' }, { status: 500 })
  }

  // 5. レート制限チェック
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
      { error: `1日の生成上限（${RATE_LIMIT_PER_DAY}回）に達しました。明日またお試しください。` },
      { status: 429 },
    )
  }

  // 6. AI生成
  const userPrompt = buildUserPrompt(body)
  let rawContent: string
  let tokensUsed: number

  try {
    const result = await generateText(SYSTEM_PROMPT, userPrompt)
    rawContent = result.content
    tokensUsed = result.tokensUsed
    console.log('AI response:', rawContent)
  } catch (err) {
    console.error('OpenAI error:', err)
    return NextResponse.json(
      { error: 'AI生成中にエラーが発生しました。しばらくしてから再試行してください。' },
      { status: 503 },
    )
  }

  // 7. レスポンスのパース
  const generated = parseGeneratedContent(rawContent)

  // 8. DB保存（レート制限更新 + 履歴保存）
  const [, generationResult] = await Promise.all([
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

  if (generationResult.error) {
    console.error('DB save error:', generationResult.error)
    // DB保存失敗でもレスポンスは返す（生成結果は捨てない）
  }

  return NextResponse.json({ data: generated, tokensUsed })
}
