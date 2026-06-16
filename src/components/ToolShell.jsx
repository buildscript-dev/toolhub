import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdSlot from './AdSlot.jsx'

// Wraps every tool: sets SEO title/description, breadcrumb, and a sidebar ad.
export default function ToolShell({ tool, children }) {
  useEffect(() => {
    document.title = `${tool.name} — ToolHub`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', `${tool.name}: ${tool.short} Free, private, runs in your browser.`)
  }, [tool])

  return (
    <div>
      <nav className="text-sm text-slate-500 mb-4">
        <Link to="/" className="hover:text-slate-300">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <header className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
              <span>{tool.icon}</span> {tool.name}
            </h1>
            <p className="text-slate-400 mt-1">{tool.short}</p>
          </header>
          <div className="card p-5 sm:p-6">{children}</div>
        </div>

        <aside className="space-y-4">
          <AdSlot slot="3333333333" className="w-full" />
          <div className="card p-4 text-sm text-slate-400">
            <p className="font-semibold text-slate-200 mb-2">100% private</p>
            <p>This tool runs entirely in your browser. Your data never leaves your device.</p>
          </div>
          <AdSlot slot="4444444444" className="w-full" />
        </aside>
      </div>
    </div>
  )
}
