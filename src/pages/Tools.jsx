import { useMemo, useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

const copy = (t) => navigator.clipboard?.writeText(t)

function CopyBtn({ text }) {
  const [done, setDone] = useState(false)
  return (
    <button
      className="btn-ghost text-sm"
      onClick={() => { copy(text); setDone(true); setTimeout(() => setDone(false), 1200) }}
    >
      {done ? '✓ Copied' : 'Copy'}
    </button>
  )
}

/* 1. Word & Character Counter */
function WordCounter() {
  const [t, setT] = useState('')
  const s = useMemo(() => {
    const words = t.trim() ? t.trim().split(/\s+/).length : 0
    const chars = t.length
    const noSpace = t.replace(/\s/g, '').length
    const sentences = (t.match(/[.!?]+/g) || []).length
    const paragraphs = t.trim() ? t.trim().split(/\n+/).length : 0
    const readMin = Math.max(1, Math.round(words / 200))
    return { words, chars, noSpace, sentences, paragraphs, readMin }
  }, [t])
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[200px]" placeholder="Type or paste your text…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[['Words', s.words], ['Characters', s.chars], ['No spaces', s.noSpace], ['Sentences', s.sentences], ['Paragraphs', s.paragraphs], ['Read time', `${s.readMin} min`]].map(([k, v]) => (
          <div key={k} className="bg-ink border border-edge rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-brand">{v}</div>
            <div className="text-xs text-slate-400 mt-1">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 2. Password Generator */
function PasswordGen() {
  const [len, setLen] = useState(16)
  const [opt, setOpt] = useState({ upper: true, lower: true, num: true, sym: true })
  const [pw, setPw] = useState('')
  const gen = () => {
    let pool = ''
    if (opt.lower) pool += 'abcdefghijkmnopqrstuvwxyz'
    if (opt.upper) pool += 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    if (opt.num) pool += '23456789'
    if (opt.sym) pool += '!@#$%^&*()-_=+[]{}'
    if (!pool) return setPw('Select at least one option')
    const arr = new Uint32Array(len)
    crypto.getRandomValues(arr)
    setPw(Array.from(arr, (n) => pool[n % pool.length]).join(''))
  }
  useEffect(() => { gen() }, []) // eslint-disable-line
  const strength = Math.min(100, len * 4 + Object.values(opt).filter(Boolean).length * 8)
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="input font-mono" readOnly value={pw} />
        <CopyBtn text={pw} />
      </div>
      <div className="h-2 rounded-full bg-ink overflow-hidden">
        <div className="h-full" style={{ width: `${strength}%`, background: strength > 70 ? '#19d4a0' : strength > 40 ? '#f5b14c' : '#ef5b5b' }} />
      </div>
      <div>
        <label className="label">Length: {len}</label>
        <input type="range" min="6" max="48" value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-brand" />
      </div>
      <div className="flex flex-wrap gap-3">
        {[['upper', 'A-Z'], ['lower', 'a-z'], ['num', '0-9'], ['sym', '!@#']].map(([k, lbl]) => (
          <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={opt[k]} onChange={(e) => setOpt({ ...opt, [k]: e.target.checked })} className="accent-brand w-4 h-4" />
            {lbl}
          </label>
        ))}
      </div>
      <button className="btn-primary w-full" onClick={gen}>Generate</button>
    </div>
  )
}

/* 3. QR Code Generator */
function QrGen() {
  const [text, setText] = useState('https://')
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (!text) return setUrl('')
    QRCode.toDataURL(text, { width: 320, margin: 2, color: { dark: '#0b0f17', light: '#ffffff' } })
      .then(setUrl).catch(() => setUrl(''))
  }, [text])
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[90px]" placeholder="Enter URL or text…" value={text} onChange={(e) => setText(e.target.value)} />
      {url && (
        <div className="flex flex-col items-center gap-3">
          <img src={url} alt="QR code" className="rounded-xl bg-white p-2" width="240" height="240" />
          <a href={url} download="qrcode.png" className="btn-primary">Download PNG</a>
        </div>
      )}
    </div>
  )
}

/* 4. JSON Formatter */
function JsonFormatter() {
  const [t, setT] = useState('')
  const [out, setOut] = useState('')
  const [err, setErr] = useState('')
  const run = (min = false) => {
    try {
      const parsed = JSON.parse(t)
      setOut(JSON.stringify(parsed, null, min ? 0 : 2))
      setErr('')
    } catch (e) { setErr(e.message); setOut('') }
  }
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[150px] font-mono text-sm" placeholder='{"hello": "world"}' value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => run(false)}>Beautify</button>
        <button className="btn-ghost" onClick={() => run(true)}>Minify</button>
        {out && <CopyBtn text={out} />}
      </div>
      {err && <p className="text-red-400 text-sm">⚠ Invalid JSON: {err}</p>}
      {out && <pre className="bg-ink border border-edge rounded-xl p-4 overflow-auto text-sm text-accent">{out}</pre>}
    </div>
  )
}

/* 5. Base64 */
function Base64Tool() {
  const [t, setT] = useState('')
  const enc = () => { try { return btoa(unescape(encodeURIComponent(t))) } catch { return '⚠ cannot encode' } }
  const dec = () => { try { return decodeURIComponent(escape(atob(t))) } catch { return '⚠ invalid Base64' } }
  const [out, setOut] = useState('')
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[120px]" placeholder="Text or Base64…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => setOut(enc())}>Encode →</button>
        <button className="btn-ghost" onClick={() => setOut(dec())}>← Decode</button>
        {out && <CopyBtn text={out} />}
      </div>
      {out && <pre className="bg-ink border border-edge rounded-xl p-4 overflow-auto text-sm break-all whitespace-pre-wrap">{out}</pre>}
    </div>
  )
}

/* 6. URL Encoder */
function UrlTool() {
  const [t, setT] = useState('')
  const [out, setOut] = useState('')
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[120px]" placeholder="Text or encoded URL…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => setOut(encodeURIComponent(t))}>Encode →</button>
        <button className="btn-ghost" onClick={() => { try { setOut(decodeURIComponent(t)) } catch { setOut('⚠ invalid') } }}>← Decode</button>
        {out && <CopyBtn text={out} />}
      </div>
      {out && <pre className="bg-ink border border-edge rounded-xl p-4 overflow-auto text-sm break-all whitespace-pre-wrap">{out}</pre>}
    </div>
  )
}

/* 7. Hash Generator */
function HashTool() {
  const [t, setT] = useState('')
  const [algo, setAlgo] = useState('SHA-256')
  const [out, setOut] = useState('')
  const run = async () => {
    const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(t))
    setOut(Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join(''))
  }
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[100px]" placeholder="Text to hash…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex gap-2 items-center flex-wrap">
        <select className="input max-w-[160px]" value={algo} onChange={(e) => setAlgo(e.target.value)}>
          {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map((a) => <option key={a}>{a}</option>)}
        </select>
        <button className="btn-primary" onClick={run}>Hash</button>
        {out && <CopyBtn text={out} />}
      </div>
      {out && <pre className="bg-ink border border-edge rounded-xl p-4 overflow-auto text-sm break-all text-accent">{out}</pre>}
    </div>
  )
}

/* 8. Case Converter */
function CaseTool() {
  const [t, setT] = useState('')
  const fns = {
    'UPPERCASE': (s) => s.toUpperCase(),
    'lowercase': (s) => s.toLowerCase(),
    'Title Case': (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
    'Sentence case': (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    'camelCase': (s) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    'snake_case': (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
    'kebab-case': (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  }
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[120px]" placeholder="Your text…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="space-y-2">
        {Object.entries(fns).map(([name, fn]) => {
          const r = t ? fn(t) : ''
          return (
            <div key={name} className="flex items-center gap-2 bg-ink border border-edge rounded-xl px-3 py-2">
              <span className="text-xs text-slate-500 w-28 shrink-0">{name}</span>
              <span className="flex-1 truncate text-sm">{r}</span>
              {r && <CopyBtn text={r} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* 9. Color Converter */
function ColorTool() {
  const [hex, setHex] = useState('#5b8cff')
  const rgb = useMemo(() => {
    const h = hex.replace('#', '')
    if (h.length !== 6) return null
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  }, [hex])
  const hsl = useMemo(() => {
    if (!rgb) return null
    let [r, g, b] = rgb.map((v) => v / 255)
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
      else if (max === g) h = (b - r) / d + 2
      else h = (r - g) / d + 4
      h /= 6
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  }, [rgb])
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-16 rounded-xl bg-transparent cursor-pointer" />
        <input className="input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>
      <div className="h-24 rounded-xl border border-edge" style={{ background: hex }} />
      <div className="space-y-2 text-sm">
        {[['HEX', hex], ['RGB', rgb ? `rgb(${rgb.join(', ')})` : '—'], ['HSL', hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : '—']].map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 bg-ink border border-edge rounded-xl px-3 py-2">
            <span className="text-xs text-slate-500 w-12">{k}</span>
            <span className="flex-1 font-mono">{v}</span>
            <CopyBtn text={v} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* 10. Unit Converter */
function UnitTool() {
  const cats = {
    Length: { base: 'm', units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048, in: 0.0254, yd: 0.9144 } },
    Weight: { base: 'kg', units: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495, ton: 1000 } },
  }
  const [cat, setCat] = useState('Length')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('km')
  const [val, setVal] = useState(1)
  const units = Object.keys(cats[cat].units)
  const isTemp = false
  const result = useMemo(() => {
    const u = cats[cat].units
    return (val * u[from]) / u[to]
  }, [cat, from, to, val]) // eslint-disable-line
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(cats).concat('Temperature').map((c) => (
          <button key={c} className={`btn ${cat === c ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setCat(c === 'Temperature' ? 'Temperature' : c); if (c !== 'Temperature') { setFrom(Object.keys(cats[c].units)[0]); setTo(Object.keys(cats[c].units)[1]) } }}>{c}</button>
        ))}
      </div>
      {cat === 'Temperature' ? <TempConv /> : (
        <>
          <input type="number" className="input" value={val} onChange={(e) => setVal(+e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
            <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
          </div>
          <div className="card p-4 text-center">
            <span className="text-3xl font-bold text-brand">{Number.isFinite(result) ? +result.toFixed(6) : '—'}</span>
            <span className="text-slate-400 ml-2">{to}</span>
          </div>
        </>
      )}
    </div>
  )
}
function TempConv() {
  const [val, setVal] = useState(25)
  const [from, setFrom] = useState('C')
  const toAll = (v, f) => {
    let c = f === 'C' ? v : f === 'F' ? (v - 32) * 5 / 9 : v - 273.15
    return { C: c, F: c * 9 / 5 + 32, K: c + 273.15 }
  }
  const r = toAll(val, from)
  return (
    <>
      <div className="flex gap-2">
        <input type="number" className="input" value={val} onChange={(e) => setVal(+e.target.value)} />
        <select className="input max-w-[100px]" value={from} onChange={(e) => setFrom(e.target.value)}>{['C', 'F', 'K'].map((u) => <option key={u}>°{u}</option>)}</select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['C', 'F', 'K'].map((u) => (
          <div key={u} className="card p-3 text-center">
            <div className="text-xl font-bold text-brand">{+r[u].toFixed(2)}</div>
            <div className="text-xs text-slate-400">°{u}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/* 11. Lorem Ipsum */
function LoremTool() {
  const W = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat'.split(' ')
  const [n, setN] = useState(3)
  const [unit, setUnit] = useState('paragraphs')
  const [out, setOut] = useState('')
  const sentence = () => {
    const len = 8 + Math.floor(Math.random() * 8)
    const s = Array.from({ length: len }, () => W[Math.floor(Math.random() * W.length)]).join(' ')
    return s[0].toUpperCase() + s.slice(1) + '.'
  }
  const gen = () => {
    if (unit === 'words') setOut(Array.from({ length: n }, () => W[Math.floor(Math.random() * W.length)]).join(' '))
    else if (unit === 'sentences') setOut(Array.from({ length: n }, sentence).join(' '))
    else setOut(Array.from({ length: n }, () => Array.from({ length: 4 }, sentence).join(' ')).join('\n\n'))
  }
  useEffect(() => { gen() }, []) // eslint-disable-line
  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="number" min="1" max="50" className="input max-w-[100px]" value={n} onChange={(e) => setN(+e.target.value)} />
        <select className="input max-w-[160px]" value={unit} onChange={(e) => setUnit(e.target.value)}>{['paragraphs', 'sentences', 'words'].map((u) => <option key={u}>{u}</option>)}</select>
        <button className="btn-primary" onClick={gen}>Generate</button>
        {out && <CopyBtn text={out} />}
      </div>
      {out && <div className="bg-ink border border-edge rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{out}</div>}
    </div>
  )
}

/* 12. Image Compressor */
function ImageCompressor() {
  const [orig, setOrig] = useState(null)
  const [out, setOut] = useState(null)
  const [q, setQ] = useState(0.7)
  const fileRef = useRef(null)
  const handle = (file) => {
    if (!file) return
    const img = new Image()
    const reader = new FileReader()
    reader.onload = (e) => {
      img.onload = () => {
        const c = document.createElement('canvas')
        c.width = img.width; c.height = img.height
        c.getContext('2d').drawImage(img, 0, 0)
        const dataUrl = c.toDataURL('image/jpeg', q)
        setOrig({ url: e.target.result, size: file.size, name: file.name })
        setOut({ url: dataUrl, size: Math.round((dataUrl.length - 22) * 3 / 4) })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
  const kb = (b) => (b / 1024).toFixed(1) + ' KB'
  return (
    <div className="space-y-4">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files[0])} />
      <button className="btn-primary w-full" onClick={() => fileRef.current.click()}>Choose Image</button>
      <div>
        <label className="label">Quality: {Math.round(q * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={q} onChange={(e) => { setQ(+e.target.value); if (orig) handle(fileRef.current.files[0]) }} className="w-full accent-brand" />
      </div>
      {orig && out && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-3 text-center">
            <img src={orig.url} alt="original" className="rounded-lg w-full h-32 object-contain mb-2" />
            <p className="text-xs text-slate-400">Original · {kb(orig.size)}</p>
          </div>
          <div className="card p-3 text-center">
            <img src={out.url} alt="compressed" className="rounded-lg w-full h-32 object-contain mb-2" />
            <p className="text-xs text-accent">Compressed · {kb(out.size)} ({Math.round((1 - out.size / orig.size) * 100)}% smaller)</p>
            <a href={out.url} download={'compressed-' + (orig.name || 'image.jpg')} className="btn-primary w-full mt-2 text-sm">Download</a>
          </div>
        </div>
      )}
    </div>
  )
}

export const TOOL_COMPONENTS = {
  'word-counter': WordCounter,
  'password-generator': PasswordGen,
  'qr-generator': QrGen,
  'json-formatter': JsonFormatter,
  'base64': Base64Tool,
  'url-encoder': UrlTool,
  'hash-generator': HashTool,
  'case-converter': CaseTool,
  'color-converter': ColorTool,
  'unit-converter': UnitTool,
  'lorem-ipsum': LoremTool,
  'image-compressor': ImageCompressor,
}
