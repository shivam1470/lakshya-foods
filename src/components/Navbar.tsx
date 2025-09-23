import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/export', label: 'Export' },
  { href: '/contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDrawer = (value: boolean) => () => setOpen(value);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    handleUserMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={0} color="inherit" sx={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.85)', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto' }}>
        <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ background: 'linear-gradient(135deg,#FF9933,#FFD700)', width: 40, height: 40, borderRadius: '50%', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>L</Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>Lakshya Foods</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
          {navItems.map(item => {
            const active = router.pathname === item.href;
            return (
              <Button
                key={item.href}
                component={Link as any}
                href={item.href}
                color={active ? 'primary' : 'inherit'}
                sx={{ fontWeight: active ? 600 : 500 }}
              >
                {item.label}
              </Button>
            );
          })}
          
          {/* Authentication Buttons */}
          {status === 'loading' ? (
            <Box sx={{ width: 100 }} />
          ) : session ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handleUserMenuOpen} size="small">
                <Avatar
                  src={session.user?.image || undefined}
                  alt={session.user?.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                >
                  {session.user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => router.push('/profile')}>
                  <AccountCircleIcon sx={{ mr: 2 }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link as any}
                href="/auth/signin"
                variant="outlined"
                size="small"
              >
                Sign In
              </Button>
              <Button
                component={Link as any}
                href="/auth/signup"
                variant="contained"
                size="small"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { md: 'none' } }} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Menu</Typography>
            <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          
          {/* User Info in Mobile */}
          {session && (
            <>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={session.user?.image || undefined}
                  alt={session.user?.name || 'User'}
                  sx={{ width: 40, height: 40 }}
                >
                  {session.user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">{session.user?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{session.user?.email}</Typography>
                </Box>
              </Box>
              <Divider />
            </>
          )}

          <List>
            {navItems.map(item => {
              const active = router.pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton component={Link as any} href={item.href} selected={active} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            
            {/* Mobile Auth Links */}
            {session ? (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { router.push('/profile'); toggleDrawer(false)(); }}>
                    <AccountCircleIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleSignOut}>
                    <LogoutIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Sign Out" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                  <ListItemButton component={Link as any} href="/auth/signin" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link as any} href="/auth/signup" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
          
          <Box sx={{ mt: 'auto', p: 2 }}>
            <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} Lakshya Foods</Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};
