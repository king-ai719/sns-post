import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'SnaPick - SNS投稿を瞬時に生成',
  description: 'SnaPick - 写真と情報を入力するだけで、AIがInstagramやXの投稿文を自動生成します。飲食店・小規模店舗向け。',
  keywords: ['SNS投稿', 'AI生成', 'Instagram', 'X', 'マーケティング', '飲食店'],
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html lang="ja">
        <body className="bg-surface text-white antialiased">
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid #2A2A2A',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#C9A96E', secondary: '#1A1A1A' },
              },
              error: {
                iconTheme: { primary: '#EF4444', secondary: '#1A1A1A' },
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}