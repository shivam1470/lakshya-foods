# Lakshya Foods Website

A production-ready marketing site for Lakshya Foods built with:

- Next.js 14 (Pages Router)
- TypeScript
- Tailwind CSS
- Material UI (MUI 5) + Emotion SSR
- Framer Motion for animations

## 🌐 Live Demo
**[View Live Site](https://your-deployed-url.vercel.app)** ← *Update this after deployment*

## Features
- Responsive layout with Tailwind utility classes + MUI components
- SEO meta tags via `Layout` component
- Hero, Products grid, About, Export, Contact pages
- Reusable components: Navbar, Footer, Hero, ProductCard, ContactForm, Layout
- Placeholder SVG images in `public/images`
- MUI Theme integrated with brand colors
- Emotion SSR for critical CSS in `_document`
- Optimized for production deployment

## Getting Started

Install dependencies (pnpm recommended):

```bash
pnpm install
pnpm dev
```

Then visit: http://localhost:3000

## Scripts
- `pnpm dev` – start dev server
- `pnpm build` – production build
- `pnpm start` – run production server
- `pnpm lint` – lint codebase

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended - FREE)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/lakshya-foods)

#### Manual Deployment Steps:

1. **Prepare Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings:
     - Framework: Next.js
     - Build Command: `pnpm build`
     - Output Directory: `.next`
   - Click "Deploy"

3. **Environment Variables (Optional)**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add any variables from `.env.example`
   - Redeploy if needed

### Alternative Free Hosting Options:

#### Netlify
1. Connect GitHub repository
2. Build command: `pnpm build && pnpm export`
3. Publish directory: `out`

#### GitHub Pages (with GitHub Actions)
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions workflow for automated deployment

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Update variables as needed for your deployment.

## Tech Notes
- Tailwind + MUI: Tailwind handles layout/spacing; MUI handles form elements and accessible components
- Animations: Framer Motion used in Hero and Product cards
- Extend theme in `src/components/theme.ts`
- Optimized build configuration for production
- Standalone output for better performance

## Performance Optimizations
- ✅ SWC Minification enabled
- ✅ Image optimization with WebP/AVIF support
- ✅ Compression enabled
- ✅ Trailing slash normalization
- ✅ Powered-by header removed for security
- ✅ Standalone output for faster cold starts

## Future Enhancements
- Product detail pages / e-commerce integration
- CMS for product management
- Internationalization (i18n)
- Analytics & structured data

## License
MIT
