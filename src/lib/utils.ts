import type { GeneratedContent } from '@/types'

/**
 * クラス名を結合する
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * OpenAIのJSONレスポンスをパース
 */
export function parseGeneratedContent(raw: string): GeneratedContent {
  try {
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()
    const parsed = JSON.parse(cleaned) as Record<string, unknown>
    return {
      instagram: typeof parsed['instagram'] === 'string' ? parsed['instagram'] : '',
      xPost: typeof parsed['xPost'] === 'string' ? parsed['xPost'] : '',
      hashtags: Array.isArray(parsed['hashtags'])
        ? (parsed['hashtags'] as unknown[]).filter((h): h is string => typeof h === 'string')
        : [],
      reelsCaption: typeof parsed['reelsCaption'] === 'string' ? parsed['reelsCaption'] : '',
    }
  } catch {
    return { instagram: '', xPost: '', hashtags: [], reelsCaption: '' }
  }
}

/**
 * ファイルサイズのバリデーション
 */
export function validateImageFile(file: File): string | null {
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'JPEG・PNG・WebP形式のみアップロードできます'
  }
  if (file.size > MAX_SIZE) {
    return '5MB以下の画像をアップロードしてください'
  }
  return null
}

/**
 * 日付フォーマット
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * X(Twitter)の文字数カウント（URLは23文字換算）
 */
export function countXChars(text: string): number {
  return text.replace(/https?:\/\/\S+/g, '                       ').length
}
