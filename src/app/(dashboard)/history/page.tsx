'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@clerk/nextjs'
import { useUserPlan } from '@/hooks/useUserPlan'
import { formatDate } from '@/lib/utils'

interface HistoryItem {
  id: string
  shop_name: string
  menu_name: string
  instagram_post: string
  x_post: string
  hashtags: string
  created_at: string
}

export default function HistoryPage() {
  const { userId } = useAuth()
  const { isFreePlan, loading: planLoading } = useUserPlan()
  const [items, setItems] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId || isFreePlan) {
      setIsLoading(false)
      return
    }

    const fetchHistory = async () => {
      const { data } = await supabase
        .from('generations')
        .select(`
          id,
          shop_name,
          menu_name,
          instagram_post,
          x_post,
          hashtags,
          created_at,
          profiles!inner(clerk_id)
        `)
        .eq('profiles.clerk_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (data) setItems(data as HistoryItem[])
      setIsLoading(false)
    }

    void fetchHistory()
  }, [userId, isFreePlan])

  if (isLoading || planLoading) {
    return (
      <div className="space-y-4 py-2">
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
            <div className="bg-gray-200 animate-pulse h-4 rounded w-1/2" />
            <div className="bg-gray-200 animate-pulse h-3 rounded w-full" />
            <div className="bg-gray-200 animate-pulse h-3 rounded w-4/5" />
          </div>
        ))}
      </div>
    )
  }

  // Freeプランの場合
  if (isFreePlan) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center">
          <span className="text-2xl">🔒</span>
        </div>
        <div className="space-y-1">
          <p className="text-gray-800 font-semibold">履歴はLightプラン以上でご利用いただけます</p>
          <p className="text-gray-400 text-sm">アップグレードして生成履歴を保存しましょう</p>
        </div>
        <button
          onClick={async () => {
            const priceId = process.env.NEXT_PUBLIC_STRIPE_LIGHT_PRICE_ID
            const res = await fetch('/api/payments/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ priceId }),
            })
            const data = await res.json()
            if (data.url) window.location.href = data.url
          }}
          className="rounded-full bg-brand text-white px-6 py-2.5 text-sm font-bold hover:bg-brand-dark transition-colors"
        >
          Lightプランにアップグレード ✨
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 3" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-gray-600 font-medium">生成履歴はまだありません</p>
        <p className="text-gray-400 text-sm">投稿文を生成すると、ここに履歴が表示されます</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-2">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">生成履歴</h2>
        <p className="text-sm text-gray-400 mt-0.5">{items.length}件</p>
      </div>

      {items.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-gray-800 text-sm">{item.shop_name}</p>
              <p className="text-gray-400 text-xs">{item.menu_name}</p>
            </div>
            <time className="text-xs text-gray-400 shrink-0">
              {formatDate(item.created_at)}
            </time>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
            {item.instagram_post}
          </p>
        </div>
      ))}
    </div>
  )
}