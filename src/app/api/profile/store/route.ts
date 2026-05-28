import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: '認証が必要です' }, { status: 401 })

  const { storeName } = await req.json()

  const supabase = createServerSupabase()
  const { error } = await supabase
    .from('profiles')
    .update({ store_name: storeName })
    .eq('clerk_id', userId)

  if (error) return NextResponse.json({ error: '保存失敗' }, { status: 500 })
  return NextResponse.json({ success: true })
}