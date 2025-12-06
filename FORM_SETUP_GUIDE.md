# CIRVION Contact Form Setup Guide

## How to Receive Form Submissions

Your contact form is now configured to use **Web3Forms** - a free service that sends form submissions directly to your email.

### Setup Steps:

1. **Get Your Free Access Key**
   - Visit: https://web3forms.com
   - Click "Get Started" or "Create Access Key"
   - Enter your email: `siddhantpitale125@gmail.com`
   - You'll receive an access key (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

2. **Add the Access Key to Your Website**
   - Open: `src/components/ContactFooter.jsx`
   - Find line 42: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
   - Save the file

3. **Test the Form**
   - Run `npm run build` and `npm run dev`
   - Fill out the contact form on your website
   - Submit it
   - Check your email (`siddhantpitale125@gmail.com`)

### What Happens When Someone Submits the Form:

1. User fills out the form and clicks "Send Message"
2. Form data is sent to Web3Forms API
3. Web3Forms forwards the data to your email
4. You receive an email with:
   - Name
   - Business
   - Phone
   - Email
   - Message
5. User sees a success message
6. Form clears automatically

### Features Included:

✅ Form validation (required fields)
✅ Loading state while submitting
✅ Success/error messages
✅ Automatic form reset after submission
✅ Disabled button during submission
✅ Email notifications to your inbox

### Alternative Options:

If you prefer a different service:

**Option 1: Formspree** (https://formspree.io)
- Similar to Web3Forms
- Free tier: 50 submissions/month
- Easy setup

**Option 2: EmailJS** (https://www.emailjs.com)
- Free tier: 200 emails/month
- Sends from your own email

**Option 3: Backend Integration**
- Set up your own Node.js/Express backend
- Use Nodemailer to send emails
- More control but requires server

### Current Configuration:

- **Service**: Web3Forms
- **Recipient Email**: siddhantpitale125@gmail.com
- **Form Fields**: Name, Business, Phone, Email, Message
- **Validation**: Name and Email are required
- **Success Message**: "Thank you! Your message has been sent successfully..."
- **Error Fallback**: Displays your email for direct contact

### Need Help?

If you have issues:
1. Check that you've replaced `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
2. Verify your email is correct in Web3Forms dashboard
3. Check browser console for any errors
4. Test with a simple submission

---

**Note**: The form is currently set up but won't work until you add your Web3Forms access key!
