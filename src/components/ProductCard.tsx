import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -6, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      elevation={0}
      sx={{ display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', position: 'relative' }}
    >
      <Box sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(255,153,51,0.12), rgba(255,215,0,0.25))', p: 3 }}>
        <Box component="img" src={product.image} alt={product.name} sx={{ maxHeight: 120, maxWidth: '100%', objectFit: 'contain' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{product.description}</Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          component={Link as any}
          href="/contact"
          size="small"
          color="secondary"
          variant="contained"
          sx={{ fontWeight: 600 }}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};
