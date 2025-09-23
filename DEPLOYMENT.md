# 🚀 Deployment Guide for Lakshya Foods

## Prerequisites
- ✅ Your code should be pushed to a GitHub repository
- ✅ Production build works locally (`pnpm build && pnpm start`)

## Option 1: Deploy to Vercel (Recommended - FREE)

### Quick Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/lakshya-foods)

### Manual Deployment Steps

#### 1. Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/lakshya-foods.git
git branch -M main
git push -u origin main
```

#### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect settings:
   - **Framework**: Next.js
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
6. Click **"Deploy"**

#### 3. Environment Variables (Optional)
If you need environment variables:
1. Go to Project Settings → Environment Variables
2. Add variables from `.env.example`
3. Redeploy if needed

#### 4. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps

---

## Option 2: Deploy to Netlify (FREE Alternative)

#### 1. Build for Static Export
Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
```

#### 2. Add Export Script
Add to `package.json` scripts:
```json
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

#### 3. Deploy to Netlify
1. Run `pnpm run export`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `out` folder
4. Or connect GitHub repository with build settings:
   - **Build command**: `pnpm run export`
   - **Publish directory**: `out`

---

## Option 3: Deploy to GitHub Pages (FREE)

#### 1. Install gh-pages
```bash
pnpm add -D gh-pages
```

#### 2. Update package.json
```json
{
  "homepage": "https://your-username.github.io/lakshya-foods",
  "scripts": {
    "predeploy": "pnpm run export",
    "deploy": "gh-pages -d out"
  }
}
```

#### 3. Deploy
```bash
pnpm run deploy
```

---

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images display properly
- [ ] Contact form works (if implemented)
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present
- [ ] Performance is acceptable
- [ ] Update README.md with live URL

---

## Troubleshooting

### Build Fails
- Check for TypeScript errors: `pnpm run lint`
- Ensure all imports use correct paths (no `.tsx` extensions)
- Check console for missing dependencies

### Images Not Loading
- Ensure images are in `public/` directory
- Use relative paths: `/images/logo.svg`
- For static export, set `images.unoptimized: true`

### Environment Variables
- Prefix client-side variables with `NEXT_PUBLIC_`
- Never commit `.env.local` to git
- Update `.env.example` for team reference

---

## Performance Tips

Your site is already optimized with:
- ✅ SWC minification
- ✅ Image optimization (Vercel)
- ✅ Compression enabled
- ✅ Static page generation
- ✅ Bundle analysis ready

## Support

If you encounter issues:
1. Check [Next.js deployment docs](https://nextjs.org/docs/deployment)
2. Check [Vercel documentation](https://vercel.com/docs)
3. Review build logs for specific errors

---

**Happy Deploying! 🎉**