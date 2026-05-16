export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      {/* ロゴ */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gold tracking-widest">PostAI</h1>
        <p className="text-zinc-500 text-sm mt-1">SNS投稿を瞬時に生成</p>
      </div>

      {/* Clerkコンポーネントが入る */}
      {children}
    </div>
  )
}
