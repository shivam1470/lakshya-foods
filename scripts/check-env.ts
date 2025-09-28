const crypto = require('crypto')

function mask(value) {
  if (!value) return '<empty>'
  if (value.length < 12) return '<too-short>'
  const hash = crypto.createHash('sha256').update(value).digest('hex').slice(0, 12)
  return `${value.slice(0, 12)}... (sha256:${hash})`
}

const raw = process.env.DATABASE_URL
console.log('DATABASE_URL present:', !!raw)
console.log('DATABASE_URL preview:', mask(raw))
if (raw && !/^postgresql:\/\//.test(raw) && !/^postgres:\/\//.test(raw)) {
  console.warn('WARNING: DATABASE_URL does not start with postgresql:// or postgres://')
}
