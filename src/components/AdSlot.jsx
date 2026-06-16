import { useEffect, useRef } from 'react'

// Reusable AdSense unit.
// 1. After AdSense approval, set VITE_ADSENSE_CLIENT (e.g. ca-pub-1234567890123456)
//    in Railway env vars, and replace slot IDs below with your real ad unit IDs.
// 2. Until a real client id is present, this renders a labelled placeholder box
//    so the layout looks correct and nothing errors.
const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || ''

export default function AdSlot({ slot = '0000000000', format = 'auto', className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!CLIENT) return
    try {
      // eslint-disable-next-line no-undef
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (_) {}
  }, [])

  if (!CLIENT) {
    return (
      <div
        className={`card flex items-center justify-center text-xs uppercase tracking-widest text-slate-600 ${className}`}
        style={{ minHeight: 100 }}
      >
        Advertisement
      </div>
    )
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
