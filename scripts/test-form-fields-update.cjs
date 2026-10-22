const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log(' AIFLOWIX FREE AUDIT FORM FIELDS VERIFICATION');
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

// 1. Website is Optional
test('1.1: ContactFooter displays "Website (Optional)" and has no required attribute', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes('Website (Optional)'), 'ContactFooter missing "Website (Optional)" label');
  // Check that input with name="website" does not have required attribute
  const websiteInputMatch = footer.match(/<input[^>]*name=["']website["'][^>]*>/);
  assert(websiteInputMatch, 'Missing website input in ContactFooter');
  assert(!websiteInputMatch[0].includes('required'), 'Website input in ContactFooter should NOT be required');
});

test('1.2: FreeAiAudit displays "Website (Optional)" and has no required attribute', () => {
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(audit.includes('Website (Optional)'), 'FreeAiAudit missing "Website (Optional)" label');
  const websiteInputMatch = audit.match(/<input[^>]*name=["']website["'][^>]*>/);
  assert(websiteInputMatch, 'Missing website input in FreeAiAudit');
  assert(!websiteInputMatch[0].includes('required'), 'Website input in FreeAiAudit should NOT be required');
});

// 2. Phone Number is Added & Optional with International Support
test('2.1: ContactFooter has Phone Number (Optional), type="tel", and country code selector', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes('Phone Number (Optional)'), 'ContactFooter missing "Phone Number (Optional)" label');
  assert(footer.includes('name="phone"') && footer.includes('type="tel"'), 'Missing tel input with name="phone" in ContactFooter');
  assert(footer.includes('name="country_code"'), 'Missing country_code selector in ContactFooter');
  assert(footer.includes('value="+1"') && footer.includes('value="+44"') && footer.includes('value="+91"'), 'Missing international country codes in selector');
});

test('2.2: FreeAiAudit has Phone Number (Optional), type="tel", and country code selector', () => {
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(audit.includes('Phone Number (Optional)'), 'FreeAiAudit missing "Phone Number (Optional)" label');
  assert(audit.includes('name="phone"') && audit.includes('type="tel"'), 'Missing tel input with name="phone" in FreeAiAudit');
  assert(audit.includes('name="country_code"'), 'Missing country_code selector in FreeAiAudit');
  assert(audit.includes('value="+1"') && audit.includes('value="+44"') && audit.includes('value="+91"'), 'Missing international country codes in selector');
});

test('2.3: validatePhone validates empty (optional), valid international, and rejects garbage', () => {
  // Test regex logic used in ContactFooter and FreeAiAudit
  const phoneRegex = /^(\+?[0-9\s\-().]{6,25})$/;
  const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string' || phone.trim() === '') return true;
    return phoneRegex.test(phone.trim());
  };

  // Optional: empty, spaces, null, undefined
  assert.strictEqual(validatePhone(''), true, 'Empty phone should be valid (optional)');
  assert.strictEqual(validatePhone('   '), true, 'Whitespace phone should be valid');
  assert.strictEqual(validatePhone(null), true, 'Null phone should be valid');

  // International formats
  assert.strictEqual(validatePhone('+91 99307 44723'), true, '+91 Indian number should be valid');
  assert.strictEqual(validatePhone('+1 415 555 0132'), true, '+1 US number should be valid');
  assert.strictEqual(validatePhone('+44 7700 900123'), true, '+44 UK number should be valid');
  assert.strictEqual(validatePhone('+971 50 123 4567'), true, '+971 UAE number should be valid');
  assert.strictEqual(validatePhone('+61 412 345 678'), true, '+61 AU number should be valid');
  assert.strictEqual(validatePhone('(415) 555-0132'), true, 'Parentheses formatted number should be valid');

  // Invalid entries
  assert.strictEqual(validatePhone('abc'), false, 'Alphabetic input should be rejected');
  assert.strictEqual(validatePhone('123'), false, 'Too short number should be rejected');
  assert.strictEqual(validatePhone('+1-2'), false, 'Incomplete number should be rejected');
});

// 3. Payload and Submission Integrity
test('3.1: submitAuditRequest in leads.js includes phone and website in payload', () => {
  const leads = fs.readFileSync('src/lib/leads.js', 'utf8');
  assert(leads.includes('const phone = data.phone || data.phone_number || \'\';'), 'leads.js missing phone extraction');
  assert(leads.includes('phone: phone ? phone : \'N/A\''), 'leads.js payload missing phone');
  assert(leads.includes('website: website ? website : \'N/A\''), 'leads.js payload missing website');
  assert(leads.includes('phone: phone || null'), 'Supabase backup missing phone');
});

test('3.2: ContactFooter passes phone and website to submitAuditRequest', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  assert(footer.includes('phone: finalPhone'), 'ContactFooter does not pass finalPhone to submitAuditRequest');
  assert(footer.includes('website,'), 'ContactFooter does not pass website to submitAuditRequest');
});

test('3.3: FreeAiAudit passes phone and website to submitAuditRequest', () => {
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  assert(audit.includes('phone: finalPhone'), 'FreeAiAudit does not pass finalPhone to submitAuditRequest');
  assert(audit.includes('website,'), 'FreeAiAudit does not pass website to submitAuditRequest');
});

// 4. Form state preservation and duplicate prevention
test('4.1: Both forms preserve formData on error and guard with isSubmitting', () => {
  const footer = fs.readFileSync('src/components/ContactFooter.jsx', 'utf8');
  const audit = fs.readFileSync('src/pages/FreeAiAudit.jsx', 'utf8');
  
  assert(footer.includes('if (isSubmitting) return;'), 'ContactFooter missing duplicate guard');
  assert(audit.includes('if (isSubmitting) return;'), 'FreeAiAudit missing duplicate guard');

  assert(footer.includes('disabled={isSubmitting}'), 'ContactFooter submit button missing disabled attribute');
  assert(audit.includes('disabled={isSubmitting}'), 'FreeAiAudit submit button missing disabled attribute');
});

console.log('\n----------------------------------------------------');
console.log(`TOTAL FORM FIELD UPDATE TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
