import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-screen-2xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
