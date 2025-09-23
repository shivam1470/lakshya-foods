import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Breadcrumbs
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  ContactMail as ContactMailIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material'
import { Layout } from './Layout'

const DRAWER_WIDTH = 240

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <DashboardIcon />
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: <PeopleIcon />
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: <ShoppingCartIcon />
  },
  {
    title: 'Inquiries',
    href: '/admin/inquiries',
    icon: <ContactMailIcon />
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: <AssessmentIcon />
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const router = useRouter()

  const getCurrentPageTitle = () => {
    const currentPath = router.pathname
    const navItem = adminNavItems.find(item => item.href === currentPath)
    return navItem?.title || 'Admin'
  }

  return (
    <Layout title={title || `Admin ${getCurrentPageTitle()}`}>
      <Box sx={{ display: 'flex' }}>
        {/* Admin Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              position: 'relative',
              backgroundColor: '#f8f9fa',
              borderRight: '1px solid #e0e0e0'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Admin Panel
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lakshya Foods Management
            </Typography>
          </Box>
          <Divider />
          
          <List sx={{ px: 1, py: 2 }}>
            {adminNavItems.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white'
                        }
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? 'white' : 'text.secondary'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 600 : 500
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography color="textSecondary">Admin</Typography>
            </Link>
            <Typography color="textPrimary">{getCurrentPageTitle()}</Typography>
          </Breadcrumbs>

          {children}
        </Box>
      </Box>
    </Layout>
  )
}