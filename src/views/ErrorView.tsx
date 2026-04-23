import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-red-600/50">
      {/* Glitch Overlay Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25)_0%,transparent_70%)] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUic9ZfHiqW99/giphy.gif')] bg-cover" />
      
      {/* Horizontal Scanline Distortions */}
      <div className="absolute top-1/4 w-full h-[2px] bg-red-600/20 blur-sm animate-[bounce_2s_infinite] pointer-events-none" />
      <div className="absolute top-3/4 w-full h-[1px] bg-red-900/40 blur-xs animate-[bounce_3s_infinite] pointer-events-none" />

      <section className="relative z-10 flex flex-col items-center justify-center space-y-10 group">
        {/* Massive Glitched 404 Header */}
        <div className="relative">
          <h1 className="text-[15rem] font-black tracking-tighter leading-none italic text-white drop-shadow-[0_0_40px_rgba(220,38,38,0.8)] animate-[skew_1s_infinite] before:content-['404'] before:absolute before:top-0 before:left-0 before:text-red-600 before:z-[-1] before:animate-[ping_1.5s_infinite] after:content-['404'] after:absolute after:top-0 after:left-0 after:text-cyan-900 after:z-[-2] after:translate-x-2 after:animate-pulse">
            404
          </h1>
          <div className="absolute -bottom-4 left-0 w-full h-2 bg-red-600 shadow-[0_0_30px_#dc2626] skew-x-[20deg]" />
        </div>

        {/* Cinematic Error Message */}
        <div className="text-center space-y-2">
          <p className="text-red-600 font-black text-4xl uppercase tracking-[0.4em] drop-shadow-lg animate-bounce">
            Signal Lost
          </p>
          <p className="text-zinc-500 font-light text-xl tracking-widest uppercase opacity-80">
            The requested title is currently <span className="text-white">unavailable</span>
          </p>
        </div>

        {/* High-Voltage Action Button */}
        <div className="pt-6 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-none blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <Button onClick={() => navigate(-1)}>
            <div className="relative bg-black text-white px-16 py-5 font-black uppercase tracking-[0.5em] border border-red-600/50 hover:bg-red-600 hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-[20px_20px_60px_rgba(220,38,38,0.2)]">
              Return to Safety
            </div>
          </Button>
        </div>
      </section>

      {/* Decorative Frame Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-10 text-red-950 font-black text-8xl opacity-10 select-none">
        ERROR_0xBF2
      </div>
      <div className="absolute top-10 right-10 text-red-950 font-black text-8xl opacity-10 select-none rotate-180">
        LOST_LINK
      </div>
    </main>
  );
};