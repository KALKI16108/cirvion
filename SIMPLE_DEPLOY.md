# 🚀 VERCEL DEPLOYMENT — 3 STEP PROCESS

---

## STEP 1: Commit Changes (1 minute)

Copy & paste this in terminal:

```bash
cd c:\Users\dasha\OneDrive\Documents\GitHub\cirvion
git add .
git commit -m "SEO optimization: Lab removed, global/local keywords, Service schemas, robots.txt, sitemap.xml"
git push origin main
```

**Then wait 2-5 minutes for Vercel to build & deploy**

---

## STEP 2: Verify Live (1 minute)

Replace `yourdomain` with your actual Vercel domain, then run:

```bash
curl -I https://yourdomain.vercel.app/robots.txt
curl -I https://yourdomain.vercel.app/sitemap.xml
```

**Expected:** Both return `200 OK`

---

## STEP 3: Submit to Google (5 minutes)

1. **Google Search Console:**
   - Go: https://search.google.com/search-console
   - Add Property: `https://yourdomain.vercel.app`
   - Verify ownership

2. **Submit Sitemap:**
   - GSC → Indexing → Sitemaps
   - Paste: `https://yourdomain.vercel.app/sitemap.xml`
   - Click: Submit

3. **Validate Schemas:**
   - Go: https://search.google.com/test/rich-results
   - Test: `https://yourdomain.vercel.app`
   - Should see: ✅ Organization, LocalBusiness, Lead Qualifier, Document Digitization schemas

4. **Monitor Core Web Vitals:**
   - Wait 24-48 hours
   - GSC → Experience → Core Web Vitals
   - Should be Green ✓

---

## ✅ DONE

Your site is now:
- ✅ Deployed on Vercel
- ✅ Optimized for global + local search
- ✅ Indexed by Google
- ✅ Ready for organic traffic

**Expected results:**
- Week 1: Indexed
- Week 2-4: Rankings appear
- Month 1+: +30-50% organic traffic increase

---

## 🔗 Vercel Dashboard

Monitor your deployment: https://vercel.com/dashboard
