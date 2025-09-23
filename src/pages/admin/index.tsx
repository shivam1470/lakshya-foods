import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
  Alert
} from '@mui/material'
import {
  People as PeopleIcon,
  ContactMail as ContactMailIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material'
import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'

interface DashboardStats {
  totalUsers: number
  totalInquiries: number
  newInquiries: number
  totalOrders: number
  newUsersThisMonth: number
  newInquiriesThisMonth: number
}

interface RecentActivity {
  users: Array<{
    id: string
    name: string
    email: string
    createdAt: string
    role: string
  }>
  inquiries: Array<{
    id: string
    name: string
    email: string
    status: string
    createdAt: string
  }>
}

interface DashboardData {
  stats: DashboardStats
  recentActivity: RecentActivity
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  growth 
}: {
  title: string
  value: number
  icon: React.ReactNode
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  growth?: number
}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="h2">
            {value.toLocaleString()}
          </Typography>
          {growth !== undefined && (
            <Box display="flex" alignItems="center" mt={1}>
              <TrendingUpIcon 
                fontSize="small" 
                color={growth >= 0 ? 'success' : 'error'} 
              />
              <Typography
                variant="body2"
                color={growth >= 0 ? 'success.main' : 'error.main'}
                ml={0.5}
              >
                {growth >= 0 ? '+' : ''}{growth}% this month
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
)

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'error'
    case 'in-progress': return 'warning'
    case 'resolved': return 'success'
    case 'admin': return 'secondary'
    case 'customer': return 'default'
    default: return 'default'
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (session.user.role !== 'admin') {
      router.push('/')
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/dashboard')
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <LinearProgress />
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert severity="error">{error}</Alert>
      </AdminLayout>
    )
  }

  if (!dashboardData) {
    return (
      <AdminLayout>
        <Alert severity="warning">No dashboard data available</Alert>
      </AdminLayout>
    )
  }

  const { stats, recentActivity } = dashboardData

  return (
    <AdminLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Overview of your business metrics and recent activity
      </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon />}
              color="primary"
              growth={stats.newUsersThisMonth > 0 ? Math.round((stats.newUsersThisMonth / stats.totalUsers) * 100) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Inquiries"
              value={stats.totalInquiries}
              icon={<ContactMailIcon />}
              color="info"
              growth={stats.newInquiriesThisMonth > 0 ? Math.round((stats.newInquiriesThisMonth / stats.totalInquiries) * 100) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="New Inquiries"
              value={stats.newInquiries}
              icon={<ContactMailIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={<ShoppingCartIcon />}
              color="success"
            />
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Users
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Joined</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name || 'N/A'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.role}
                              size="small"
                              color={getStatusColor(user.role) as any}
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Inquiries
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={inquiry.status}
                              size="small"
                              color={getStatusColor(inquiry.status) as any}
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AdminLayout>
    )
  }