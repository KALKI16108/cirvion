const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' AIFLOWIX PHASE 3: HOMEPAGE CONVERSION VERIFICATION');
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

// 1. Homepage Section Order
test('1.1: Home.jsx renders the 8 sections in the exact required conversion order', () => {
  const homeJsx = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  
  const heroIndex = homeJsx.indexOf('<Hero');
  const servicesIndex = homeJsx.indexOf('<Services');
  const useCasesIndex = homeJsx.indexOf('<CaseStudies');
  const processIndex = homeJsx.indexOf('<DeliveryProcess');
  const principlesIndex = homeJsx.indexOf('<EngineeringPrinciples');
  const calculatorIndex = homeJsx.indexOf('<InteractiveRoiCalculator');
  const faqIndex = homeJsx.indexOf('<FAQ');
  const ctaIndex = homeJsx.indexOf('<CTA');

  assert(heroIndex > -1, 'Hero missing');
  assert(servicesIndex > heroIndex, 'Services must follow Hero');
  assert(useCasesIndex > servicesIndex, 'Practical use cases must follow Services');
  assert(processIndex > useCasesIndex, 'DeliveryProcess must follow Practical use cases');
  assert(principlesIndex > processIndex, 'EngineeringPrinciples must follow DeliveryProcess');
  assert(calculatorIndex > principlesIndex, 'InteractiveRoiCalculator must follow EngineeringPrinciples');
  assert(faqIndex > calculatorIndex, 'FAQ must follow InteractiveRoiCalculator');
  assert(ctaIndex > faqIndex, 'CTA must follow FAQ');
});

// 2. Messaging & Positioning
test('2.1: Hero provides clear, outcome-oriented positioning and global delivery markets', () => {
  const hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  assert(hero.includes('Automate Your Workflows'), 'Hero headline line 1 missing');
  assert(hero.includes('Reclaim Hundreds of Hours'), 'Hero headline line 2 missing');
  assert(hero.includes('Mumbai Engineering HQ'), 'Hero Mumbai HQ badge missing');
  assert(hero.includes('US, UK, Canada, Australia, UAE & India'), 'Target international markets missing');
  assert(hero.includes('100% Code Ownership'), 'Hero code ownership badge missing');
  assert(hero.includes('Direct Senior Engineering'), 'Hero direct engineering badge missing');
});

test('2.2: Hero dominant primary CTA and distinct secondary action work properly', () => {
  const hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  assert(hero.includes('calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit"'), 'Dominant CTA logic missing');
  assert(hero.includes('href="#calculator"'), 'Hero distinct secondary action to #calculator missing');
  assert(hero.includes('href="/roi-calculator"'), 'Hero secondary link to dedicated /roi-calculator missing');
  assert(hero.includes('href="#services"'), 'Hero explore solutions link missing');
});

// 3. Services & Problems Solved
test('3.1: Services section highlights concrete business problems and 6 core services', () => {
  const services = fs.readFileSync('src/components/Services.jsx', 'utf8');
  assert(services.includes('Operational Friction Points We Eliminate'), 'Friction points sub-section missing');
  assert(services.includes('Slow Lead Response'), 'Slow lead response missing');
  assert(services.includes('Manual CRM Logging'), 'Manual CRM logging missing');
  assert(services.includes('After-Hours Inquiries'), 'After-hours inquiries missing');
  assert(services.includes('/ai-agent-development'), 'AI agents route missing');
  assert(services.includes('/workflow-automation-services'), 'Workflow automation route missing');
  assert(services.includes('/whatsapp-automation'), 'WhatsApp automation route missing');
  assert(services.includes('/crm-development'), 'CRM development route missing');
  assert(services.includes('/custom-software-development'), 'Custom software route missing');
  assert(services.includes('/web-development-services'), 'Web development route missing');
});

// 4. Practical Automation Use Cases
test('4.1: CaseStudies displays realistic industry blueprints with explicit illustrative disclosure', () => {
  const caseStudies = fs.readFileSync('src/components/CaseStudies.jsx', 'utf8');
  assert(caseStudies.includes('Industry Blueprints'), 'Industry blueprints headline missing');
  assert(caseStudies.includes('Healthcare & Clinics'), 'Healthcare blueprint missing');
  assert(caseStudies.includes('Real Estate & Brokerages'), 'Real estate blueprint missing');
  assert(caseStudies.includes('Logistics & Field Operations'), 'Logistics blueprint missing');
  assert(caseStudies.includes('Professional Services & Agencies'), 'Professional services blueprint missing');
  assert(caseStudies.includes('Illustrative examples of how our automation pipelines eliminate operational bottlenecks') || caseStudies.includes('Industry blueprints represent standard technical architectures'), 'Illustrative disclosure missing');
});

// 5. How Engagement and Delivery Work
test('5.1: DeliveryProcess outlines 3-phase milestone delivery, deliverables, and warranty', () => {
  const process = fs.readFileSync('src/components/DeliveryProcess.jsx', 'utf8');
  assert(process.includes('Operational Audit & Bottleneck Mapping'), 'Phase 01 title missing');
  assert(process.includes('3–5 Days'), 'Phase 01 duration missing');
  assert(process.includes('Architecture Blueprint & Fixed Scope'), 'Phase 02 title missing');
  assert(process.includes('1 Week'), 'Phase 02 duration missing');
  assert(process.includes('Engineering, Integration & Handover'), 'Phase 03 title missing');
  assert(process.includes('2–4 Weeks'), 'Phase 03 duration missing');
  assert(process.includes('Post-Deployment Warranty Included'), 'Warranty section missing');
  assert(process.includes('30 days'), '30 days warranty missing');
  assert(process.includes('Global Asynchronous Delivery'), 'Global async collaboration model missing');
});

// 6. Verified Trust Signals & Engineering Principles
test('6.1: EngineeringPrinciples details 4 engineering standards with zero fake testimonials', () => {
  const principles = fs.readFileSync('src/components/EngineeringPrinciples.jsx', 'utf8');
  assert(principles.includes('Strict Data Privacy & Isolation'), 'Data privacy standard missing');
  assert(principles.includes('100% Code & Pipeline Ownership'), 'Code ownership standard missing');
  assert(principles.includes('Direct Senior Engineer Collaboration'), 'Engineer collaboration standard missing');
  assert(principles.includes('Production Resilience & Fallbacks'), 'Resilience standard missing');
  assert(principles.includes('HQ in Mumbai, India'), 'Mumbai HQ disclosure missing');
  assert(!principles.includes('5 stars') && !principles.includes('John Doe said'), 'Fake testimonials found');
});

// 7. Interactive ROI Calculator
test('7.1: InteractiveRoiCalculator provides real-time sliders, honest benchmarks, and clear conversion links', () => {
  const calc = fs.readFileSync('src/components/InteractiveRoiCalculator.jsx', 'utf8');
  assert(calc.includes('id="calculator"'), 'Calculator missing id="calculator" anchor');
  assert(calc.includes('hp-team-size'), 'Team size slider missing');
  assert(calc.includes('hp-manual-hours'), 'Manual hours slider missing');
  assert(calc.includes('hp-hourly-rate'), 'Hourly rate slider missing');
  assert(calc.includes('href="#contact"'), 'Claim savings CTA missing #contact anchor');
  assert(calc.includes('href="/roi-calculator"'), 'Link to dedicated ROI calculator missing');
  assert(calc.includes('Illustrative estimate assuming an average 65% automation benchmark'), 'Honest benchmark disclaimer missing');
});

// 8. Concise FAQs
test('8.1: FAQ answers 6 common B2B buyer concerns', () => {
  const faq = fs.readFileSync('src/components/FAQ.jsx', 'utf8');
  assert(faq.includes('How long does an automation or AI agent project take to deploy?'), 'Q1 missing');
  assert(faq.includes('How is pricing structured, and are there hidden recurring costs?'), 'Q2 missing');
  assert(faq.includes('Which CRMs, databases, and business software do you integrate with?'), 'Q3 missing');
  assert(faq.includes('How do you protect our proprietary business and customer data?'), 'Q4 missing');
  assert(faq.includes('How does an India-based engineering team collaborate with international clients?'), 'Q5 missing');
  assert(faq.includes('What happens after our automation system goes live?'), 'Q6 missing');
});

// 9. Final Conversion Section
test('9.1: CTA explains 3-step post-enquiry process and provides dominant and secondary CTAs', () => {
  const cta = fs.readFileSync('src/components/CTA.jsx', 'utf8');
  assert(cta.includes('1. 24-Hour Review'), 'Step 1 post-enquiry missing');
  assert(cta.includes('2. Discovery Session'), 'Step 2 post-enquiry missing');
  assert(cta.includes('3. Fixed-Scope Plan'), 'Step 3 post-enquiry missing');
  assert(cta.includes('href="#contact"'), 'Fallback #contact anchor missing');
  assert(cta.includes('href="/roi-calculator"'), 'Secondary ROI calculator action missing');
  assert(cta.includes('Zero sales pressure'), 'Zero sales pressure badge missing');
  assert(cta.includes('Mutual NDA protection'), 'NDA protection badge missing');
});

// 10. Integrity & Blog Safety
test('10.1: Blog files and blog routing remain strictly untouched', () => {
  const blogJsx = fs.readFileSync('src/pages/Blog.jsx', 'utf8');
  assert(blogJsx.includes('AI Automation Insights') && blogJsx.includes('getBlogs'), 'Blog.jsx structure modified');

  const blogTemplate = fs.readFileSync('src/pages/BlogTemplate.jsx', 'utf8');
  assert(blogTemplate.includes('useParams'), 'BlogTemplate.jsx structure modified');

  const blogsJson = JSON.parse(fs.readFileSync('src/data/blogs.json', 'utf8'));
  assert(Array.isArray(blogsJson) && blogsJson.length > 0, 'blogs.json corrupted');
});

console.log('\n----------------------------------------------------');
console.log(`TOTAL PHASE 3 TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
}
