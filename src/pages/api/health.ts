import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const start = Date.now()
  try {
    await prisma.$queryRaw`SELECT 1` // Works for SQLite/Postgres; ignored if not supported
  } catch (e) {
    // swallow – some providers won't allow raw SELECT 1 the same way
  }
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - start,
    env: {
      node: process.version,
      prod: process.env.NODE_ENV === 'production'
    }
  })
}
