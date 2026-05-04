import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-zinc-900 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <p className="text-xl font-black uppercase tracking-widest text-red-600">Netflix</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-zinc-600">Powered by TMDB API</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/TharissT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 hover:text-white"
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors duration-200 hover:text-blue-400"
          >
            <FaLinkedin size={20} />
            LinkedIn
          </a>
        </div>

        <p className="text-xs uppercase tracking-widest text-zinc-800">© {new Date().getFullYear()} · Built with React & Vite</p>
      </div>
    </footer>
  )
}
