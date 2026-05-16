'use client'

import { useGenerate } from '@/hooks/useGenerate'
import PostForm from '@/components/features/post-form/PostForm'
import ResultCard from '@/components/features/result/ResultCard'

export default function HomePage() {
  const { generate, result, isLoading, reset } = useGenerate()

  return (
    <div className="space-y-6 py-2">
      {/* ページタイトル */}
      <div>
        <h2 className="text-lg font-semibold text-white">投稿文を生成</h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          情報を入力するだけでSNS投稿文をAIが作成します
        </p>
      </div>

      {/* 生成結果（あるときだけ表示） */}
      {result && (
        <ResultCard result={result} onReset={reset} />
      )}

      {/* 入力フォーム */}
      {!result && (
        <div className="card p-5">
          <PostForm onSubmit={generate} isLoading={isLoading} />
        </div>
      )}

      {/* ローディング状態 */}
      {isLoading && !result && (
        <div className="card p-5 space-y-3">
          <div className="shimmer h-4 rounded-lg w-3/4" />
          <div className="shimmer h-4 rounded-lg w-full" />
          <div className="shimmer h-4 rounded-lg w-5/6" />
          <div className="shimmer h-4 rounded-lg w-2/3" />
        </div>
      )}
    </div>
  )
}
