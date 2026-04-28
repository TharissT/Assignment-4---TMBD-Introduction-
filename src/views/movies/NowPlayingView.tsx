import { ImageGrid, Pagination } from '@/components';
import { NOW_PLAYING_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NowPlayingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MoviesResponse>(NOW_PLAYING_ENDPOINT, { page }, [page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-red-600/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.15)_0%,transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-400 mx-auto px-8 md:px-16 py-16 space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-1.5 bg-red-600 rounded-full animate-pulse" />
              <h2 className="text-zinc-500 uppercase tracking-[0.5em] text-xs font-black">Live Broadcast</h2>
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic text-transparent bg-clip-text bg-linear-to-r from-white via-white to-zinc-600">
              Now <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Playing</span>
            </h1>
          </div>

          <div className="hidden lg:block">
            <span className="text-zinc-900 text-8xl font-black select-none opacity-20 tracking-tighter">
              STREAMING_DATA
            </span>
          </div>
        </header>

        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-red-600/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          <div className="relative rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
            <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
          </div>
        </div>

        <footer className="pt-16 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-12 pb-20">
          <div className="flex flex-col gap-3">
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold pl-1">Archive Navigation</p>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-red-600 rounded-xl blur opacity-10 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-zinc-950 p-2 rounded-xl border border-white/5 hover:border-red-600/50 transition-colors shadow-2xl">
                <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-zinc-800">
            <div className="h-px w-24 bg-zinc-900" />
            <span className="text-sm font-black uppercase tracking-[0.8em]">
              Page {page.toString().padStart(2, '0')}
            </span>
          </div>
        </footer>
      </section>

      <div className="fixed bottom-0 left-0 w-full h-40 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />

      <div className="absolute top-1/2 -right-64 w-125 h-125 bg-red-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
    </main>
  );
};
