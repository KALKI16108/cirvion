const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' AIFLOWIX PHASE 4: SERVICE CONVERSION VERIFICATION');
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

// 1. Service Data Inventory & Differentiation
test('1.1: All 14 canonical services exist in services.json with distinct slugs and titles', () => {
  const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
  assert.strictEqual(services.length, 14, `Expected 14 services, got ${services.length}`);
  
  const expectedSlugs = [
    'whatsapp-automation',
    'crm-development',
    'ai-lead-generation',
    'ai-agent-development',
    'customer-support-automation',
    'ai-automation-services',
    'workflow-automation-services',
    'appointment-booking-automation',
    'email-automation',
    'custom-software-development',
    'web-development-services',
    'ai-chatbot-development',
    'ai-receptionist',
    'voice-ai-agents'
  ];

  expectedSlugs.forEach(slug => {
    const found = services.find(s => s.slug === slug);
    assert(found, `Service missing: ${slug}`);
    assert(found.title && found.h1 && found.description && found.definition, `Service ${slug} missing core text fields`);
  });

  // Verify unique titles
  const titles = services.map(s => s.title);
  const uniqueTitles = new Set(titles);
  assert.strictEqual(titles.length, uniqueTitles.size, 'Duplicate service titles found');
});

// 2. Factual Integrity & Removal of Unbacked Claims
test('2.1: Zero unverified certification claims (Meta Business Partner, HubSpot Partner, Make.com Partner)', () => {
  const servicesRaw = fs.readFileSync('src/data/services.json', 'utf8');
  assert(!servicesRaw.includes('Certified Meta Business Partner'), 'Found unverified Certified Meta Business Partner claim');
  assert(!servicesRaw.includes('Certified HubSpot Solutions Provider'), 'Found unverified HubSpot Partner claim');
  assert(!servicesRaw.includes('Certified Make.com partner'), 'Found unverified Make.com partner claim');
});

test('2.2: Zero unbacked compliance or guarantee claims (HIPAA/SOC2 compliant WhatsApp, guaranteed inbox)', () => {
  const servicesRaw = fs.readFileSync('src/data/services.json', 'utf8');
  assert(!servicesRaw.includes('HIPAA/SOC2 compliant WhatsApp'), 'Found unbacked HIPAA/SOC2 WhatsApp claim');
  assert(!servicesRaw.includes('guarantee inbox placement'), 'Found unbacked inbox placement guarantee');
  assert(!servicesRaw.includes('HIPAA-compliant AI Voice Receptionist'), 'Found unbacked HIPAA voice receptionist claim');
});

test('2.3: Zero unverified 96% or 98% numerical metrics in service data', () => {
  const servicesRaw = fs.readFileSync('src/data/services.json', 'utf8');
  assert(!servicesRaw.includes('"98%"') && !servicesRaw.includes('"96%"'), 'Found unverified percentage in services.json metrics');
  assert(!servicesRaw.toLowerCase().includes('96% csat'), 'Found 96% CSAT in services.json');
});

// 3. Buyer Intent & Target Audience Mapping
test('3.1: Every service contains targetAudience with idealProfile, industries, and painPoints', () => {
  const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
  services.forEach(s => {
    assert(s.targetAudience, `Service ${s.slug} missing targetAudience`);
    assert(s.targetAudience.idealProfile, `Service ${s.slug} missing targetAudience.idealProfile`);
    assert(Array.isArray(s.targetAudience.industries) && s.targetAudience.industries.length > 0, `Service ${s.slug} missing industries`);
    assert(Array.isArray(s.targetAudience.painPoints) && s.targetAudience.painPoints.length > 0, `Service ${s.slug} missing painPoints`);
  });
});

// 4. ServiceTemplate Architecture & Conversion Flow
test('4.1: ServiceTemplate renders dominant CTA, secondary ROI CTA, target audience, mid-page CTA, and standards', () => {
  const template = fs.readFileSync('src/pages/ServiceTemplate.jsx', 'utf8');
  assert(template.includes('primaryCtaText'), 'ServiceTemplate missing primaryCtaText');
  assert(template.includes('calendarUrl || "#contact"'), 'ServiceTemplate missing calendarUrl fallback to #contact');
  assert(template.includes('href="/roi-calculator"'), 'ServiceTemplate missing /roi-calculator link');
  assert(template.includes('targetAudience'), 'ServiceTemplate does not render targetAudience');
  assert(template.includes('Calculate Automation ROI'), 'ServiceTemplate missing secondary ROI action text');
  assert(template.includes('Mid-Page'), 'ServiceTemplate missing mid-page conversion tracking');
  assert(template.includes('Technical & Security Standards'), 'ServiceTemplate missing security standards section');
});

// 5. Illustrative Benchmarks & Scenario Disclosures
test('5.1: StatsDashboard, CaseStudy, and UseCasesGrid clearly label illustrative benchmarks and blueprints', () => {
  const stats = fs.readFileSync('src/components/StatsDashboard.jsx', 'utf8');
  assert(stats.includes('Target Operational Benchmarks'), 'StatsDashboard missing Target Operational Benchmarks heading');
  assert(stats.includes('Illustrative benchmark targets'), 'StatsDashboard missing illustrative benchmark label');

  const caseStudy = fs.readFileSync('src/components/CaseStudy.jsx', 'utf8');
  assert(caseStudy.includes('Representative Implementation Scenario'), 'CaseStudy missing Representative Implementation Scenario heading');
  assert(caseStudy.includes('Illustrative Workflow Scenario') || caseStudy.includes('Illustrative Architecture'), 'CaseStudy missing illustrative scenario badge');

  const useCases = fs.readFileSync('src/components/UseCasesGrid.jsx', 'utf8');
  assert(useCases.includes('Real-World Business Architecture Examples'), 'UseCasesGrid missing Real-World Business Architecture Examples heading');
});

// 6. Dedicated Service Landing Pages
test('6.1: CustomAiSoftware.jsx provides robust positioning, ideal fit, capabilities, process, and FAQs', () => {
  const customAi = fs.readFileSync('src/pages/CustomAiSoftware.jsx', 'utf8');
  assert(customAi.includes('Custom AI Software'), 'CustomAiSoftware missing title');
  assert(customAi.includes('Ideal Company Fit'), 'CustomAiSoftware missing Ideal Company Fit section');
  assert(customAi.includes('Our Engineering Process'), 'CustomAiSoftware missing process section');
  assert(customAi.includes('Security & Data Confidentiality'), 'CustomAiSoftware missing security section');
  assert(customAi.includes('FAQPage'), 'CustomAiSoftware missing FAQPage schema');
  assert(customAi.includes('href="/roi-calculator"'), 'CustomAiSoftware missing ROI calculator link');
});

test('6.2: AiForSmallBusiness.jsx provides SMB-specific positioning, 4 practical automations, process, and FAQs', () => {
  const smb = fs.readFileSync('src/pages/AiForSmallBusiness.jsx', 'utf8');
  assert(smb.includes('Growing Small Businesses'), 'AiForSmallBusiness missing title');
  assert(smb.includes('Target Business Profile'), 'AiForSmallBusiness missing Target Business Profile section');
  assert(smb.includes('4 Practical Automations for Immediate ROI'), 'AiForSmallBusiness missing 4 automations section');
  assert(smb.includes('Under-60-Second Lead Response'), 'AiForSmallBusiness missing lead response automation');
  assert(smb.includes('FAQPage'), 'AiForSmallBusiness missing FAQPage schema');
  assert(smb.includes('href="/roi-calculator"'), 'AiForSmallBusiness missing ROI calculator link');
});

// 7. Safety & Immutability Checks
test('7.1: Blog and Industry pages remain strictly untouched', () => {
  const blogJsx = fs.readFileSync('src/pages/Blog.jsx', 'utf8');
  assert(blogJsx.includes('AI Automation Insights'), 'Blog.jsx was modified');

  const blogTemplate = fs.readFileSync('src/pages/BlogTemplate.jsx', 'utf8');
  assert(blogTemplate.includes('useParams'), 'BlogTemplate.jsx was modified');

  const blogsJson = JSON.parse(fs.readFileSync('src/data/blogs.json', 'utf8'));
  assert(Array.isArray(blogsJson) && blogsJson.length > 0, 'blogs.json was corrupted');

  const industryTemplate = fs.readFileSync('src/pages/IndustryTemplate.jsx', 'utf8');
  assert(industryTemplate.includes('industriesData'), 'IndustryTemplate.jsx was modified');
});

console.log('\n----------------------------------------------------');
console.log(`TOTAL PHASE 4 TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
}
