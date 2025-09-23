import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          address: true,
          city: true,
          country: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({ user })
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    const { name, phone, company, address, city, country } = req.body

    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: name || undefined,
          phone: phone || null,
          company: company || null,
          address: address || null,
          city: city || null,
          country: country || null,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          address: true,
          city: true,
          country: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      })
    } catch (error) {
      console.error('Update profile error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}