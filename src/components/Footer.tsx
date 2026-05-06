import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <span className="text-sm font-black uppercase tracking-widest text-red-600">Netflix</span>
        <p className="text-xs text-zinc-600">Powered by TMDB API</p>
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
        <p className="text-xs uppercase tracking-widest text-zinc-800">
          {`© ${new Date().getFullYear()} · Built with React & Vite`}
        </p>
      </div>
    </footer>
  )
}
