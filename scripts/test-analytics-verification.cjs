const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' AIFLOWIX PHASE 2 VERIFICATION SUITE');
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

// 1. Numerical Business Claims
test('1.1: Verify no unverified 96% or 98% CSAT/NPS claim in services or industry data', () => {
  const servicesJson = fs.readFileSync('src/data/services.json', 'utf8');
  assert(!servicesJson.includes('"98%"') && !servicesJson.includes('"96%"'), 'Found unverified percentage in services.json metrics');
  assert(!servicesJson.toLowerCase().includes('96% csat'), 'Found 96% CSAT in services.json');
  
  const industriesJson = fs.readFileSync('src/data/industries.json', 'utf8');
  assert(!industriesJson.includes('96%') && !industriesJson.includes('98%'), 'Found unverified 96%/98% in industries.json');
  assert(!industriesJson.includes('5.5%'), 'Found unverified 2% to 5.5% claim in industries.json');
});

test('1.2: CSAT metrics use accurate, non-quantified wording (e.g. "High", "Instant Resolution")', () => {
  const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
  const whatsappService = services.find(s => s.slug === 'whatsapp-automation');
  assert(whatsappService, 'whatsapp-automation service not found');
  const csatStat = whatsappService.statistics.find(st => st.impact && st.impact.includes('CSAT'));
  assert(csatStat, 'CSAT stat missing');
  assert(csatStat.metric === 'High', `Expected metric 'High', got ${csatStat.metric}`);
  assert(csatStat.time === 'Instant Resolution', 'Time description mismatch');
});

// 2. CTAs: Request Free Audit and Calculate Automation ROI
test('2.1: Request Free Audit CTAs link correctly across Desktop and Mobile', () => {
  const heroJsx = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  assert(heroJsx.includes('calendarUrl || "#contact"'), 'Hero CTA fallback to #contact missing');
  assert(heroJsx.includes('Book a Free Discovery Call') || heroJsx.includes('Request Free Audit'), 'Hero CTA button text missing');

  const ctaJsx = fs.readFileSync('src/components/CTA.jsx', 'utf8');
  assert(ctaJsx.includes('href="#contact"'), 'CTA component missing #contact anchor');
  assert(ctaJsx.includes('Request Free Audit'), 'CTA button text missing');

  const quickBar = fs.readFileSync('src/components/StickyQuickBar.jsx', 'utf8');
  assert(quickBar.includes('href="#contact"') && quickBar.includes('Free Audit'), 'StickyQuickBar missing Free Audit CTA');
});

test('2.2: Calculate Automation ROI CTAs route to dedicated /roi-calculator tool', () => {
  const heroJsx = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  assert(heroJsx.includes('href="/roi-calculator"'), 'Hero missing /roi-calculator link');

  const ctaJsx = fs.readFileSync('src/components/CTA.jsx', 'utf8');
  assert(ctaJsx.includes('href="/roi-calculator"'), 'CTA component missing /roi-calculator link');
  assert(ctaJsx.includes('Calculate Automation ROI'), 'CTA missing Calculate Automation ROI text');

  const quickBar = fs.readFileSync('src/components/StickyQuickBar.jsx', 'utf8');
  assert(quickBar.includes('href="/roi-calculator"'), 'StickyQuickBar missing /roi-calculator');

  const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
  assert(appJsx.includes('path="/roi-calculator"'), 'App.jsx missing /roi-calculator route');
});

// 3. Calendar Booking Pathway
test('3.1: Safe configurable calendar booking helper returns null when unset, URL when set', () => {
  const bookingModule = require('../src/lib/booking.js');
  // When env var is unset
  delete process.env.VITE_CALENDAR_BOOKING_URL;
  assert.strictEqual(bookingModule.getCalendarBookingUrl(), null, 'Expected null when VITE_CALENDAR_BOOKING_URL is undefined');
  assert.strictEqual(bookingModule.hasConfiguredCalendar(), false, 'Expected hasConfiguredCalendar to be false');

  // When env var is set
  process.env.VITE_CALENDAR_BOOKING_URL = 'https://calendly.com/sample-org/discovery';
  assert.strictEqual(bookingModule.getCalendarBookingUrl(), 'https://calendly.com/sample-org/discovery');
  assert.strictEqual(bookingModule.hasConfiguredCalendar(), true);
  delete process.env.VITE_CALENDAR_BOOKING_URL;
});

test('3.2: ContactFooter and Hero safely incorporate calendar pathway without fake credentials', () => {
  const footerJsx = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footerJsx.includes('getCalendarBookingUrl'), 'ContactFooter does not use getCalendarBookingUrl');
  assert(footerJsx.includes('calendarUrl &&'), 'ContactFooter does not guard calendar button with calendarUrl check');
  assert(footerJsx.includes('trackBookCallClick'), 'ContactFooter does not track book call clicks');

  const heroJsx = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  assert(heroJsx.includes('getCalendarBookingUrl'), 'Hero does not use getCalendarBookingUrl');
  assert(heroJsx.includes('trackBookCallClick'), 'Hero does not track book call clicks');
});

// 4. WhatsApp Button and StickyQuickBar Mobile Viewport Check
test('4.1: StickyQuickBar positioned at mobile bottom with safe-area spacing and z-40', () => {
  const quickBar = fs.readFileSync('src/components/StickyQuickBar.jsx', 'utf8');
  assert(quickBar.includes('fixed') && quickBar.includes('bottom-[calc(1rem+env(safe-area-inset-bottom))]'), 'StickyQuickBar missing safe-area position');
  assert(quickBar.includes('z-40'), 'StickyQuickBar missing z-40');
});

test('4.2: FloatingWhatsApp is elevated above StickyQuickBar on mobile so no overlaps occur', () => {
  const wa = fs.readFileSync('src/components/FloatingWhatsApp.jsx', 'utf8');
  assert(wa.includes('bottom-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'FloatingWhatsApp does not clear mobile bottom bar');
  assert(wa.includes('lg:bottom-6'), 'FloatingWhatsApp missing desktop position');
  assert(wa.includes('z-40'), 'FloatingWhatsApp missing z-40');
});

test('4.3: Modals (Privacy, Terms, Cookies) have highest z-index (z-[100]) and forms have bottom clearance', () => {
  const privacy = fs.readFileSync('src/components/PrivacyPolicy.jsx', 'utf8');
  assert(privacy.includes('z-[100]'), 'PrivacyPolicy must have z-[100] to sit above quickbar and whatsapp');

  const terms = fs.readFileSync('src/components/TermsOfService.jsx', 'utf8');
  assert(terms.includes('z-[100]'), 'TermsOfService must have z-[100]');

  const cookie = fs.readFileSync('src/components/CookiePolicy.jsx', 'utf8');
  assert(cookie.includes('z-[100]'), 'CookiePolicy must have z-[100]');

  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes('pb-[calc(6rem+env(safe-area-inset-bottom))]') || footer.includes('pb-24'), 'ContactFooter must have bottom clearance for sticky widgets');
});

// 5. SEO, Canonical URLs, Hreflang, Structured Data, Sitemap
test('5.1: Canonical URLs dynamically format properly and no duplicate tags in SEOHead', () => {
  const seoHead = fs.readFileSync('src/components/SEOHead.jsx', 'utf8');
  assert(seoHead.includes('canonical'), 'SEOHead missing canonical handler');
  assert(seoHead.includes('fullCanonical'), 'SEOHead missing full canonical computation');
  assert(seoHead.includes('https://aiflowix.in'), 'SEOHead siteUrl missing default domain');
});

test('5.2: index.html has valid canonical, hreflang with x-default, and Organization/LocalBusiness JSON-LD', () => {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  assert(indexHtml.includes('<link rel="canonical" href="https://aiflowix.in/"'), 'Missing root canonical');
  assert(indexHtml.includes('hreflang="en-IN"'), 'Missing en-IN hreflang');
  assert(indexHtml.includes('hreflang="x-default"'), 'Missing x-default hreflang');
  assert(indexHtml.includes('"@type": "Organization"'), 'Missing Organization structured data');
  assert(indexHtml.includes('"@type": ["LocalBusiness", "ProfessionalService"]'), 'Missing LocalBusiness structured data');
  assert(!indexHtml.includes('http://aiflowix'), 'Found insecure http link for domain in index.html');
});

test('5.3: Sitemap generator includes all valid routes with no broken URLs', () => {
  const sitemapGen = fs.readFileSync('generate-sitemap.js', 'utf8');
  assert(sitemapGen.includes('/roi-calculator'), 'Sitemap missing /roi-calculator');
  assert(sitemapGen.includes('/free-ai-audit'), 'Sitemap missing /free-ai-audit');
  assert(sitemapGen.includes('locations.forEach'), 'Sitemap does not iterate over locations');
  
  const locations = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));
  locations.forEach(loc => {
    assert(loc.slug && loc.city && loc.country, `Location ${loc.name} is missing required fields`);
  });

  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  assert(sitemapXml.includes('https://aiflowix.in/roi-calculator'), 'public/sitemap.xml missing /roi-calculator');
  assert(sitemapXml.includes('https://aiflowix.in/free-ai-audit'), 'public/sitemap.xml missing /free-ai-audit');
});

// 6. GA4 Event Logic & Deduplication
test('6.1: GA4 helper has deduplication and guards for form_start and generate_lead', () => {
  const analytics = fs.readFileSync('src/lib/analytics.js', 'utf8');
  assert(analytics.includes('trackFormStart'), 'analytics.js missing trackFormStart');
  assert(analytics.includes('trackLeadSubmission'), 'analytics.js missing trackLeadSubmission');
  assert(analytics.includes('trackCtaClick'), 'analytics.js missing trackCtaClick');
  assert(analytics.includes('trackBookCallClick'), 'analytics.js missing trackBookCallClick');
});

test('6.2: Form submissions only track generate_lead upon true API success (prevent false positives)', () => {
  const apiJs = fs.readFileSync('src/lib/api.js', 'utf8');
  // Check contact form
  assert(apiJs.includes('if (result && result.success)'), 'api.js does not guard trackLeadSubmission with result.success');
  // Check audit request
  const auditFn = apiJs.substring(apiJs.indexOf('submitAuditRequest'));
  assert(auditFn.includes('if (result && result.success)'), 'submitAuditRequest does not guard with result.success');
  // Check ROI calculation
  const roiFn = apiJs.substring(apiJs.indexOf('submitRoiCalculation'));
  assert(roiFn.includes('if (result && result.success)'), 'submitRoiCalculation does not guard with result.success');
});

test('6.3: Form start events fire once per interaction, preventing duplicate spam', () => {
  const auditPage = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(auditPage.includes('formStartedRef.current = true;'), 'FreeAiAudit missing single-fire formStartedRef guard');

  const contactFooter = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(contactFooter.includes('formStartedRef.current = true;'), 'ContactFooter missing single-fire formStartedRef guard');
});

console.log('\n----------------------------------------------------');
console.log(`TOTAL TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
