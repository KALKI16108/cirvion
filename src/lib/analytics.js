/**
 * Google Analytics GA4 Production Integration for AIFlowix
 * Official Measurement ID: G-ZESG1V8LVL
 * 
 * Strict Compliance:
 * 1. Zero PII: Never send names, emails, phone numbers, or message bodies.
 * 2. Accurate Timing: 'generate_lead' ONLY fires on confirmed API success.
 * 3. Event Hierarchy: form_start -> form_submit -> generate_lead.
 * 4. CTA & Booking Tracking: contact_cta_click & book_call_click.
 * 5. SPA Pageview Tracking: Tracks client-side routing and engagement.
 */

export const GA_MEASUREMENT_ID = 'G-ZESG1V8LVL';

// Fields that must NEVER be forwarded to GA4 (Privacy & PII protection)
const PII_DENYLIST = new Set([
  'name', 'first_name', 'last_name', 'full_name',
  'email', 'work_email', 'user_email',
  'phone', 'phone_number', 'mobile',
  'message', 'biggest_bottleneck', 'pain_points', 'notes',
  'password', 'token', 'access_key'
]);

/**
 * Filter out any PII before sending payload to GA4
 */
const sanitizeParams = (params = {}) => {
  const clean = {};
  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();
    if (!PII_DENYLIST.has(lowerKey) && typeof value !== 'function') {
      clean[key] = value;
    }
  }
  return clean;
};

/**
 * Check if Debug Mode should be enabled (local dev or ?debug_ga=true in URL)
 */
const isDebugMode = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.location.hostname === 'localhost' ||
    window.location.search.includes('debug_ga=true')
  );
};

/**
 * Safely dispatch GA4 event to gtag
 */
export const trackGAEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  if (typeof window.loadAnalytics === 'function') {
    try {
      window.loadAnalytics();
    } catch {
      // safe fallback
    }
  }

  const sanitized = sanitizeParams(params);
  if (isDebugMode()) {
    sanitized.debug_mode = true;
  }

  if (window.gtag) {
    try {
      window.gtag('event', eventName, {
        send_to: GA_MEASUREMENT_ID,
        ...sanitized
      });
      if (isDebugMode()) {
        console.log(`[GA4 Event] ${eventName}:`, sanitized);
      }
    } catch (err) {
      console.warn('[GA4 Dispatch Warning]:', err);
    }
  } else {
    // If gtag not ready yet, push to dataLayer safely
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...sanitized
    });
  }
};

/**
 * Track SPA Pageviews on React Router route changes
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window === 'undefined') return;

  const title = pageTitle || document.title;
  const path = pagePath || window.location.pathname;

  trackGAEvent('page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: path
  });
};

/**
 * 1. Form Start: User begins interacting with a lead form
 */
export const trackFormStart = (formName) => {
  trackGAEvent('form_start', {
    form_name: formName || 'Free Audit Form',
    form_destination: 'Web3Forms'
  });
};

/**
 * 2. Form Submit: Submission attempt initiated
 */
export const trackFormSubmit = (formName) => {
  trackGAEvent('form_submit', {
    form_name: formName || 'Free Audit Form'
  });
};

/**
 * 3. Generate Lead: Valid lead submission confirmed by API
 * Primary GA4 Key Event / Conversion
 */
export const trackLeadSuccess = (formType, safeDetails = {}) => {
  trackGAEvent('generate_lead', {
    event_category: 'Lead Generation',
    event_label: formType,
    form_type: formType,
    lead_source: 'AIFlowix Website',
    currency: 'USD',
    value: 100, // Normalized conversion score for GA4 valuation
    ...safeDetails
  });
};

// Backward-compatible alias
export const trackLeadSubmission = trackLeadSuccess;

/**
 * 4. Contact CTA Click: User clicks primary call-to-action
 */
export const trackContactCtaClick = (buttonName, location = 'Hero') => {
  trackGAEvent('contact_cta_click', {
    event_category: 'CTA Click',
    button_name: buttonName,
    location: location
  });
  // Also dispatch click_cta for backward compatibility with existing reports
  trackGAEvent('click_cta', {
    button_name: buttonName,
    location: location
  });
};

// Backward-compatible alias
export const trackCtaClick = trackContactCtaClick;

/**
 * 5. Book Call Click: User initiates discovery call / WhatsApp direct booking
 */
export const trackBookCallClick = (channel = 'whatsapp', location = 'Floating') => {
  trackGAEvent('book_call_click', {
    event_category: 'Direct Booking',
    channel: channel,
    location: location
  });
};

/**
 * Track Interactive Tools (Instant ROI Calculator, AI Readiness Quiz)
 */
export const trackToolEngagement = (toolName, action, details = {}) => {
  trackGAEvent('use_interactive_tool', {
    event_category: 'Engagement',
    tool_name: toolName,
    action: action,
    ...details
  });
};
