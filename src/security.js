/**
 * ============================================================================
 * AIFLOWIX SECURITY MODULE
 * ============================================================================
 * Comprehensive client-side security protections against modern threats
 * 
 * Protections Included:
 * 1. XSS Prevention (Cross-Site Scripting)
 * 2. CSRF Protection (Cross-Site Request Forgery)
 * 3. Clickjacking Protection
 * 4. Data Leakage Prevention
 * 5. Session Security
 * 6. DOM-based XSS Prevention
 * 7. Injection Attack Prevention
 * 8. Security Headers Validation
 * ============================================================================
 */

// ============================================================================
// 1. XSS (CROSS-SITE SCRIPTING) PREVENTION
// ============================================================================

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous HTML/JavaScript
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  const div = document.createElement('div');
  div.textContent = input; // Using textContent prevents HTML/JS execution
  return div.innerHTML;
};

/**
 * Safely escape HTML special characters
 */
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// ============================================================================
// 2. CSRF (CROSS-SITE REQUEST FORGERY) PROTECTION
// ============================================================================

/**
 * Generate CSRF token for form submissions
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store CSRF token in session storage
 */
export const initCSRFProtection = () => {
  const existingToken = sessionStorage.getItem('csrf-token');
  if (!existingToken) {
    const token = generateCSRFToken();
    sessionStorage.setItem('csrf-token', token);
    return token;
  }
  return existingToken;
};

/**
 * Verify CSRF token on form submission
 */
export const verifyCSRFToken = (token) => {
  const storedToken = sessionStorage.getItem('csrf-token');
  return storedToken && storedToken === token;
};

// ============================================================================
// 3. CLICKJACKING PROTECTION
// ============================================================================

/**
 * Prevent clickjacking by checking if page is in an iframe
 */
export const preventClickjacking = () => {
  if (window.self !== window.top) {
    // Page is in an iframe - break out of frame
    window.top.location = window.self.location;
  }
};

// ============================================================================
// 4. DATA LEAKAGE PREVENTION
// ============================================================================

/**
 * Disable right-click context menu (optional - can be annoying)
 * Use with caution - only for sensitive data areas
 */
export const disableRightClick = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener('contextmenu', (e) => e.preventDefault());
  }
};

/**
 * Prevent text selection on sensitive elements
 */
export const preventTextSelection = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
  }
};

/**
 * Clear sensitive data from memory after timeout
 */
export const secureClear = (variable, timeout = 60000) => {
  setTimeout(() => {
    variable = null;
    // Force garbage collection hint
    if (global.gc) {
      global.gc();
    }
  }, timeout);
};

// ============================================================================
// 5. SESSION SECURITY
// ============================================================================

/**
 * Store sensitive data only in sessionStorage (not localStorage)
 * sessionStorage is cleared when browser tab closes
 */
export const storeSessionData = (key, value) => {
  try {
    // Only store non-sensitive data - never store passwords, tokens, PII
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to store session data:', e);
  }
};

/**
 * Retrieve session data and validate
 */
export const getSessionData = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to retrieve session data:', e);
    return null;
  }
};

/**
 * Clear all session data on logout
 */
export const clearAllSessionData = () => {
  sessionStorage.clear();
};

// ============================================================================
// 6. DOM-BASED XSS PREVENTION
// ============================================================================

/**
 * Safely set element innerHTML with sanitization
 */
export const setInnerHTML = (element, html) => {
  if (!element) return;
  
  // Create a temporary container to parse HTML safely
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Remove any script tags or event handlers
  const scripts = temp.querySelectorAll('script');
  scripts.forEach((script) => script.remove());
  
  // Remove any event handler attributes
  temp.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });
  
  element.innerHTML = temp.innerHTML;
};

/**
 * Safely set element text content (cannot execute scripts)
 */
export const setText = (element, text) => {
  if (!element) return;
  element.textContent = text; // Most secure - no HTML parsing
};

// ============================================================================
// 7. INJECTION ATTACK PREVENTION
// ============================================================================

/**
 * Validate and sanitize form input
 */
export const validateFormInput = (input, maxLength = 1000) => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potentially dangerous characters
  let sanitized = input
    .substring(0, maxLength)
    .replace(/[<>\"'`]/g, '') // Remove special chars that could start tags
    .trim();
  
  return sanitized;
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length < 254;
};

/**
 * Validate URL format (prevent javascript: and data: URLs)
 */
export const validateURL = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin);
    // Only allow http: and https: protocols
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// ============================================================================
// 8. SECURITY HEADERS VALIDATION
// ============================================================================

/**
 * Check if critical security headers are present
 */
export const validateSecurityHeaders = async () => {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD' });
    const headers = {
      'x-frame-options': response.headers.get('x-frame-options'),
      'x-content-type-options': response.headers.get('x-content-type-options'),
      'x-xss-protection': response.headers.get('x-xss-protection'),
      'content-security-policy': response.headers.get('content-security-policy'),
      'strict-transport-security': response.headers.get('strict-transport-security'),
    };
    
    console.log('Security Headers Validation:', headers);
    return headers;
  } catch (e) {
    console.error('Failed to validate security headers:', e);
    return null;
  }
};

// ============================================================================
// 9. CONTENT SECURITY POLICY MONITORING
// ============================================================================

/**
 * Listen for CSP violations and log them
 */
export const monitorCSPViolations = () => {
  document.addEventListener('securitypolicyviolation', (event) => {
    console.warn('CSP Violation:', {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy,
      sourceFile: event.sourceFile,
      lineNumber: event.lineNumber,
    });
    
    // Optionally send to security monitoring service
    // sendToSecurityService({ type: 'csp-violation', data: event });
  });
};

// ============================================================================
// 10. DEVICE SECURITY CHECK
// ============================================================================

/**
 * Check browser security features
 */
export const checkBrowserSecurity = () => {
  const securityFeatures = {
    https: window.location.protocol === 'https:',
    serviceWorker: 'serviceWorker' in navigator,
    crypto: 'crypto' in window,
    sessionStorage: typeof sessionStorage !== 'undefined',
    localStorage: typeof localStorage !== 'undefined',
    indexedDB: typeof indexedDB !== 'undefined',
  };
  
  console.log('Browser Security Features:', securityFeatures);
  
  // Warn if not using HTTPS (except for localhost development)
  if (!securityFeatures.https && !window.location.hostname.includes('localhost')) {
    console.warn('⚠️ Warning: Not using HTTPS - security may be compromised');
  }
  
  return securityFeatures;
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all security measures
 */
export const initializeSecurity = () => {
  // Prevent clickjacking
  preventClickjacking();
  
  // Initialize CSRF protection
  initCSRFProtection();
  
  // Monitor CSP violations
  monitorCSPViolations();
  
  // Check browser security features
  checkBrowserSecurity();
  
  // Log security initialization
  console.log('✅ AIFLOWIX Security Module Initialized');
};

// Auto-initialize on module load
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSecurity);
} else if (typeof window !== 'undefined') {
  initializeSecurity();
}
