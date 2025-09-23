import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const pageTitle = title ? `${title} | Lakshya Foods` : 'Lakshya Foods | Pure. Healthy. Global.';
  const metaDescription = description || 'Premium-quality Makhana & Indian spices. Pure, healthy, and globally trusted.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF9933" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lakshya Foods" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box component="main" flexGrow={1}>
          <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
            {children}
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
