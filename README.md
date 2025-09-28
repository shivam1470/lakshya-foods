# Lakshya Foods - Premium Spices Export Website

A modern Next.js website for Lakshya Foods, featuring comprehensive admin dashboard, user management, and order tracking system.

## 🌐 Live Demo
**[View Live Site](https://your-deployed-url.vercel.app)** ← *Update this after deployment*

## 🚀 Features

### Frontend
- **Modern Design**: Clean, responsive design with Material-UI + Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth and email/password
- **User Profiles**: Complete user profile management
- **Contact Forms**: Integrated contact and inquiry system
- **SEO Optimized**: Meta tags and optimized performance

### Admin Dashboard 🔐
- **Dashboard Overview**: Key metrics and business insights at `/admin`
- **User Management**: Complete user administration with role management at `/admin/users`
- **Order Management**: Order tracking and status management at `/admin/orders`
- **Inquiry Management**: Customer inquiry tracking
- **Role-based Access**: Secure admin-only access with middleware protection

### Technical Stack
- **Frontend**: Next.js 14 (Pages Router), TypeScript, Material-UI, Tailwind CSS
- **Authentication**: NextAuth.js with JWT sessions and Google OAuth
- **Database**: Prisma ORM with SQLite (production-ready for PostgreSQL)
- **Styling**: Emotion SSR + Material-UI theming + Tailwind utilities
- **Animations**: Framer Motion for enhanced UX
- **Deployment**: Vercel-optimized with standalone output

## 🛠 Development Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/shivam1470/lakshya-foods.git
cd lakshya-foods

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database (initial - PostgreSQL recommended)
npx prisma generate
# After setting a real Postgres DATABASE_URL run:
# npx prisma migrate dev --name init

# Start development server
pnpm dev
```

Visit: http://localhost:3000

### Environment Variables
Create a `.env.local` file with:
```env
# Database (use Neon / Supabase / Railway Postgres in production)
# Example Neon connection string:
# postgresql://USER:PASSWORD@ep-your-neon-host.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Scripts
- `pnpm dev` – start dev server
- `pnpm build` – production build
- `pnpm start` – run production server
- `pnpm lint` – lint codebase
- `pnpm deploy` – full deployment script
- `pnpm quick-deploy` – quick deployment script

## 📦 Deployment

### Quick Deployment Scripts
```bash
# Using the comprehensive deployment script
./deploy.sh "Your commit message"

# Or using npm script
npm run deploy

# Quick deploy (shorter script)
./quick-deploy.sh "Quick update"
```

### Manual Deployment Steps

1. **Build and Test**:
   ```bash
   pnpm build
   ```

2. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

3. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI (if not installed)
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

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

3. **Environment Variables (Required)**
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

Update variables as needed for your deployment. For production ensure:

| Variable | Required | Notes |
|----------|----------|-------|
| DATABASE_URL | Yes | Postgres connection string (Neon recommended) |
| NEXTAUTH_SECRET | Yes | Strong random value (openssl rand -base64 32) |
| NEXTAUTH_URL | Yes | Your deployed HTTPS URL |
| GOOGLE_CLIENT_ID | Optional | If enabling Google OAuth |
| GOOGLE_CLIENT_SECRET | Optional | Paired with client id |
| SEED_ADMIN_EMAIL | Optional | Only if using seed script |
| SEED_ADMIN_PASSWORD | Optional | Only if using seed script |
| SEED_ADMIN_NAME | Optional | Only if using seed script |

### Health & Diagnostics

The application exposes a lightweight health endpoint:

`/api/health` → Returns `{ status: 'ok', ... }` if the runtime is alive.

Troubleshooting 500 errors:
1. Check Vercel function logs (Dashboard → Deployments → Functions)
2. Hit `/api/health` (should return 200)
3. Verify env vars are set correctly (especially `DATABASE_URL` & `NEXTAUTH_SECRET`)
4. Run `npx prisma migrate deploy` locally to confirm migrations apply cleanly
5. Redeploy after fixing variables.

### Migration Workflow

Local development (first time after switching to Postgres):
```bash
export DATABASE_URL=postgresql://USER:PASSWORD@HOST/dbname?sslmode=require
npx prisma migrate dev --name init
```

Production (Vercel) build integrates migration with: `prisma migrate deploy` (will be added to build script once migrations are committed).

### Seeding (Optional)
You can add a seed script to create an initial admin user. Provide `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and run:
```bash
npx ts-node prisma/seed.ts
```

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
