'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    href: '/',
    label: '生成',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/history',
    label: '履歴',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-1/90 backdrop-blur-md border-t border-surface-border">
      <div className="flex items-center justify-around max-w-xl mx-auto px-4 pb-safe">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-3 px-6 rounded-xl transition-colors ${
                active ? 'text-brand' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon(active)}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
