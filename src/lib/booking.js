/**
 * Safe, configurable calendar booking configuration.
 * 
 * If a provider URL (e.g. Calendly, Cal.com, Google Calendar) is provided via
 * VITE_CALENDAR_BOOKING_URL, users can be routed directly to calendar scheduling.
 * Otherwise, the application safely falls back to the on-site discovery/audit form (#contact).
 * 
 * NEVER hardcode or invent external booking credentials.
 */

export const getCalendarBookingUrl = () => {
    let configuredUrl = null;
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        configuredUrl = import.meta.env.VITE_CALENDAR_BOOKING_URL;
    } else if (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env) {
        configuredUrl = globalThis.process.env.VITE_CALENDAR_BOOKING_URL;
    }
    if (configuredUrl && typeof configuredUrl === 'string' && configuredUrl.trim().startsWith('http')) {
        return configuredUrl.trim();
    }
    return null;
};

export const hasConfiguredCalendar = () => {
    return Boolean(getCalendarBookingUrl());
};
