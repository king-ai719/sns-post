'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase/client'

export function useUserPlan() {
  const { user } = useUser()
  const [plan, setPlan] = useState<'free' | 'light' | 'pro'>('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPlan = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('plan')
        .eq('clerk_id', user.id)
        .single()

      if (data?.plan) {
        setPlan(data.plan as 'free' | 'light' | 'pro')
      }
      setLoading(false)
    }

    fetchPlan()
  }, [user])

  return { plan, loading, isFreePlan: plan === 'free' }
}