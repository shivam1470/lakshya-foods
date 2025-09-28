import type { NextApiRequest, NextApiResponse } from 'next';

// Lightweight endpoint to help verify that the Next.js build is being executed on Vercel.
// If this route returns 404 in production, it indicates the deployment isn't building Next pages/functions.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    name: 'lakshya-foods',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
}
