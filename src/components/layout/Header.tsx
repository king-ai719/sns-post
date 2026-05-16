'use client'

import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-surface-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-gold tracking-widest">SnaPick</h1>
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
    </header>
  )
}
