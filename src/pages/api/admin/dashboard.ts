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
        totalOrders,
        revenueAgg
      ] = await Promise.all([
        prisma.user.count(),
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'new' } }),
        prisma.order.count(),
        prisma.order.aggregate({ _sum: { totalAmount: true } })
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

      const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalAmount: true,
          currency: true,
          paymentStatus: true,
          createdAt: true,
          user: { select: { id: true, name: true, email: true } }
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
          totalRevenue: revenueAgg._sum.totalAmount || 0,
          newUsersThisMonth,
          newInquiriesThisMonth
        },
        recentActivity: {
          users: recentUsers,
          inquiries: recentInquiries,
          orders: recentOrders
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