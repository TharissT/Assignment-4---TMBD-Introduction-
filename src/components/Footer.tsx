import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 mt-16 py-10 px-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-red-600 font-black text-xl uppercase tracking-widest">Netflix</p>
          <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest">Powered by TMDB API</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/TharissT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-semibold"
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors duration-200 text-sm font-semibold"
          >
            <FaLinkedin size={20} />
            LinkedIn
          </a>
        </div>

        <p className="text-zinc-800 text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} · Built with React & Vite
        </p>
      </div>
    </footer>
  );
};
