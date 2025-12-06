# How to Add a Favicon to Your CIRVION Website

A favicon is the small icon that appears in the browser tab next to your website title.

## Steps to Add a Favicon:

### 1. **Prepare Your Favicon Image**

You'll need a favicon in one of these formats:
- **Recommended**: `.ico` file (supports multiple sizes)
- **Alternative**: `.png` file (32x32 or 16x16 pixels)
- **Modern**: `.svg` file (scalable, best for simple logos)

**Recommended sizes:**
- 16x16 pixels (standard)
- 32x32 pixels (retina displays)
- 48x48 pixels (Windows)
- 180x180 pixels (Apple touch icon)

### 2. **Create Your Favicon**

**Option A: Use an Online Favicon Generator**
- Visit: https://favicon.io or https://realfavicongenerator.net
- Upload your CIRVION logo (the circuit "C" icon works great)
- Download the generated favicon package

**Option B: Create Manually**
- Export your logo as a square image (512x512px recommended)
- Use an image editor to resize to 32x32px
- Save as `favicon.ico` or `favicon.png`

### 3. **Add Favicon to Your Project**

1. Place your favicon file in the `public` folder:
   ```
   CIRVION/
   └── public/
       └── favicon.ico  (or favicon.png)
   ```

2. Open `index.html` and add this line in the `<head>` section (after the charset meta tag):

   **For .ico file:**
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   ```

   **For .png file:**
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

   **For .svg file:**
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   ```

### 4. **Add Apple Touch Icon (Optional but Recommended)**

For iOS devices, add an Apple touch icon:

1. Create a 180x180px PNG version of your logo
2. Save it as `apple-touch-icon.png` in the `public` folder
3. Add this to `index.html` in the `<head>` section:
   ```html
   <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
   ```

### 5. **Complete Favicon Setup (All Platforms)**

For maximum compatibility across all devices and platforms, add these lines to `index.html`:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

### 6. **Test Your Favicon**

1. Save all changes
2. Rebuild your project: `npm run build`
3. Restart dev server: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173`
5. Check the browser tab - you should see your favicon!

**Note:** You may need to hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to see the new favicon.

---

## Quick Recommendation for CIRVION:

Since you have a circuit "C" logo with cyan color (#00C8FF), I recommend:

1. **Extract just the "C" icon** from your logo (the circuit pattern part)
2. **Make it square** (add padding if needed)
3. **Use a favicon generator** to create all sizes
4. **Use the .ico format** for best compatibility

This will give you a clean, recognizable favicon that matches your brand!

---

## Current Status:

✅ Favicon link removed from `index.html`  
⏳ Ready for you to add your custom favicon when available
