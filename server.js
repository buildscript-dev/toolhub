import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8080
const dist = path.join(__dirname, 'dist')

// Cache static assets aggressively; HTML stays fresh for SEO/updates.
app.use(express.static(dist, {
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
  },
}))

const TOOL_SLUGS = [
  'word-counter', 'password-generator', 'qr-generator', 'json-formatter',
  'base64', 'url-encoder', 'hash-generator', 'case-converter',
  'color-converter', 'unit-converter', 'lorem-ipsum', 'image-compressor',
]

// SEO helpers
app.get('/robots.txt', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)
})

app.get('/sitemap.xml', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`
  const urls = ['', 'about', 'privacy', ...TOOL_SLUGS.map((s) => `tools/${s}`)]
  const body = urls
    .map((u) => `  <url><loc>${base}/${u}</loc><changefreq>weekly</changefreq></url>`)
    .join('\n')
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`
  )
})

// SPA fallback — every route serves index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(PORT, () => console.log(`ToolHub running on :${PORT}`))
