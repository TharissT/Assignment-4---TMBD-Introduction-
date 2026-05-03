import { useNavigate } from 'react-router-dom';

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-8">
      <div className="text-center space-y-4">
        <p className="text-red-600 font-black text-[8rem] leading-none">404</p>
        <h1 className="text-3xl font-black uppercase tracking-widest">Page Not Found</h1>
        <p className="text-zinc-500 max-w-md mx-auto">
          This page doesn't exist or was removed. Head back to browse content.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="bg-red-600 hover:bg-red-500 text-white px-10 py-3 font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
      >
        Go Home
      </button>
    </main>
  );
};
