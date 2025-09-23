import { prisma } from '@/lib/prisma'
import { withAdminAuth, AdminRequest } from '@/lib/adminAuth'
import { NextApiResponse } from 'next'

async function handler(req: AdminRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Get basic counts
      const [
        totalUsers,
        totalInquiries,
        newInquiries,
        totalOrders
      ] = await Promise.all([
        prisma.user.count(),
        prisma.inquiry.count(),
        prisma.inquiry.count({
          where: { status: 'new' }
        }),
        // For now, we'll use a static value for orders since the model might not be ready
        Promise.resolve(0)
      ])

      // Get recent activity
      const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true
        }
      })

      const recentInquiries = await prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true
        }
      })

      // Calculate growth (simplified for now)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const newUsersThisMonth = await prisma.user.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      })

      const newInquiriesThisMonth = await prisma.inquiry.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      })

      res.status(200).json({
        stats: {
          totalUsers,
          totalInquiries,
          newInquiries,
          totalOrders,
          newUsersThisMonth,
          newInquiriesThisMonth
        },
        recentActivity: {
          users: recentUsers,
          inquiries: recentInquiries
        }
      })
    } catch (error) {
      console.error('Get dashboard stats error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default withAdminAuth(handler)