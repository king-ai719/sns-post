import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabase } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const { priceId } = await req.json()
    if (!priceId) {
      return NextResponse.json({ error: 'priceIdが必要です' }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // ★ デバッグ: profilesテーブル取得を分解して原因特定
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, stripe_customer_id, email')
      .eq('clerk_id', userId)
      .single()

    // ★ profileエラーの詳細を返す（本番では消す）
    if (profileError) {
      console.error('Profile fetch error:', JSON.stringify(profileError))
      return NextResponse.json({
        error: 'プロフィール取得エラー',
        detail: profileError.message,
        code: profileError.code,
        hint: profileError.hint,
      }, { status: 500 })
    }

    if (!profile) {
      return NextResponse.json({ error: 'プロフィールが見つかりません' }, { status: 404 })
    }

    let customerId = profile.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { clerk_id: userId, supabase_id: profile.id },
      })
      customerId = customer.id

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', profile.id)

      // ★ update失敗も検知
      if (updateError) {
        console.error('Profile update error:', JSON.stringify(updateError))
        return NextResponse.json({
          error: 'カスタマーID保存エラー',
          detail: updateError.message,
        }, { status: 500 })
      }
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      metadata: { clerk_id: userId, supabase_id: profile.id },
    })

    return NextResponse.json({ url: session.url })

  } catch (err: unknown) {
    // ★ Stripeエラーの詳細を分解
    if (err instanceof Stripe.errors.StripeError) {
      console.error('Stripe error:', err.type, err.message, err.code)
      return NextResponse.json({
        error: 'Stripeエラー',
        type: err.type,
        message: err.message,
        code: err.code,
      }, { status: 500 })
    }

    console.error('Unexpected error:', err)
    return NextResponse.json({
      error: '予期しないエラー',
      detail: String(err),
    }, { status: 500 })
  }
}