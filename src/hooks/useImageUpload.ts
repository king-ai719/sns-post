'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { validateImageFile } from '@/lib/utils'

interface UseImageUploadReturn {
  upload: (file: File) => Promise<string | null>
  preview: string | null
  isUploading: boolean
  clearPreview: () => void
}

export function useImageUpload(): UseImageUploadReturn {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const upload = async (file: File): Promise<string | null> => {
    const validationError = validateImageFile(file)
    if (validationError) {
      toast.error(validationError)
      return null
    }

    // プレビュー表示（即時）
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const json = (await res.json()) as { data?: { url: string }; error?: string }

      if (!res.ok || json.error) {
        toast.error(json.error ?? 'アップロードに失敗しました')
        setPreview(null)
        return null
      }

      return json.data?.url ?? null
    } catch {
      toast.error('アップロードに失敗しました')
      setPreview(null)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const clearPreview = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  return { upload, preview, isUploading, clearPreview }
}
