'use client'

import { useState } from 'react'
import PostForm from '@/components/features/post-form/PostForm'
import ResultCard from '@/components/features/result/ResultCard'
import type { GenerateFormInput, GeneratedContent } from '@/types'

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const handleSubmit = async (input: GenerateFormInput) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const json = await res.json()
      if (json.data) {
        setResult(json.data)
        setImageUrl(input.imageUrl)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setImageUrl(undefined)
  }

  return (
    <div className="py-2">
      {result ? (
        <ResultCard result={result} imageUrl={imageUrl} onReset={handleReset} />
      ) : (
        <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </div>
  )
}