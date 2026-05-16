// ===== フォーム入力 =====
export interface GenerateFormInput {
  shopName: string
  menuName: string
  price?: number
  description: string
  mood: Mood
  target: Target
  imageUrl?: string
}

// ===== AI生成結果 =====
export interface GeneratedContent {
  instagram: string
  xPost: string
  hashtags: string[]
  reelsCaption: string
}

// ===== 生成履歴（DB行） =====
export interface Generation {
  id: string
  userId: string
  shopName: string
  menuName: string
  price?: number
  description?: string
  mood: Mood
  target: Target
  imageUrl?: string
  instagram: string
  xPost: string
  hashtags: string[]
  reelsCaption: string
  tokensUsed?: number
  createdAt: string
}

// ===== 選択肢の型 =====
export type Mood =
  | '温かみ'
  | 'おしゃれ'
  | '活気'
  | 'こだわり'
  | 'ナチュラル'
  | 'ラグジュアリー'

export type Target =
  | 'ランチ層'
  | 'ディナー層'
  | '女性'
  | '男性'
  | '家族連れ'
  | 'カップル'
  | '学生'
  | 'ビジネスマン'

export type Platform = 'instagram' | 'x' | 'reels' | 'hashtags'

// ===== API レスポンス =====
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface GenerateApiResponse extends ApiResponse<GeneratedContent> {
  tokensUsed?: number
}

export interface UploadApiResponse extends ApiResponse<{ url: string }> {}

// ===== レート制限 =====
export interface RateLimitStatus {
  used: number
  limit: number
  remaining: number
  resetAt: string
}
