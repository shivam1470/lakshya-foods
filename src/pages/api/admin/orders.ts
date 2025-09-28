import { prisma } from '@/lib/prisma'
import { withAdminAuth, AdminRequest } from '@/lib/adminAuth'
import { NextApiResponse } from 'next'

interface QueryParams {
  page?: string
  limit?: string
  status?: string
  paymentStatus?: string
  search?: string
}

async function handler(req: AdminRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { page = '1', limit = '10', status, paymentStatus, search } = req.query as QueryParams
      const pageNum = Math.max(parseInt(page) || 1, 1)
      const take = Math.min(Math.max(parseInt(limit) || 10, 1), 100)
      const skip = (pageNum - 1) * take

      const where: any = {}
      if (status) where.status = status
      if (paymentStatus) where.paymentStatus = paymentStatus
      if (search) {
        where.OR = [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { user: { name: { contains: search, mode: 'insensitive' } } },
        ]
      }

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
            take,
          include: {
            user: { select: { id: true, name: true, email: true, company: true } },
            items: {
              select: {
                id: true,
                quantity: true,
                unitPrice: true,
                totalPrice: true,
                product: { select: { id: true, name: true, category: true } }
              }
            }
          }
        }),
        prisma.order.count({ where })
      ])

      const totalPages = Math.ceil(total / take) || 1

      res.status(200).json({
        orders,
        pagination: {
          page: pageNum,
          limit: take,
          total,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      })
    } catch (error) {
      console.error('Get orders error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { orderId, action, data } = req.body as { orderId?: string; action?: string; data?: any }
      if (!orderId || !action) {
        return res.status(400).json({ message: 'Order ID and action are required' })
      }

      let updated
      switch (action) {
        case 'updateStatus':
          if (!data?.status) return res.status(400).json({ message: 'Status required' })
          updated = await prisma.order.update({ where: { id: orderId }, data: { status: data.status } })
          break
        case 'updatePayment':
          if (!data?.paymentStatus) return res.status(400).json({ message: 'Payment status required' })
          updated = await prisma.order.update({ where: { id: orderId }, data: { paymentStatus: data.paymentStatus } })
          break
        case 'updateTracking':
          updated = await prisma.order.update({ where: { id: orderId }, data: { trackingNumber: data?.trackingNumber || null } })
          break
        default:
          return res.status(400).json({ message: 'Unknown action' })
      }

      res.status(200).json({ message: 'Order updated', order: updated })
    } catch (error) {
      console.error('Update order error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default withAdminAuth(handler)