'use client'

import { useState } from 'react'
import Image from 'next/image'

import CopyButton from './CopyButton'
import type { GeneratedContent, Platform } from '@/types'

interface ResultCardProps {
  result: GeneratedContent
  imageUrl?: string
  onReset: () => void
}

const PLATFORM_TABS: { id: Platform; label: string; emoji: string }[] = [
  { id: 'instagram', label: 'Instagram', emoji: '📷' },
  { id: 'x', label: 'X', emoji: '𝕏' },
  { id: 'reels', label: 'Reels', emoji: '🎬' },
  { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { id: 'hashtags', label: 'ハッシュタグ', emoji: '#' },
]

export default function ResultCard({ result, imageUrl, onReset }: ResultCardProps) {
  const [activePlatform, setActivePlatform] = useState<Platform>('instagram')

  const contentMap: Record<Platform, string> = {
    instagram: result.instagram,
    x: result.xPost,
    reels: result.reelsCaption,
    tiktok: result.tiktokCaption,
    hashtags: result.hashtags.map((h) => `#${h}`).join(' '),
  }

  const activeContent = contentMap[activePlatform] ?? ''

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <h2 className="font-semibold text-gray-800">生成完了</h2>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          もう一度生成
        </button>
      </div>

      {/* 画像表示 */}
      {imageUrl && (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden max-h-64">
          <Image src={imageUrl} alt="投稿画像" fill className="object-cover" />
        </div>
      )}

      {/* プラットフォームタブ */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {PLATFORM_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePlatform(tab.id)}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activePlatform === tab.id
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      <div className="relative">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-24">
          {activePlatform === 'hashtags' ? (
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map((tag, i) => (
                <span key={i} className="inline-block bg-pink-50 text-brand text-sm px-2.5 py-1 rounded-full border border-pink-200">
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{activeContent}</p>
          )}
        </div>
        <div className="flex justify-end mt-2">
          <CopyButton text={activeContent} />
        </div>
      </div>

      {activePlatform === 'x' && (
        <p className={`text-xs text-right ${result.xPost.length > 140 ? 'text-red-400' : 'text-gray-400'}`}>
          {result.xPost.length}/140文字
        </p>
      )}

      <div className="pt-2 border-t border-gray-200">
        <CopyButton
          text={`【Instagram】\n${result.instagram}\n\n【X】\n${result.xPost}\n\n【リール】\n${result.reelsCaption}\n\n【TikTok】\n${result.tiktokCaption}\n\n【ハッシュタグ】\n${result.hashtags.map((h) => `#${h}`).join(' ')}`}
          className="w-full justify-center"
        />
      </div>
    </div>
  )
}