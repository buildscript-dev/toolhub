import { Link } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { TOOLS } from '../lib/tools.js'

export default function Home() {
  const [q, setQ] = useState('')
  useEffect(() => {
    document.title = 'ToolHub — 12 Free Online Tools, No Sign-up'
  }, [])
  const filtered = useMemo(
    () => TOOLS.filter((t) => (t.name + t.short + t.category).toLowerCase().includes(q.toLowerCase())),
    [q]
  )
  return (
    <div>
      <section className="text-center py-8 sm:py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Every tool you need.<br />
          <span className="text-brand">Free. Private. Instant.</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          12 handy browser tools — counters, generators, converters and dev utilities.
          No sign-up, no uploads. Everything runs locally on your device.
        </p>
        <div className="max-w-md mx-auto mt-6">
          <input className="input text-center" placeholder="🔍 Search tools…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Link key={t.slug} to={`/tools/${t.slug}`} className="card p-5 hover:border-brand/60 transition group">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{t.icon}</span>
              <div>
                <h2 className="font-bold group-hover:text-brand transition">{t.name}</h2>
                <p className="text-sm text-slate-400 mt-1">{t.short}</p>
                <span className="inline-block mt-3 text-xs text-slate-500 border border-edge rounded-full px-2 py-0.5">{t.category}</span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-slate-500 col-span-full text-center py-8">No tools match “{q}”.</p>}
      </section>
    </div>
  )
}
