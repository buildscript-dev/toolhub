import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function About() {
  useEffect(() => { document.title = 'About — ToolHub' }, [])
  return (
    <div className="max-w-2xl mx-auto prose-invert">
      <h1 className="text-3xl font-extrabold mb-4">About ToolHub</h1>
      <p className="text-slate-300 leading-relaxed">
        ToolHub is a free collection of fast, privacy-first web utilities. Every tool runs
        entirely in your browser using modern web APIs — your text, files and data never
        touch a server. There are no accounts, no tracking of your inputs, and no limits.
      </p>
      <p className="text-slate-300 leading-relaxed mt-4">
        Built for developers, students, writers and anyone who needs a quick tool without
        installing software. ToolHub is supported by unobtrusive advertising, which keeps
        every tool free forever.
      </p>
      <Link to="/" className="btn-primary mt-6">Browse all tools</Link>
    </div>
  )
}

export function Privacy() {
  useEffect(() => { document.title = 'Privacy — ToolHub' }, [])
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
        <p><strong>Your data stays on your device.</strong> All tools process input locally in your browser. We do not collect, store or transmit the text, files or images you enter.</p>
        <p><strong>Advertising.</strong> This site uses Google AdSense to display ads. Google and its partners may use cookies to serve ads based on your visits to this and other sites. You can opt out of personalised advertising via Google Ads Settings.</p>
        <p><strong>Analytics.</strong> We may use privacy-respecting, aggregate analytics to understand traffic. No personal data from tool inputs is ever recorded.</p>
        <p><strong>Contact.</strong> Questions? Reach out via the email listed on our repository.</p>
      </div>
      <Link to="/" className="btn-ghost mt-6">← Back home</Link>
    </div>
  )
}

export function NotFound() {
  useEffect(() => { document.title = '404 — ToolHub' }, [])
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-brand">404</h1>
      <p className="text-slate-400 mt-3">That tool wandered off.</p>
      <Link to="/" className="btn-primary mt-6">Back to all tools</Link>
    </div>
  )
}
