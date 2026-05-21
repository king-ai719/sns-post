import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 px-4 pb-24 pt-4 max-w-xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}