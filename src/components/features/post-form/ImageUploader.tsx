'use client'

import Image from 'next/image'

interface ImageUploaderProps {
  preview: string | null
  isUploading: boolean
  onFileSelect: (file: File) => void
  onClear: () => void
}

export default function ImageUploader({
  preview,
  isUploading,
  onFileSelect,
  onClear,
}: ImageUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        写真（任意）
      </label>

      {preview ? (
        // プレビュー表示
        <div className="relative rounded-xl overflow-hidden w-32 h-32">
          <Image src={preview} alt="プレビュー" fill className="object-cover" />
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      ) : (
        // アップロードエリア
        <label className="block cursor-pointer">
          <div className="border-2 border-dashed border-surface-border rounded-xl p-8 text-center hover:border-brand/50 transition-colors group">
            <div className="flex flex-col items-center gap-2 text-zinc-500 group-hover:text-zinc-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-sm">タップして写真を選択</span>
              <span className="text-xs">JPEG・PNG・WebP / 5MB以下</span>
            </div>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  )
}
