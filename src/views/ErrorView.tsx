import { useNavigate } from 'react-router-dom'

export const ErrorView = () => {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black text-white">
      <div className="space-y-4 text-center">
        <p className="text-[8rem] font-black leading-none text-red-600">404</p>
        <h1 className="text-3xl font-black uppercase tracking-widest">Page Not Found</h1>
        <p className="mx-auto max-w-md text-zinc-500">This page doesn't exist or was removed.</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="cursor-pointer bg-red-600 px-10 py-3 font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-red-500"
      >
        Go Home
      </button>
    </main>
  )
}
