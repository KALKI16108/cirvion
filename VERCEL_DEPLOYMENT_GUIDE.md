# 🚀 Vercel Deployment Guide for AIFLOWIX

## Quick Setup

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Security hardening + Vercel configuration"
git push origin main
```

### 2. **Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "aiflowix" repository
5. Click "Import"

### 3. **Configure Environment Variables**
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add the following:
   - **Name:** `VITE_WEB3FORMS_KEY`
   - **Value:** (Your Web3Forms access key)
   - **Environments:** Select all (Production, Preview, Development)
3. Click "Save"

### 4. **Deploy**
```bash
# Vercel will auto-build and deploy on every push
# Just push to main branch and Vercel handles it
git push origin main
```

---

## Configuration Files

### ✅ `vercel.json`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework:** Vite
- **Security Headers:** All configured
- **Caching Rules:** Optimized for performance
- **Rewrites:** SPA routing configured

### ✅ Security Headers Included
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Strict-Transport-Security (HSTS)
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ Content-Security-Policy (CSP)

---

## Environment Variables Setup

### In Vercel Dashboard:

1. **VITE_WEB3FORMS_KEY** — Web3Forms API key (required for contact form)
   - Get it from: https://web3forms.com
   - Keep it secret (never commit to git)

2. Optional: Add any other variables you need

### Local Development:
Create `.env.local` file (ignored by git):
```
VITE_WEB3FORMS_KEY=your_actual_key_here
```

---

## Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] VITE_WEB3FORMS_KEY added to environment variables
- [ ] First deployment successful
- [ ] HTTPS working (automatic on Vercel)
- [ ] Contact form tested and working
- [ ] Security headers verified

---

## Verify Deployment

### Check Security Headers:
```bash
curl -I https://your-domain.vercel.app

# Look for these in response:
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: ...
# Content-Security-Policy: ...
```

### Check Lighthouse:
```bash
npm run lighthouse
# (Update URL in package.json to your Vercel domain)
```

---

## Auto-Deploy Setup

Vercel **automatically deploys** when you push to main:

```bash
# Update code locally
npm run build  # Test locally
git add .
git commit -m "Update: description of changes"
git push origin main

# Vercel automatically:
# 1. Pulls latest code
# 2. Runs: npm install
# 3. Runs: npm run build
# 4. Deploys dist/ folder
# 5. Assigns HTTPS certificate
# 6. Applies security headers
```

---

## Preview Deployments

Every Pull Request gets a preview URL:
- PR opened → Vercel creates preview deployment
- PR updated → Preview auto-updates
- PR merged → Production deployment

---

## Custom Domain

1. Go to Vercel dashboard → **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., mywebsite.in)
4. Update DNS records (instructions provided by Vercel)
5. Verify and activate

---

## Performance Optimization

Vercel automatically:
- ✅ Compresses files (gzip/brotli)
- ✅ Minifies JavaScript/CSS
- ✅ Optimizes images
- ✅ Enables HTTP/2
- ✅ Uses CDN globally
- ✅ Caches assets per vercel.json rules

---

## Troubleshooting

### Build Fails:
```bash
# Check logs in Vercel dashboard
# Usually npm dependencies issue
# Clear cache and redeploy
```

### Form Not Sending:
- Verify VITE_WEB3FORMS_KEY is set in environment variables
- Verify it's the correct key from Web3Forms
- Check browser console for errors

### Headers Not Applied:
- Verify vercel.json is in root directory
- Redeploy project
- Check Vercel dashboard deployment logs

---

## Security Notes

🔒 **Never:**
- ❌ Commit `.env` files
- ❌ Expose API keys in code
- ❌ Share environment variable values

✅ **Always:**
- ✅ Use environment variables for secrets
- ✅ Restrict API keys to Web3Forms only
- ✅ Monitor form submissions for abuse

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Web3Forms:** https://web3forms.com/docs
- **Vite:** https://vitejs.dev/

---

**Deployment Ready!** 🚀
Your site is configured for secure, fast deployment on Vercel.
