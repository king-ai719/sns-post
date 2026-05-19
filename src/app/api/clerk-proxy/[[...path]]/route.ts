import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const CLERK_FRONTEND_API = 'https://frontend-api.clerk.services'

export async function GET(req: NextRequest) {
  const { pathname, search } = new URL(req.url)
  const path = pathname.replace('/api/clerk-proxy', '')
  const target = `${CLERK_FRONTEND_API}${path}${search}`
  return NextResponse.rewrite(target)
}

export async function POST(req: NextRequest) {
  const { pathname, search } = new URL(req.url)
  const path = pathname.replace('/api/clerk-proxy', '')
  const target = `${CLERK_FRONTEND_API}${path}${search}`
  return NextResponse.rewrite(target)
}