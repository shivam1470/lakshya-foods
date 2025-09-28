import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required in production').optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error('[env] Invalid environment variables:')
  for (const issue of parsed.error.issues) {
    console.error(` - ${issue.path.join('.')}: ${issue.message}`)
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables')
  }
}

export const env = parsed.success ? parsed.data : (process.env as any)

if (process.env.NODE_ENV === 'production') {
  if (!env.NEXTAUTH_SECRET) {
    console.warn('[env] NEXTAUTH_SECRET missing. Set this to a strong random string.')
  }
  if (!env.NEXTAUTH_URL) {
    console.warn('[env] NEXTAUTH_URL missing. Set this to your deployed URL.')
  }
}
