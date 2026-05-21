'use client'

import { useState } from 'react'
import PostForm from '@/components/features/post-form/PostForm'
import type { GenerateFormInput } from '@/types'

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (input: GenerateFormInput) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      console.log(data) // 後でResultCardに渡す
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-2">
      <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}