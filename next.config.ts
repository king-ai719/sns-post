import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Cloudflare Pages 向け（Edge Runtime使用時はこちら）
  // output: 'export', // 静的エクスポートが必要な場合のみ
}

export default nextConfig
