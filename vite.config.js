import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React fast refresh for faster HMR
      fastRefresh: true,
      jsxImportSource: 'react',
    }),
    // Enable gzip and brotli compression for production builds (improves Performance score)
    compression({
      verbose: false,
      disable: false,
      threshold: 512, // Compress files > 512 bytes for better compression
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      verbose: false,
      disable: false,
      threshold: 512,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  // Optimization for faster builds and better performance
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Split chunks for better caching and parallel loading
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    // Reduce initial bundle size
    sourcemap: false, // Disable sourcemaps in production
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  server: {
    // Security headers for development server
    middlewares: [],
    headers: {
      // ========== CLICKJACKING PROTECTION ==========
      'X-Frame-Options': 'DENY',
      
      // ========== MIME-TYPE SNIFFING PREVENTION ==========
      'X-Content-Type-Options': 'nosniff',
      
      // ========== XSS PROTECTION (Legacy browser support) ==========
      'X-XSS-Protection': '1; mode=block',
      
      // ========== HTTPS ENFORCEMENT ==========
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      
      // ========== REFERRER POLICY ==========
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // ========== PERMISSIONS POLICY - Disable unused browser features ==========
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), vr=(), xr-spatial-tracking=(), fullscreen=(self)',
      
      // ========== CONTENT SECURITY POLICY ==========
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.web3forms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
      
      // ========== DNS SECURITY ==========
      'X-DNS-Prefetch-Control': 'off',
      
      // ========== CROSS-ORIGIN PROTECTION ==========
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    }
  },
  preview: {
    // Security headers for preview server
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), vr=(), xr-spatial-tracking=(), fullscreen=(self)',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.web3forms.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
      'X-DNS-Prefetch-Control': 'off',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    }
  }
})
