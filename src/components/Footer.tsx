import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Divider from '@mui/material/Divider';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ mt: 8, background: 'linear-gradient(135deg, rgba(34,139,34,0.08) 0%, rgba(255,153,51,0.08) 100%)', borderTop: '1px solid #f1f1f1' }}>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ background: 'linear-gradient(135deg,#FF9933,#FFD700)', width: 36, height: 36, borderRadius: '50%', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>L</Box>
              <Typography fontWeight={600} color="primary.main">Lakshya Foods</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">Pure. Healthy. Global.</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
              <Link href="/export">Export</Link>
              <Link href="/contact">Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>Contact</Typography>
            <Typography variant="body2" color="text.secondary">Email: <Link href="mailto:info@lakshyafoods.com">info@lakshyafoods.com</Link></Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Phone: <Link href="tel:+911234567890">+91 12345 67890</Link></Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
              <IconButton size="small" aria-label="Instagram" color="primary"><InstagramIcon fontSize="small" /></IconButton>
              <IconButton size="small" aria-label="LinkedIn" color="primary"><LinkedInIcon fontSize="small" /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="caption" color="text.secondary" display="block" textAlign="center">© {new Date().getFullYear()} Lakshya Foods. All rights reserved.</Typography>
      </Container>
    </Box>
  );
};
