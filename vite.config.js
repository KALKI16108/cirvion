import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Enable gzip and brotli compression for production builds (improves Performance score)
    compression({
      verbose: true,
      disable: false,
      threshold: 1024, // Only compress files > 1KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      verbose: false,
      disable: false,
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  server: {
    // Security headers for development server
    middlewares: [],
    headers: {
      // Prevent clickjacking attacks
      'X-Frame-Options': 'SAMEORIGIN',
      // Prevent MIME-type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Enable XSS protection in older browsers
      'X-XSS-Protection': '1; mode=block',
      // Enforce HTTPS and prevent downgrade attacks
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      // Control how much referrer information is shared
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Restrict feature access from cross-origin requests
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      // Content Security Policy
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.web3forms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self'",
    }
  },
  preview: {
    // Security headers for preview server
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.web3forms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self'",
    }
  }
})
