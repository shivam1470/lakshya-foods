import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export interface AdminRequest extends NextApiRequest {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const withAdminAuth = (handler: (req: AdminRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: AdminRequest, res: NextApiResponse) => {
    try {
      const session = await getServerSession(req, res, authOptions)

      if (!session?.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' })
      }

      req.user = {
        id: session.user.id,
        email: session.user.email!,
        role: session.user.role
      }

      return handler(req, res)
    } catch (error) {
      console.error('Admin auth error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export const withAuth = (handler: (req: AdminRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: AdminRequest, res: NextApiResponse) => {
    try {
      const session = await getServerSession(req, res, authOptions)

      if (!session?.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      req.user = {
        id: session.user.id,
        email: session.user.email!,
        role: session.user.role
      }

      return handler(req, res)
    } catch (error) {
      console.error('Auth error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}