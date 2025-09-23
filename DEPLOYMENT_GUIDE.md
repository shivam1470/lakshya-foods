# 🚀 Deployment Instructions for Lakshya Foods

## Quick Start Deployment

### Option 1: Use Deployment Scripts (Recommended)

```bash
# Full deployment with build verification
./deploy.sh "Your commit message"

# Quick deployment
./quick-deploy.sh "Quick update"

# Using npm scripts
npm run deploy
npm run quick-deploy
```

### Option 2: Manual Step-by-Step

1. **Prepare and Test**
   ```bash
   # Build to check for errors
   pnpm build
   
   # Add all changes
   git add .
   
   # Commit with meaningful message
   git commit -m "feat: your changes description"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Deploy to Vercel**
   ```bash
   # Login to Vercel (first time only)
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

## Platform-Specific Instructions

### Vercel (Recommended - Free Tier Available)

#### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import the repository `shivam1470/lakshya-foods`
4. Configure environment variables:
   - `NEXTAUTH_URL`: Your domain (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Random secret string
   - `DATABASE_URL`: Database connection string
   - `GOOGLE_CLIENT_ID`: Google OAuth Client ID (optional)
   - `GOOGLE_CLIENT_SECRET`: Google OAuth Secret (optional)
5. Deploy!

#### Via CLI:
```bash
# First time setup
vercel login
cd /path/to/lakshya-foods
vercel

# Production deployments
vercel --prod
```

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Environment variables: Same as Vercel
4. Deploy

### Railway

1. Connect GitHub repository
2. Configure environment variables
3. Railway auto-detects Next.js and deploys

## Environment Variables Setup

### Required Variables:
```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-key-here
DATABASE_URL=your-database-connection-string
```

### Optional (for Google OAuth):
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Database Options:

#### Development (SQLite):
```env
DATABASE_URL="file:./dev.db"
```

#### Production (PostgreSQL):
```env
DATABASE_URL="postgresql://username:password@hostname:port/database"
```

## Post-Deployment Setup

### 1. Create Admin User
After deployment, create an admin user:

1. Register a normal user account on your deployed site
2. Access your database (Prisma Studio, database dashboard, etc.)
3. Update the user's `role` field from `"customer"` to `"admin"`
4. The user can now access `/admin` routes

### 2. Test Admin Features
- Visit `/admin` for dashboard overview
- Test user management at `/admin/users`
- Check order management at `/admin/orders`

### 3. Configure Domain (Optional)
- Add custom domain in your hosting platform
- Update `NEXTAUTH_URL` environment variable
- Redeploy if necessary

## Monitoring and Maintenance

### Performance Monitoring
- Use Vercel Analytics (if on Vercel)
- Monitor Core Web Vitals
- Check build times and deployment logs

### Database Maintenance
- Regular backups
- Monitor query performance
- Update Prisma schema as needed

### Security Updates
- Keep dependencies updated: `pnpm update`
- Monitor for security advisories
- Regular security audits

## Troubleshooting

### Common Issues:

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   pnpm build
   ```

2. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check database server status
   - Run `npx prisma db push` after schema changes

3. **Authentication Issues**
   - Verify `NEXTAUTH_URL` matches your domain
   - Check `NEXTAUTH_SECRET` is set
   - Verify OAuth app configuration (if using Google)

4. **Admin Access Issues**
   - Confirm user role is set to "admin" in database
   - Check middleware configuration
   - Verify session is active

### Getting Help:
- Check deployment logs in your platform dashboard
- Review Next.js and Vercel documentation
- Check GitHub issues for known problems

## Deployment Checklist

- [ ] Code committed to GitHub
- [ ] Build passes locally (`pnpm build`)
- [ ] Environment variables configured
- [ ] Domain configured (if using custom domain)
- [ ] Database accessible from production
- [ ] Admin user created and tested
- [ ] All admin features working
- [ ] Authentication flow tested
- [ ] Performance metrics reviewed

---

**Happy Deploying! 🎉**

For support: [shivammishr16@gmail.com](mailto:shivammishr16@gmail.com)