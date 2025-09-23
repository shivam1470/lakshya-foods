import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material'
import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'

interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product: {
    id: string
    name: string
    category: string
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  currency: string
  paymentStatus: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    company: string
  }
  items: OrderItem[]
}

interface OrderMenuProps {
  order: Order
  onUpdateStatus: (order: Order) => void
  onUpdatePayment: (order: Order) => void
}

const OrderMenu: React.FC<OrderMenuProps> = ({ order, onUpdateStatus, onUpdatePayment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { onUpdateStatus(order); handleClose() }}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Update Status
        </MenuItem>
        <MenuItem onClick={() => { onUpdatePayment(order); handleClose() }}>
          <PaymentIcon sx={{ mr: 1 }} fontSize="small" />
          Update Payment
        </MenuItem>
      </Menu>
    </>
  )
}

export default function AdminOrders() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [statusDialog, setStatusDialog] = useState(false)
  const [paymentDialog, setPaymentDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [newPaymentStatus, setNewPaymentStatus] = useState('')

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

    fetchOrders()
  }, [session, status, router, page, rowsPerPage, search, statusFilter, paymentFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
        search,
        status: statusFilter,
        paymentStatus: paymentFilter
      })

      const response = await fetch(`/api/admin/orders?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await response.json()
      setOrders(data.orders)
      setTotal(data.pagination.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setStatusDialog(true)
  }

  const handleUpdatePayment = (order: Order) => {
    setSelectedOrder(order)
    setNewPaymentStatus(order.paymentStatus)
    setPaymentDialog(true)
  }

  const handleStatusChange = async () => {
    if (!selectedOrder || !newStatus) return

    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          action: 'updateStatus',
          data: { status: newStatus }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      setStatusDialog(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order')
    }
  }

  const handlePaymentChange = async () => {
    if (!selectedOrder || !newPaymentStatus) return

    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          action: 'updatePayment',
          data: { paymentStatus: newPaymentStatus }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update payment status')
      }

      setPaymentDialog(false)
      setSelectedOrder(null)
      fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'processing': return 'info'
      case 'shipped': return 'primary'
      case 'delivered': return 'success'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'paid': return 'success'
      case 'failed': return 'error'
      case 'refunded': return 'info'
      default: return 'default'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <LinearProgress />
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Management
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Manage customer orders and fulfillment
      </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField
            placeholder="Search orders..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 300 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Payment</InputLabel>
            <Select
              value={paymentFilter}
              label="Payment"
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <MenuItem value="all">All Payments</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Orders Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {order.user.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {order.user.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={getStatusColor(order.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentStatus}
                        size="small"
                        color={getPaymentColor(order.paymentStatus) as any}
                      />
                    </TableCell>
                    <TableCell>
                      {order.currency} {order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <OrderMenu
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                        onUpdatePayment={handleUpdatePayment}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
          />
        </Paper>

        {/* Status Change Dialog */}
        <Dialog open={statusDialog} onClose={() => setStatusDialog(false)}>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" paragraph>
              Update status for order {selectedOrder?.orderNumber}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
            <Button onClick={handleStatusChange} variant="contained">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>

        {/* Payment Status Dialog */}
        <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)}>
          <DialogTitle>Update Payment Status</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" paragraph>
              Update payment status for order {selectedOrder?.orderNumber}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={newPaymentStatus}
                label="Payment Status"
                onChange={(e) => setNewPaymentStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="refunded">Refunded</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
            <Button onClick={handlePaymentChange} variant="contained">
              Update Payment
            </Button>
          </DialogActions>
        </Dialog>
      </AdminLayout>
    )
  }