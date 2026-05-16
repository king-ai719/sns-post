'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import type { GenerateFormInput, GeneratedContent } from '@/types'

interface UseGenerateReturn {
  generate: (input: GenerateFormInput) => Promise<void>
  result: GeneratedContent | null
  isLoading: boolean
  error: string | null
  reset: () => void
}

export function useGenerate(): UseGenerateReturn {
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async (input: GenerateFormInput) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      const json = (await res.json()) as { data?: GeneratedContent; error?: string }

      if (!res.ok || json.error) {
        const msg = json.error ?? '生成に失敗しました'
        setError(msg)
        toast.error(msg)
        return
      }

      if (json.data) {
        setResult(json.data)
        toast.success('投稿文を生成しました！')
      }
    } catch {
      const msg = 'ネットワークエラーが発生しました'
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return { generate, result, isLoading, error, reset }
}
