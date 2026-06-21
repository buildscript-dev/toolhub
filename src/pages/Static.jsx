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
        <p><strong>Advertising &amp; cookies.</strong> This site uses Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you. You may opt out of personalised advertising via <a className="text-brand underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or opt out of third-party vendor cookies at <a className="text-brand underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>. See Google's <a className="text-brand underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">partner policies</a> for details.</p>
        <p><strong>Analytics.</strong> We may use privacy-respecting, aggregate analytics to understand traffic. No personal data from tool inputs is ever recorded.</p>
        <p><strong>Contact.</strong> Questions about this policy? Email <a className="text-brand underline" href="mailto:buildscript.dev@gmail.com">buildscript.dev@gmail.com</a>.</p>
      </div>
      <Link to="/" className="btn-ghost mt-6">← Back home</Link>
    </div>
  )
}

export function Terms() {
  useEffect(() => { document.title = 'Terms of Service — ToolHub' }, [])
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4">Terms of Service</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
        <p><strong>Acceptance.</strong> By using ToolHub you agree to these terms. If you do not agree, please do not use the site.</p>
        <p><strong>Free service, as-is.</strong> All tools are provided free of charge and "as is", without warranty of any kind. We do not guarantee that results are accurate, complete or fit for any particular purpose. Verify important outputs independently.</p>
        <p><strong>Acceptable use.</strong> Do not use ToolHub for unlawful purposes, to infringe others' rights, or to attempt to disrupt or attack the service.</p>
        <p><strong>Local processing.</strong> Tools run in your browser. You are responsible for the data you enter and for keeping a copy of anything you need.</p>
        <p><strong>Limitation of liability.</strong> ToolHub and its author are not liable for any loss or damage arising from use of the site or reliance on its outputs.</p>
        <p><strong>Changes.</strong> These terms may be updated over time. Continued use after changes constitutes acceptance.</p>
        <p><strong>Contact.</strong> <a className="text-brand underline" href="mailto:buildscript.dev@gmail.com">buildscript.dev@gmail.com</a>.</p>
      </div>
      <Link to="/" className="btn-ghost mt-6">← Back home</Link>
    </div>
  )
}

export function Contact() {
  useEffect(() => { document.title = 'Contact — ToolHub' }, [])
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4">Contact</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>Have a question, found a bug, or want a tool added? We'd like to hear from you.</p>
        <p>Email: <a className="text-brand underline" href="mailto:buildscript.dev@gmail.com">buildscript.dev@gmail.com</a></p>
        <p className="text-sm text-slate-400">ToolHub is an independent, privacy-first project. We typically reply within a few days.</p>
      </div>
      <Link to="/" className="btn-primary mt-6">Browse all tools</Link>
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
