import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden selection:bg-red-600/40">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

      <section className="relative z-10 max-w-4xl w-full text-center space-y-16 px-6">
        {/* Logo */}
        <div className="relative group">
          <h1 className="text-[10rem] font-black uppercase tracking-tight italic text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950 drop-shadow-[0_20px_50px_rgba(220,38,38,0.4)] animate-pulse">
            Netflix
          </h1>
          <div className="absolute -inset-4 bg-red-600/5 blur-3xl rounded-full group-hover:bg-red-600/10 transition-all duration-700" />
        </div>

        <p className="text-zinc-500 text-xl font-extralight max-w-2xl mx-auto leading-relaxed tracking-widest uppercase">
          Explore movies and discover people using a{' '}
          <strong className="text-red-600 font-black tracking-widest">fast, modern</strong> interface.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/movies')}
            className="bg-red-600 text-white px-16 py-5 font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_70px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:scale-105 active:scale-95 transition-all duration-300 border border-red-500/30 cursor-pointer"
          >
            Browse Movies
          </button>
          <button
            onClick={() => navigate('/television')}
            className="bg-transparent text-white px-16 py-5 font-black uppercase tracking-[0.3em] border border-zinc-700 hover:border-red-600 hover:text-red-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Browse TV
          </button>
        </div>

        {/* Quick links */}
        <div className="flex justify-center gap-8 pt-4">
          {[
            { label: 'Trending', path: '/trending' },
            { label: 'Genre', path: '/genre' },
            { label: 'Search', path: '/search' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="text-zinc-600 hover:text-red-500 text-xs uppercase tracking-widest font-bold transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Edge vignette */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
};
