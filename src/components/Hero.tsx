import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@mui/material/Button';

export const Hero: React.FC = () => {
  return (
    <section className="gradient-hero py-24 relative overflow-hidden">
      <div className="container-default relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h1 max-w-3xl bg-clip-text text-transparent bg-gradient-to-br from-chili via-saffron to-herbal"
        >
          Bringing the Taste of India to the World.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="p-lead mt-6 max-w-2xl"
        >
          Premium-quality Makhana & Indian spices, processed and packed with care.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex gap-4"
        >
          <Button
            component={Link as any}
            href="/products"
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              ':hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }
            }}
            className="rounded-md"
          >
            Explore Products
          </Button>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply bg-[radial-gradient(circle_at_30%_30%,#FFD700_0%,transparent_60%),radial-gradient(circle_at_70%_60%,#FF9933_0%,transparent_55%)]" />
    </section>
  );
};
