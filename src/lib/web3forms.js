/**
 * Web3Forms client-side submission utility for AIFlowix
 * Official endpoint: https://api.web3forms.com/submit
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Existing project access key preserved from SECURITY.md / environment
const DEFAULT_ACCESS_KEY = '764755b8-1e72-4cb2-a43d-b4630d2877df';

export function getWeb3FormsKey() {
    const envKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 0 && !envKey.includes('your_web3forms')) {
        return envKey.trim();
    }
    return DEFAULT_ACCESS_KEY;
}

/**
 * Submits form data asynchronously to Web3Forms API.
 * Never logs or exposes the access key.
 *
 * @param {Record<string, any>} formData - Key-value pairs for form fields
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitToWeb3Forms(formData) {
    const accessKey = getWeb3FormsKey();

    if (!accessKey) {
        throw new Error('Form service is currently unavailable. Please contact us via email or WhatsApp.');
    }

    // Prepare payload with required access_key and all user fields
    const payload = {
        access_key: accessKey,
        ...formData
    };

    let response;
    try {
        response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (networkError) {
        // Network connection error (DNS, offline, blocked by firewall)
        throw new Error('Network error: Unable to reach form submission service. Please check your connection and try again.');
    }

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error('Server returned an unexpected response. Please try again or reach out directly.');
    }

    if (!response.ok || !result.success) {
        // User-friendly mapping of Web3Forms response messages
        const rawMessage = result?.message || '';
        let friendlyMessage = 'Submission was not accepted. Please check your entries and try again.';

        if (/rate limit/i.test(rawMessage)) {
            friendlyMessage = 'Too many submissions. Please wait a few minutes before trying again.';
        } else if (/invalid email/i.test(rawMessage)) {
            friendlyMessage = 'Please provide a valid email address.';
        } else if (/key/i.test(rawMessage)) {
            friendlyMessage = 'Form service configuration error. Please contact us directly via WhatsApp or email.';
        } else if (rawMessage && !/key|token|credential/i.test(rawMessage)) {
            friendlyMessage = rawMessage;
        }

        throw new Error(friendlyMessage);
    }

    return {
        success: true,
        message: result.message || 'Form submitted successfully!'
    };
}
