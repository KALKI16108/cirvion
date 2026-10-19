/**
 * Google Analytics GA4 Helper for AIFlowix
 * Integrates with window.gtag (G-ZESG1V8LVL)
 */

export const GA_MEASUREMENT_ID = 'G-ZESG1V8LVL';

/**
 * Safely send event to Google Analytics
 */
export const trackGAEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, {
        send_to: GA_MEASUREMENT_ID,
        ...params
      });
    } catch (err) {
      console.warn('Analytics event dispatch warning:', err);
    }
  }
};

/**
 * Track Lead Generation (GA4 Key Event)
 */
export const trackLeadSubmission = (formType, leadData = {}) => {
  trackGAEvent('generate_lead', {
    event_category: 'Lead Generation',
    event_label: formType,
    form_type: formType,
    company_name: leadData.company_name || leadData.company || 'Not provided',
    value: 100, // Estimated lead value score for GA4
    currency: 'USD'
  });
};

/**
 * Track Interactive Tool Engagement (ROI / Readiness Quiz)
 */
export const trackToolEngagement = (toolName, action, details = {}) => {
  trackGAEvent('use_interactive_tool', {
    event_category: 'Engagement',
    tool_name: toolName,
    action: action,
    ...details
  });
};

/**
 * Track CTA Button Clicks
 */
export const trackCtaClick = (buttonName, location = 'Hero') => {
  trackGAEvent('click_cta', {
    event_category: 'CTA Click',
    button_name: buttonName,
    location: location
  });
};
