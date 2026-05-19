import { NextRequest, NextResponse } from 'next/server'

const CLERK_FRONTEND_API = 'https://frontend-api.clerk.services'

export async function GET(req: NextRequest) {
  const url = req.url.replace(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/clerk-proxy`,
    CLERK_FRONTEND_API
  )
  return NextResponse.rewrite(url)
}

export async function POST(req: NextRequest) {
  const url = req.url.replace(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/clerk-proxy`,
    CLERK_FRONTEND_API
  )
  return NextResponse.rewrite(url)
}