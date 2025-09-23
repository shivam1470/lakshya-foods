import { prisma } from '@/lib/prisma'
import { withAdminAuth, AdminRequest } from '@/lib/adminAuth'
import { NextApiResponse } from 'next'

async function handler(req: AdminRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { 
        page = '1', 
        limit = '10', 
        search = '', 
        role = '' 
      } = req.query

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
      const take = parseInt(limit as string)

      // Build where clause
      const where: any = {}
      
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (role && role !== 'all') {
        where.role = role
      }

      const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            company: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({ where })
      ])

      const totalPages = Math.ceil(totalUsers / take)

      res.status(200).json({
        users,
        pagination: {
          page: parseInt(page as string),
          limit: take,
          total: totalUsers,
          totalPages,
          hasNext: parseInt(page as string) < totalPages,
          hasPrev: parseInt(page as string) > 1
        }
      })
    } catch (error) {
      console.error('Get users error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { userId, action, data } = req.body

      if (!userId || !action) {
        return res.status(400).json({ message: 'User ID and action are required' })
      }

      let updateData: any = {}

      switch (action) {
        case 'changeRole':
          if (!data?.role) {
            return res.status(400).json({ message: 'Role is required' })
          }
          updateData = { role: data.role }
          break
        
        case 'updateProfile':
          updateData = {
            name: data.name,
            phone: data.phone,
            company: data.company
          }
          break
        
        default:
          return res.status(400).json({ message: 'Invalid action' })
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          company: true,
          createdAt: true
        }
      })

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      })
    } catch (error) {
      console.error('Update user error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default withAdminAuth(handler)