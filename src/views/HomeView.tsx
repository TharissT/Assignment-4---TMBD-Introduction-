import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden selection:bg-red-600/40">
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />
      
      <section className="relative z-10 max-w-4xl w-full text-center space-y-16 px-6">
        {/* Massive Cinematic Logo */}
        <div className="relative group">
          <h1 className="text-[12rem] font-black uppercase tracking-[calc(-0.05em)] italic text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950 drop-shadow-[0_20px_50px_rgba(220,38,38,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
            Netflix
          </h1>
          <div className="absolute -inset-4 bg-red-600/5 blur-3xl rounded-full group-hover:bg-red-600/10 transition-all duration-700" />
        </div>

        {/* Minimalist Subtext */}
        <p className="text-zinc-500 text-2xl font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.1em] uppercase">
          Explore movies and discover people using a <strong className="text-red-600 font-black tracking-widest">fast, modern</strong> interface.
        </p>

        {/* Ultra-Glow Button Integration */}
        <div className="flex justify-center group">
          <Button onClick={() => navigate('/now-playing')}>
            <div className="bg-red-600 text-white px-20 py-6 font-black uppercase tracking-[0.3em] rounded-none shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:shadow-[0_0_70px_rgba(220,38,38,0.5)] hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-500 border-x border-red-400/30 ring-1 ring-red-500/50 ring-offset-4 ring-offset-black">
              Enter
            </div>
          </Button>
        </div>

        {/* Brutalist Footer */}
        <footer className="pt-20 text-[11px] font-black uppercase tracking-[0.8em] text-zinc-900 hover:text-red-950 transition-colors duration-1000">
          Built with React • Vite • React Router
        </footer>
      </section>
      
      {/* Edge Vignette */}
      <div className="absolute inset-0 ring-[120px] ring-black ring-inset pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </main>
  );
};