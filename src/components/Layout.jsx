import { Link, useLocation } from 'react-router-dom'
import AdSlot from './AdSlot.jsx'

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-20 backdrop-blur bg-ink/70 border-b border-edge">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand/20 text-brand">⚙️</span>
            Tool<span className="text-brand">Hub</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link to="/" className={`px-3 py-2 rounded-lg hover:bg-edge/50 ${pathname === '/' ? 'text-brand' : 'text-slate-300'}`}>All Tools</Link>
            <Link to="/about" className="px-3 py-2 rounded-lg hover:bg-edge/50 text-slate-300">About</Link>
          </nav>
        </div>
      </header>

      {/* Leaderboard ad */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-4">
        <AdSlot slot="1111111111" className="w-full" />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>

      {/* Bottom ad */}
      <div className="max-w-6xl mx-auto w-full px-4 pb-4">
        <AdSlot slot="2222222222" className="w-full" />
      </div>

      <footer className="border-t border-edge">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col sm:flex-row gap-4 justify-between">
          <p>© {new Date().getFullYear()} ToolHub · 12 free browser tools. No sign-up, nothing uploaded.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-slate-200">About</Link>
            <Link to="/privacy" className="hover:text-slate-200">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-200">Terms</Link>
            <Link to="/contact" className="hover:text-slate-200">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
