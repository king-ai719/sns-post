import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  verification: {
    google: "n80d6FPwDq_CK0EN-oV-fnF430UaU_afPhq3J3XAqc8",
  },
  title: 'SnaPick - SNS投稿文を瞬時に作成',
  description: 'SnaPick - 写真と情報を入力するだけで、SnaPickがInstagramなどの投稿文を自動生成します。飲食店・美容院・個人事業主向け。',
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
        <head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-H3G6TGEN6K"
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H3G6TGEN6K');
            `}
          </Script>
        </head>
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