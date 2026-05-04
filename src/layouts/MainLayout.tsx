import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
