export const runtime = 'edge'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { createServerSupabase } from '@/lib/supabase/server'
import { validateImageFile } from '@/lib/utils'
import type { UploadApiResponse } from '@/types'

export async function POST(req: NextRequest): Promise<NextResponse<UploadApiResponse>> {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 })
  }

  const validationError = validateImageFile(file)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const supabase = createServerSupabase()

  // ユニークなファイル名生成
  const ext = file.name.split('.').pop() ?? 'jpg'
  const fileName = `${userId}/${Date.now()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error } = await supabase.storage
    .from('photos')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Storage upload error:', error)
    return NextResponse.json({ error: 'アップロードに失敗しました' }, { status: 500 })
  }

  const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName)

  return NextResponse.json({ data: { url: urlData.publicUrl } })
}
