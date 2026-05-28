'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase/client'

export function useUserPlan() {
  const { user } = useUser()
  const [plan, setPlan] = useState<'free' | 'light' | 'pro'>('free')
  const [storeName, setStoreName] = useState('')
  const [storeType, setStoreType] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchPlan = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('plan, store_name, store_type')
        .eq('clerk_id', user.id)
        .single()
      if (data?.plan) setPlan(data.plan as 'free' | 'light' | 'pro')
      if (data?.store_name) setStoreName(data.store_name)
      if (data?.store_type) setStoreType(data.store_type)
      setLoading(false)
    }
    fetchPlan()
  }, [user])

  return { plan, loading, isFreePlan: plan === 'free', storeName, storeType }
}