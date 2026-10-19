import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import Sitemap from 'vite-plugin-sitemap'

import servicesData from './src/data/services.json'
import locationsData from './src/data/locations.json'
import industriesData from './src/data/industries.json'
import blogsData from './src/data/blogs.json'

const dynamicRoutes = [
  '/',
  '/blog',
  '/custom-ai-software',
  '/ai-for-small-business',
  '/free-ai-audit',
  '/roi-calculator',
  '/ai-readiness',
  ...servicesData.map(s => `/services/${s.slug}`),
  ...locationsData.map(l => `/locations/${l.slug}`),
  ...industriesData.map(i => `/industries/${i.slug}`),
  ...blogsData.map(b => `/blog/${b.slug}`)
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React fast refresh for faster HMR
      fastRefresh: true,
      jsxImportSource: 'react',
    }),
    Sitemap({ 
      hostname: 'https://aiflowix.in',
      dynamicRoutes,
      exclude: ['/404'],
      generateRobotsTxt: false
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
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Split chunks for better caching and parallel loading
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@uiw') || id.includes('codemirror') || id.includes('w3c-keyname') || id.includes('react-markdown') || id.includes('rehype') || id.includes('remark')) {
              return 'vendor-editor';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('react-helmet')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
    // Reduce initial bundle size
    sourcemap: false, // Disable sourcemaps in production
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  }
})
