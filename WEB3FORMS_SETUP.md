# Web3Forms Integration Guide for AIFLOWIX

## ✅ What's Already Done

The contact form has been fully integrated with Web3Forms, a FREE email service that handles form submissions. No backend server needed!

### Features:
- ✅ Secure form validation (client-side)
- ✅ Input sanitization (prevents XSS attacks)
- ✅ FormData submission via Web3Forms API
- ✅ Error handling and user feedback
- ✅ Success message and form reset
- ✅ Environment variable support for API key

---

## 🚀 Setup Instructions

### Step 1: Get Your Web3Forms API Key

1. Visit **https://web3forms.com**
2. Click **"Sign Up"** (completely FREE)
3. Enter your email and verify it
4. Create a new **Form Access Key**
5. Copy the key (looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### Step 2: Local Development Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace:
   ```dotenv
   VITE_WEB3FORMS_KEY=your_web3forms_access_key_here
   ```
   with your actual key from Step 1.

3. Run development server:
   ```bash
   npm run dev
   ```

4. Test the form at **http://localhost:5173/#contact**

### Step 3: Production Setup (Vercel)

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to **https://vercel.com/dashboard**
2. Select your **AIFLOWIX** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and fill in:
   - **Name:** `VITE_WEB3FORMS_KEY`
   - **Value:** Your Web3Forms API key from Step 1
   - **Environments:** Select `Production`
5. Click **Save**
6. Go to **Deployments** tab
7. Find the latest deployment
8. Click **Redeploy** button
9. Wait for ✅ **Ready** status

#### Option B: Using Vercel CLI

```bash
vercel env add VITE_WEB3FORMS_KEY
# Paste your API key when prompted
vercel deploy --prod
```

### Step 4: Test Production

1. Visit **https://www.aiflowix.in/#contact**
2. Fill out the contact form with test data
3. Click **Send Message**
4. You should receive an email at your registered email address
5. Confirm it works!

---

## 📋 Troubleshooting

### Form not submitting?

**Check 1: Verify Environment Variable is Set**
```bash
# In browser DevTools Console:
console.log(import.meta.env.VITE_WEB3FORMS_KEY)
# Should show your API key (NOT "undefined")
```

**Check 2: Verify Web3Forms Account**
- Log in to https://web3forms.com
- Confirm your form access key is active
- Check email didn't end up in spam

**Check 3: Check Browser Console for Errors**
- Open **DevTools** (F12)
- Go to **Console** tab
- Look for error messages
- Report any errors to team

### "Contact form is temporarily unavailable" message?

This means `VITE_WEB3FORMS_KEY` is not set. Follow **Step 3** above.

### Email not received?

1. Check spam/junk folder
2. Verify Web3Forms access key is correct
3. Try again from a different email address
4. Check Web3Forms dashboard for submission logs

---

## 🔐 Security Details

### Why This is Secure:

- ✅ **No backend needed** - Web3Forms handles everything
- ✅ **API key is exposed** - It's designed to be public (can't access other forms)
- ✅ **HTTPS only** - All requests encrypted
- ✅ **Form validation** - Input sanitized before sending
- ✅ **CORS protected** - Web3Forms verifies requests come from your domain
- ✅ **No data stored** - Form data only sent to your email

### Best Practices:

- ✅ Add `VITE_WEB3FORMS_KEY` to Vercel environment variables
- ✅ Never commit `.env.local` to GitHub
- ✅ Test form in local development first
- ✅ Monitor spam folder for first submissions
- ✅ Keep Web3Forms account secure

---

## 📞 Contact Form Behavior

### What Happens When User Submits:

1. **Client-Side Validation** ✓
   - Name (required, min 2 chars)
   - Email (required, valid format)
   - Phone (optional, validates if provided)
   - Message (required, min 5 chars)

2. **Sanitization** ✓
   - Removes HTML/script tags
   - Limits length to 500 chars per field
   - Prevents XSS attacks

3. **Send to Web3Forms** ✓
   ```javascript
   POST https://api.web3forms.com/submit
   - access_key: VITE_WEB3FORMS_KEY
   - name, business, phone, email, message
   - from_name: "AIFLOWIX Contact Form"
   - subject: "New Contact Request from [Name]"
   ```

4. **Receive Email** ✓
   - Email sent to your registered email
   - Subject: "New Contact Request from [Name]"
   - Contains all form data

5. **User Feedback** ✓
   - Success: "Thank you! Your message has been sent successfully."
   - Error: "Oops! Something went wrong. Please try again..."

---

## 🛠️ Configuration Files

### vercel.json
```json
{
  "env": {
    "VITE_WEB3FORMS_KEY": "@web3forms_key"
  },
  "build": {
    "env": ["VITE_WEB3FORMS_KEY"]
  }
  // ... rest of config
}
```

### .env.example
Template for developers to see required variables.

### .env.local
Your local development environment (NEVER commit to GitHub).

### .gitignore
```
.env.local
.env
```

---

## 📊 Monitoring

### Check Web3Forms Submissions:
1. Log in to https://web3forms.com
2. Go to your form dashboard
3. View all submissions and timestamps
4. Export as CSV if needed

### Check Vercel Logs:
1. Go to **https://vercel.com/dashboard**
2. Select AIFLOWIX project
3. Go to **Deployments**
4. Click deployment to see build logs
5. Check **Functions** tab for any API errors

---

## 🎯 Next Steps

1. ✅ Get Web3Forms API key from https://web3forms.com
2. ✅ Set in Vercel environment variables
3. ✅ Redeploy from Vercel dashboard
4. ✅ Test form submission
5. ✅ Check email for test message
6. ✅ Monitor for real submissions

---

## 📞 Support

If you have questions:
- **Web3Forms Docs:** https://web3forms.com/documentation
- **Vercel Docs:** https://vercel.com/docs
- **AIFLOWIX Team:** siddhantpitale125@gmail.com

---

**Status:** ✅ Form integration complete and ready to use!
