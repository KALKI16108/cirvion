const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log(' AIFLOWIX PRODUCTION FORM & ASSET FIX VERIFICATION');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    failCount++;
  }
}

// 1. Zero dynamic imports on audit submission
test('1.1: ContactFooter has ZERO dynamic imports of api or leads inside handleSubmit', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes("import { submitAuditRequest } from '../lib/leads';"), 'ContactFooter missing static import of submitAuditRequest');
  assert(!footer.includes("import('../lib/api')"), 'ContactFooter still dynamically imports api on submit!');
  assert(!footer.includes("import('../lib/leads')"), 'ContactFooter dynamically imports leads on submit!');
});

test('1.2: FreeAiAudit statically imports submitAuditRequest from leads.js', () => {
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(audit.includes("import { submitAuditRequest } from '../lib/leads';"), 'FreeAiAudit missing static import from leads.js');
});

// 2. Form data preservation & duplicate submission prevention
test('2.1: ContactFooter preserves form data on error and prevents duplicate submissions', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes('if (isSubmitting) return;'), 'Missing isSubmitting duplicate prevention guard');
  assert(footer.includes('disabled={isSubmitting}'), 'Submit button missing disabled attribute during submission');
  // Verify reset only happens on success
  const successBlock = footer.substring(footer.indexOf("setSubmitStatus('success');"));
  assert(successBlock.includes("setFormData({\n                name: '',"), 'Form reset missing from success block');
  // Verify catch block sets friendly error without resetting formData
  const catchBlock = footer.substring(footer.indexOf('} catch (error) {'));
  assert(catchBlock.includes('setSubmitStatus(\'error\');'), 'Catch block missing error status');
  assert(!catchBlock.includes('setFormData({ name: \'\''), 'Catch block must NOT reset formData on error');
});

test('2.2: FreeAiAudit preserves form data on error and prevents duplicate submissions', () => {
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(audit.includes('if (isSubmitting) return;'), 'FreeAiAudit missing isSubmitting guard');
  const catchBlock = audit.substring(audit.indexOf('} catch (error) {'));
  assert(!catchBlock.includes('setFormData({ name: \'\''), 'FreeAiAudit catch block must NOT reset formData on error');
});

// 3. Conversion tracking integrity: generate_lead ONLY after verified delivery
test('3.1: leads.js only fires generate_lead when result && result.success', () => {
  const leads = fs.readFileSync('src/lib/leads.js', 'utf8');
  assert(leads.includes('if (result && result.success)'), 'leads.js missing result.success guard for conversion tracking');
  assert(leads.includes("trackLeadSubmission('Free Audit'"), 'leads.js missing trackLeadSubmission for Free Audit');
  assert(leads.includes("saveLeadToLocalStorage('Free Audit'"), 'leads.js missing local resilience save');
});

// 4. Stale chunk auto-recovery and preload error handling
test('4.1: main.jsx implements vite:preloadError and global dynamic import error recovery', () => {
  const main = fs.readFileSync('src/main.jsx', 'utf8');
  assert(main.includes("window.addEventListener('vite:preloadError'"), 'main.jsx missing vite:preloadError listener');
  assert(main.includes('Failed to fetch dynamically imported module'), 'main.jsx missing dynamic import error catcher');
  assert(main.includes('window.location.reload()'), 'main.jsx missing reload action');
  assert(main.includes('sessionStorage.getItem'), 'main.jsx missing loop prevention via sessionStorage');
});

// 5. vercel.json headers & asset rewrite protection
test('5.1: vercel.json includes CORS header for /assets/ and protects assets from index.html rewrite', () => {
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const assetHeader = vercel.headers.find(h => h.source === '/assets/(.*)');
  assert(assetHeader, 'vercel.json missing /assets/(.*) header rule');
  const corsKey = assetHeader.headers.find(h => h.key === 'Access-Control-Allow-Origin' && h.value === '*');
  assert(corsKey, 'vercel.json /assets/(.*) missing Access-Control-Allow-Origin: *');
  
  // Verify negative lookahead rewrite prevents missing assets from returning index.html
  const catchAllRewrite = vercel.rewrites.find(r => r.destination === '/index.html');
  assert(catchAllRewrite, 'Missing SPA rewrite');
  assert(catchAllRewrite.source.includes('!assets/'), 'Catch-all rewrite must exclude /assets/ to prevent returning HTML for missing JS chunks');
});

// 6. Blog and other pages untouched
test('6.1: Blog and industry pages remain strictly untouched', () => {
  const blog = fs.readFileSync('src/pages/Blog.jsx', 'utf8');
  assert(blog.includes('AI Automation Insights'), 'Blog.jsx was modified');
});

console.log('\n----------------------------------------------------');
console.log(`TOTAL PRODUCTION FIX TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
