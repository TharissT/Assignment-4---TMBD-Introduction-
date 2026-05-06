import { useNavigate } from 'react-router-dom'

export const HomeView = () => {
  const navigate = useNavigate()

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/5 blur-[120px]" />
      </div>
      <section className="relative z-10 w-full max-w-4xl space-y-16 px-6 text-center">
        <div className="group relative">
          <h1 className="animate-pulse bg-gradient-to-b from-red-500 via-red-600 to-red-950 bg-clip-text text-[10rem] font-black italic uppercase tracking-tight text-transparent drop-shadow-[0_20px_50px_rgba(220,38,38,0.4)]">
            Netflix
          </h1>
          <div className="absolute -inset-4 rounded-full bg-red-600/5 blur-3xl transition-all duration-700 group-hover:bg-red-600/10" />
        </div>
        <p className="mx-auto max-w-2xl text-xl font-extralight leading-relaxed tracking-widest text-zinc-500 uppercase">
          Explore movies and discover people using a{' '}
          <strong className="font-black tracking-widest text-red-600">fast, modern</strong> interface.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              navigate('/movies')
            }}
            className="cursor-pointer border border-red-500/30 bg-red-600 px-16 py-5 font-black uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:shadow-[0_0_70px_rgba(220,38,38,0.6)] active:scale-95"
          >
            Browse Movies
          </button>
          <button
            onClick={() => {
              navigate('/television')
            }}
            className="cursor-pointer border border-zinc-700 bg-transparent px-16 py-5 font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:scale-105 hover:border-red-600 hover:text-red-400 active:scale-95"
          >
            Browse TV
          </button>
        </div>
        <div className="flex justify-center gap-8 pt-4">
          {[
            { label: 'Trending', path: '/trending' },
            { label: 'Genre', path: '/genre' },
            { label: 'Search', path: '/search' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path)
              }}
              className="cursor-pointer text-xs font-bold uppercase tracking-widest text-zinc-600 transition-colors duration-200 hover:text-red-500"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </main>
  )
}
