// Single source of truth for all tools — drives routing, home grid, SEO, nav.
export const TOOLS = [
  {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    short: 'Count words, characters, sentences & reading time.',
    icon: '📝',
    category: 'Text',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    short: 'Strong, random passwords with custom rules.',
    icon: '🔐',
    category: 'Security',
  },
  {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    short: 'Turn any text or URL into a downloadable QR code.',
    icon: '🔳',
    category: 'Generators',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    short: 'Beautify, minify and validate JSON instantly.',
    icon: '🧩',
    category: 'Dev',
  },
  {
    slug: 'base64',
    name: 'Base64 Encode / Decode',
    short: 'Convert text to and from Base64.',
    icon: '🔁',
    category: 'Dev',
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder / Decoder',
    short: 'Percent-encode or decode URL components.',
    icon: '🌐',
    category: 'Dev',
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    short: 'SHA-1 / SHA-256 / SHA-512 hashes of any text.',
    icon: '#️⃣',
    category: 'Security',
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    short: 'UPPER, lower, Title, camelCase, snake_case & more.',
    icon: '🔠',
    category: 'Text',
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    short: 'HEX ↔ RGB ↔ HSL with a live preview.',
    icon: '🎨',
    category: 'Design',
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    short: 'Length, weight and temperature conversions.',
    icon: '📏',
    category: 'Converters',
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    short: 'Placeholder text by words, sentences or paragraphs.',
    icon: '📄',
    category: 'Generators',
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    short: 'Shrink JP/PNG in your browser — nothing uploaded.',
    icon: '🖼️',
    category: 'Media',
  },
]

export const getTool = (slug) => TOOLS.find((t) => t.slug === slug)
