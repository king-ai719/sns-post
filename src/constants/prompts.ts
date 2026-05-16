import type { GenerateFormInput } from '@/types'

export const RATE_LIMIT_PER_DAY = 10

export const MOOD_LABELS: Record<string, string> = {
  温かみ: '温かみのある・アットホームな',
  おしゃれ: 'おしゃれ・スタイリッシュな',
  活気: '活気ある・元気いっぱいな',
  こだわり: 'こだわり・職人気質な',
  ナチュラル: 'ナチュラル・オーガニックな',
  ラグジュアリー: '高級感・特別感のある',
}

export const TARGET_LABELS: Record<string, string> = {
  ランチ層: 'ランチを楽しむ方',
  ディナー層: 'ディナーを楽しむ方',
  女性: '女性の方',
  男性: '男性の方',
  家族連れ: 'ご家族連れの方',
  カップル: 'カップル・デート',
  学生: '学生の方',
  ビジネスマン: 'ビジネスマン・社会人の方',
}

/**
 * システムプロンプト（固定 → OpenAIのキャッシュ効果を活用）
 */
export const SYSTEM_PROMPT = `あなたはSNSマーケティングの専門家です。
飲食店・小規模店舗向けのSNS投稿文を生成してください。

以下のJSON形式のみで返答してください（説明文不要）：
{
  "instagram": "Instagram投稿文（絵文字使用・改行あり・150〜300文字）",
  "xPost": "X(Twitter)投稿文（140文字以内・絵文字使用）",
  "hashtags": ["ハッシュタグ1", "ハッシュタグ2", ...（15〜20個）],
  "reelsCaption": "リール用短文（1〜2文・インパクト重視）"
}

重要なルール：
- 自然な日本語で書く
- 過剰な宣伝表現を避ける
- 読者が行きたくなる具体的な表現を使う
- ハッシュタグは#なしの文字列で返す`

/**
 * ユーザープロンプトを構築（最小限の情報でトークン節約）
 */
export function buildUserPrompt(input: GenerateFormInput): string {
  const mood = MOOD_LABELS[input.mood] ?? input.mood
  const target = TARGET_LABELS[input.target] ?? input.target

  const lines = [
    `店舗名: ${input.shopName}`,
    `商品名: ${input.menuName}`,
    input.price ? `価格: ${input.price.toLocaleString()}円` : null,
    `雰囲気: ${mood}`,
    `ターゲット: ${target}`,
    input.description ? `説明: ${input.description}` : null,
  ].filter(Boolean)

  return lines.join('\n')
}
