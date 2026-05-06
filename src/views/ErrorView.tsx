import { useNavigate } from 'react-router-dom'

export const ErrorView = () => {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 text-center">
      <p className="text-8xl font-black text-red-600">404</p>
      <h1 className="text-2xl font-black uppercase tracking-widest text-white">Page Not Found</h1>
      <p className="text-zinc-500">This page does not exist or was removed.</p>
      <button
        onClick={() => {
          navigate('/')
        }}
        className="cursor-pointer bg-red-600 px-10 py-3 font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-red-500"
      >
        Go Home
      </button>
    </main>
  )
}
