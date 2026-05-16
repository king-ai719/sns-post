'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@clerk/nextjs'
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
  const [items, setItems] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchHistory = async () => {
      // profiles.clerk_id経由でjoin（RLSが効いている前提）
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
  }, [userId])

  if (isLoading) {
    return (
      <div className="space-y-4 py-2">
        <div className="h-6 w-24 shimmer rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 space-y-2">
            <div className="shimmer h-4 rounded w-1/2" />
            <div className="shimmer h-3 rounded w-full" />
            <div className="shimmer h-3 rounded w-4/5" />
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 3" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-zinc-400 font-medium">生成履歴はまだありません</p>
        <p className="text-zinc-600 text-sm">投稿文を生成すると、ここに履歴が表示されます</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-2">
      <div>
        <h2 className="text-lg font-semibold text-white">生成履歴</h2>
        <p className="text-sm text-zinc-500 mt-0.5">{items.length}件</p>
      </div>

      {items.map((item) => (
        <div key={item.id} className="card p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-white text-sm">{item.shop_name}</p>
              <p className="text-zinc-500 text-xs">{item.menu_name}</p>
            </div>
            <time className="text-xs text-zinc-600 shrink-0">
              {formatDate(item.created_at)}
            </time>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
            {item.instagram_post}
          </p>
        </div>
      ))}
    </div>
  )
}
