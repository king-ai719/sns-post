'use client'

import { useState } from 'react'

import ImageUploader from './ImageUploader'
import { useImageUpload } from '@/hooks/useImageUpload'
import type { GenerateFormInput, Mood, Target } from '@/types'

const MOODS: Mood[] = ['温かみ', 'おしゃれ', '活気', 'こだわり', 'ナチュラル', 'ラグジュアリー']
const TARGETS: Target[] = ['ランチ層', 'ディナー層', '女性', '男性', '家族連れ', 'カップル', '学生', 'ビジネスマン']

interface PostFormProps {
  onSubmit: (input: GenerateFormInput) => void
  isLoading: boolean
}

export default function PostForm({ onSubmit, isLoading }: PostFormProps) {
  const [shopName, setShopName] = useState('')
  const [menuName, setMenuName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [mood, setMood] = useState<Mood>('温かみ')
  const [target, setTarget] = useState<Target>('ランチ層')
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const { upload, preview, isUploading, clearPreview } = useImageUpload()

  const handleImageSelect = async (file: File) => {
    const url = await upload(file)
    if (url) setImageUrl(url)
  }

  const handleClearImage = () => {
    clearPreview()
    setImageUrl(undefined)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shopName.trim() || !menuName.trim()) return

    onSubmit({
      shopName: shopName.trim(),
      menuName: menuName.trim(),
      price: price ? parseInt(price, 10) : undefined,
      description: description.trim(),
      mood,
      target,
      imageUrl,
    })
  }

  const isDisabled = isLoading || isUploading || !shopName.trim() || !menuName.trim()

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 画像アップロード */}
      <ImageUploader
        preview={preview}
        isUploading={isUploading}
        onFileSelect={handleImageSelect}
        onClear={handleClearImage}
      />

      {/* 店舗名 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-300">
          店舗名 <span className="text-brand text-xs">必須</span>
        </label>
        <input
          type="text"
          className="input"
          placeholder="例: 焼鳥 鳥善"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          maxLength={50}
          required
        />
      </div>

      {/* 商品名 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-300">
          商品・メニュー名 <span className="text-brand text-xs">必須</span>
        </label>
        <input
          type="text"
          className="input"
          placeholder="例: 特製塩焼き鳥盛り合わせ"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          maxLength={80}
          required
        />
      </div>

      {/* 価格 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-300">
          価格（任意）
        </label>
        <div className="relative">
          <input
            type="number"
            className="input pr-8"
            placeholder="1500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            max={999999}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">円</span>
        </div>
      </div>

      {/* 説明 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-300">
          一言説明（任意）
        </label>
        <textarea
          className="input resize-none"
          rows={3}
          placeholder="例: 地元産の鶏を使った、こだわりの塩だれが自慢の一品"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />
        <p className="text-xs text-zinc-600 text-right">{description.length}/200</p>
      </div>

      {/* 雰囲気 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">投稿の雰囲気</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mood === m
                  ? 'bg-brand text-black'
                  : 'bg-surface-2 text-zinc-400 border border-surface-border hover:border-zinc-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ターゲット */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">ターゲット層</label>
        <div className="flex flex-wrap gap-2">
          {TARGETS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTarget(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                target === t
                  ? 'bg-brand text-black'
                  : 'bg-surface-2 text-zinc-400 border border-surface-border hover:border-zinc-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isDisabled}
        className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            <span>AI生成中...</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
            </svg>
            <span>投稿文を生成する</span>
          </>
        )}
      </button>
    </form>
  )
}
