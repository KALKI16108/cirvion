/**
 * ============================================================================
 * AIFLOWIX PERFORMANCE OPTIMIZATION CONFIGURATION
 * ============================================================================
 * Optimizes website speed and responsiveness without affecting UI/UX/Logic
 * 
 * Optimizations Included:
 * 1. Code splitting for faster parallel loading
 * 2. Tree-shaking to remove unused code
 * 3. CSS and JS minification
 * 4. Lazy loading for images and components
 * 5. Font optimization and preloading
 * 6. Compression (Gzip + Brotli)
 * 7. Cache optimization
 * 8. Resource hints (preload, prefetch, preconnect)
 * ============================================================================
 */

// Performance metrics thresholds (in milliseconds)
export const performanceTargets = {
  firstContentfulPaint: 1500, // FCP < 1.5s (Good)
  largestContentfulPaint: 2500, // LCP < 2.5s (Good)
  cumulativeLayoutShift: 0.1, // CLS < 0.1 (Good)
  timeToInteractive: 3000, // TTI < 3s (Good)
  firstInputDelay: 100, // FID < 100ms (Good)
  totalBlockingTime: 200, // TBT < 200ms (Good)
};

// Optimization strategies
export const optimizationStrategies = {
  // 1. Code splitting configuration
  codeSplitting: {
    vendor: ['react', 'react-dom'],
    motion: ['framer-motion'],
    icons: ['lucide-react'],
  },

  // 2. Image optimization
  imageOptimization: {
    formats: ['webp', 'jpg', 'png'],
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
      xlarge: 1920,
    },
    lazyLoadThreshold: 0.1, // Load when 10% visible
  },

  // 3. Font optimization
  fontOptimization: {
    preloadCritical: ['Outfit', 'Inter'],
    display: 'swap', // Show fallback while loading
    subset: ['latin', 'latin-ext'],
    weights: [300, 400, 500, 600, 700, 800],
  },

  // 4. CSS optimization
  cssOptimization: {
    purgeUnused: true,
    minify: true,
    criticalCSS: true, // Inline critical CSS
  },

  // 5. JavaScript optimization
  jsOptimization: {
    terser: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        unused: true,
      },
      mangle: true,
      output: {
        comments: false,
      },
    },
    splitChunks: true,
    treeshaking: true,
  },

  // 6. Compression configuration
  compression: {
    gzip: {
      level: 9, // Maximum compression
      threshold: 512, // Compress > 512 bytes
    },
    brotli: {
      level: 11, // Maximum compression
      threshold: 512,
    },
  },

  // 7. Caching strategy
  caching: {
    html: 'no-cache', // Always validate
    css: 'public, max-age=31536000, immutable', // 1 year
    js: 'public, max-age=31536000, immutable', // 1 year
    fonts: 'public, max-age=31536000, immutable', // 1 year
    images: 'public, max-age=2592000, must-revalidate', // 30 days
    api: 'no-store', // Never cache API responses
  },

  // 8. Resource hints
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.web3forms.com',
    ],
    prefetch: [
      '/favicon.svg',
      '/manifest.webmanifest',
    ],
    preload: [
      // Critical fonts already preloaded in index.html
    ],
  },
};

// Performance monitoring function
export const monitorPerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    // Web Vitals measurement
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
      }
    });

    // Observe different performance metrics
    try {
      perfObserver.observe({
        entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint'],
      });
    } catch (e) {
      console.warn('PerformanceObserver not fully supported');
    }

    // Measure page load
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    });
  }
};

// Lazy loading configuration
export const lazyLoadConfig = {
  // Lazy load images
  images: {
    loading: 'lazy',
    decoding: 'async',
  },
  // Lazy load components
  components: {
    threshold: 0.1,
    rootMargin: '50px',
  },
};

// Network optimization
export const networkOptimization = {
  // HTTP/2 Server Push (configured in Vercel headers)
  // Use HTTP/2 for multiplexing
  // Enable Keep-Alive for persistent connections
  
  // Service Worker caching
  serviceWorkerEnabled: true,
  cacheName: 'aiflowix-v1',
  
  // Request batching
  batchRequests: true,
  batchDelay: 50, // Wait 50ms before sending batched requests
};

// Performance tips
export const performanceTips = {
  development: [
    '✅ Use React DevTools Profiler to identify slow renders',
    '✅ Use Fast Refresh for faster HMR feedback',
    '✅ Monitor bundle size with vite bundle analyzer',
    '✅ Check for unused dependencies',
  ],
  production: [
    '✅ Enable Gzip and Brotli compression',
    '✅ Use CDN for static assets',
    '✅ Enable HTTP/2 and Server Push',
    '✅ Monitor Core Web Vitals',
    '✅ Use image optimization (WebP)',
    '✅ Lazy load non-critical resources',
    '✅ Cache-bust versioned assets',
    '✅ Enable browser caching',
  ],
  lighthouse: [
    '✅ Target Lighthouse Score: 90+',
    '✅ Performance: 90+',
    '✅ Accessibility: 95+',
    '✅ Best Practices: 95+',
    '✅ SEO: 100',
  ],
};

/**
 * To apply these optimizations:
 * 
 * 1. Build configuration (vite.config.js):
 *    - ✅ Terser minification
 *    - ✅ Code splitting by vendor
 *    - ✅ Gzip + Brotli compression
 *    - ✅ Source maps disabled in production
 * 
 * 2. HTML optimization (index.html):
 *    - ✅ Preload critical resources
 *    - ✅ Prefetch non-critical resources
 *    - ✅ Preconnect to external domains
 *    - ✅ Optimize font loading
 * 
 * 3. Image optimization:
 *    - Use <picture> with WebP fallback
 *    - Set width/height to prevent layout shift
 *    - Add lazy loading attribute
 * 
 * 4. Component optimization:
 *    - Use React.memo for expensive components
 *    - Use useMemo and useCallback appropriately
 *    - Lazy load routes with React.lazy()
 * 
 * 5. CSS optimization:
 *    - Purge unused CSS
 *    - Inline critical CSS
 *    - Minimize CSS specificity
 * 
 * 6. Monitoring:
 *    - Run monthly Lighthouse audits
 *    - Monitor Core Web Vitals in production
 *    - Track bundle size over time
 */

export default {
  performanceTargets,
  optimizationStrategies,
  lazyLoadConfig,
  networkOptimization,
  performanceTips,
};
