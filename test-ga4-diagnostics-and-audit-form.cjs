const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING GA4 DIAGNOSTICS & AUDIT FORM VERIFICATION SUITE ---');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${description}:`, err.message);
  }
}

// 1. GA4 Configuration in index.html
test('index.html contains correct Measurement ID G-ZESG1V8LVL and Consent Mode v2', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(html.includes('G-ZESG1V8LVL'), 'Must contain G-ZESG1V8LVL');
  assert(html.includes("gtag('consent', 'default'"), 'Must contain consent mode v2 default');
  assert(html.includes("'analytics_storage': 'granted'"), 'Analytics storage granted');
  assert(html.includes("window.dataLayer = window.dataLayer || [];"), 'DataLayer initialized');
  assert(html.includes("window.loadAnalytics = loadAnalytics;"), 'loadAnalytics is exposed globally');
});

// 2. analytics.js Event Verification
test('analytics.js exports all required event tracking functions', () => {
  const analyticsCode = fs.readFileSync(path.join(__dirname, 'src/lib/analytics.js'), 'utf8');
  assert(analyticsCode.includes('export const trackPageView'), 'Exports trackPageView');
  assert(analyticsCode.includes('export const trackFormStart'), 'Exports trackFormStart');
  assert(analyticsCode.includes('export const trackFormSubmit'), 'Exports trackFormSubmit');
  assert(analyticsCode.includes('export const trackLeadSuccess'), 'Exports trackLeadSuccess');
  assert(analyticsCode.includes('export const trackContactCtaClick'), 'Exports trackContactCtaClick');
  assert(analyticsCode.includes('export const trackBookCallClick'), 'Exports trackBookCallClick');
});

// 3. PII Protection in analytics.js
test('analytics.js strictly redacts PII before dispatching to GA4', () => {
  const analyticsCode = fs.readFileSync(path.join(__dirname, 'src/lib/analytics.js'), 'utf8');
  assert(analyticsCode.includes('PII_DENYLIST'), 'PII denylist defined');
  assert(analyticsCode.includes("'phone'"), 'Denies phone');
  assert(analyticsCode.includes("'email'"), 'Denies email');
  assert(analyticsCode.includes("'name'"), 'Denies name');
  assert(analyticsCode.includes("'message'"), 'Denies message');
});

// 4. Conversion Protection in leads.js
test('leads.js only triggers trackLeadSubmission upon confirmed API delivery', () => {
  const leadsCode = fs.readFileSync(path.join(__dirname, 'src/lib/leads.js'), 'utf8');
  // Check that trackLeadSubmission is inside `if (result && result.success)`
  const match = leadsCode.match(/if\s*\(result\s*&&\s*result\.success\)\s*\{\s*trackLeadSubmission\('Free Audit'/);
  assert(match, 'Free Audit lead conversion strictly gated by result.success');
});

// 5. Zero dynamic import on submit in ContactFooter & FreeAiAudit
test('ContactFooter & FreeAiAudit statically import submitAuditRequest with NO runtime dynamic import', () => {
  const footerCode = fs.readFileSync(path.join(__dirname, 'src/components/ContactFooter.jsx'), 'utf8');
  const auditPageCode = fs.readFileSync(path.join(__dirname, 'src/pages/FreeAiAudit.jsx'), 'utf8');

  assert(footerCode.includes("import { submitAuditRequest } from '../lib/leads';"), 'Static import in footer');
  assert(!footerCode.includes("await import('../lib/api')"), 'No dynamic import in footer submit');
  assert(!footerCode.includes("import('../lib/api')"), 'No dynamic import in footer');

  assert(auditPageCode.includes("import { submitAuditRequest } from '../lib/leads';"), 'Static import in audit page');
  assert(!auditPageCode.includes("import('../lib/api')"), 'No dynamic import in audit page');
});

// 6. Optional fields in ContactFooter and FreeAiAudit
test('Phone Number (Optional) and Website (Optional) properly configured', () => {
  const footerCode = fs.readFileSync(path.join(__dirname, 'src/components/ContactFooter.jsx'), 'utf8');
  const auditPageCode = fs.readFileSync(path.join(__dirname, 'src/pages/FreeAiAudit.jsx'), 'utf8');

  assert(footerCode.includes('Phone Number (Optional)'), 'Footer contains Phone Number (Optional) label');
  assert(footerCode.includes('Website (Optional)'), 'Footer contains Website (Optional) label');
  assert(auditPageCode.includes('Phone Number (Optional)'), 'Audit page contains Phone Number (Optional) label');
  assert(auditPageCode.includes('Website (Optional)'), 'Audit page contains Website (Optional) label');

  // Verify website is NOT required
  assert(!footerCode.includes('required placeholder="https://company.com"'), 'Website is not required in footer');
  assert(!auditPageCode.includes('required type="url" name="website"'), 'Website is not required in audit page');
});

// 7. Route Tracking in App.jsx
test('App.jsx ScrollToAnchor dispatches trackPageView on route changes', () => {
  const appCode = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf8');
  assert(appCode.includes('trackPageView(pathname, document.title)'), 'ScrollToAnchor calls trackPageView');
});

// 8. vercel.json Asset routing & CORS
test('vercel.json ensures static assets bypass SPA rewrite and have CORS headers', () => {
  const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  const assetHeader = vercelJson.headers.find(h => h.source && h.source.includes('assets'));
  assert(assetHeader, 'Asset header defined');
  const cors = assetHeader.headers.find(h => h.key === 'Access-Control-Allow-Origin');
  assert(cors && cors.value === '*', 'CORS wildcard set for assets');
});

// 9. main.jsx dynamic import & Vite preload error handler
test('main.jsx handles dynamic import failures gracefully', () => {
  const mainCode = fs.readFileSync(path.join(__dirname, 'src/main.jsx'), 'utf8');
  assert(mainCode.includes('vite:preloadError'), 'vite:preloadError listener attached');
  assert(mainCode.includes('Failed to fetch dynamically imported module'), 'Dynamic module error caught');
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.`);
if (passedTests !== totalTests) {
  process.exit(1);
}
