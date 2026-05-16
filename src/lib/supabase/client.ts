import { createClient } from '@supabase/supabase-js'

const url = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''
const anonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''

/**
 * ブラウザ用クライアント（anon key使用・RLS適用）
 * Client Componentで使用する
 */
export const supabase = createClient(url, anonKey)
