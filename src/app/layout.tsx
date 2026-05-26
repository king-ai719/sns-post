import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'SnaPick - SNS謚慕ｨｿ繧堤椪譎ゅ↓逕滓・',
  description: 'SnaPick - 蜀咏悄縺ｨ諠・ｱ繧貞・蜉帙☆繧九□縺代〒縲、I縺栗nstagram繧Ч縺ｮ謚慕ｨｿ譁・ｒ閾ｪ蜍慕函謌舌＠縺ｾ縺吶る｣ｲ鬟溷ｺ励・蟆剰ｦ乗ｨ｡蠎苓・蜷代￠縲・,
  keywords: ['SNS謚慕ｨｿ', 'AI逕滓・', 'Instagram', 'X', '繝槭・繧ｱ繝・ぅ繝ｳ繧ｰ', '鬟ｲ鬟溷ｺ・],
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