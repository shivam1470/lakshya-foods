import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/export', label: 'Export' },
  { href: '/contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value: boolean) => () => setOpen(value);

  return (
    <AppBar position="sticky" elevation={0} color="inherit" sx={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.85)', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto' }}>
        <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ background: 'linear-gradient(135deg,#FF9933,#FFD700)', width: 40, height: 40, borderRadius: '50%', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>L</Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>Lakshya Foods</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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
        </Box>
        <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { md: 'none' } }} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Menu</Typography>
            <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
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
            </List>
          <Box sx={{ mt: 'auto', p: 2 }}>
            <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} Lakshya Foods</Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};
