'use client'

import { UserButton } from '@clerk/nextjs'
import { useUserPlan } from '@/hooks/useUserPlan'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const { plan, isFreePlan } = useUserPlan()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const priceId = process.env.NEXT_PUBLIC_STRIPE_LIGHT_PRICE_ID
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) router.push(data.url)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePortal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) router.push(data.url)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const planLabel: Record<string, string> = {
    free: 'Free',
    light: 'Light',
    pro: 'Pro',
  }

  const planColor: Record<string, string> = {
    free: 'bg-zinc-700 text-zinc-300',
    light: 'bg-blue-500/20 text-blue-300',
    pro: 'bg-yellow-500/20 text-yellow-300',
  }

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-surface-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-gold tracking-widest">SnaPick</h1>
        <div className="flex items-center gap-2">
          {/* プランバッジ */}
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${planColor[plan]}`}>
            {planLabel[plan]}
          </span>

          {/* アップグレード / プラン管理ボタン */}
          {isFreePlan ? (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="text-xs font-bold bg-brand text-black px-3 py-1 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? '...' : 'アップグレード'}
            </button>
          ) : (
            <button
              onClick={handlePortal}
              disabled={loading}
              className="text-xs font-bold bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-600 transition-colors disabled:opacity-50"
            >
              {loading ? '...' : 'プラン管理'}
            </button>
          )}

          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
                userButtonPopoverCard: 'bg-surface-1 border border-surface-border',
                userButtonPopoverActionButton: 'text-white hover:bg-surface-2',
                userButtonPopoverActionButtonText: 'text-white',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}