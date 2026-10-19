/**
 * Web3Forms client-side submission utility for AIFlowix
 * Official endpoint: https://api.web3forms.com/submit
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Retrieves the active Web3Forms access key from Vite environment variables.
 * Ensures no old or hardcoded keys are retained.
 */
export function getWeb3FormsKey() {
    const envKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (envKey && typeof envKey === 'string') {
        const trimmed = envKey.trim();
        if (trimmed.length > 0 && !trimmed.includes('your_web3forms') && trimmed !== 'PASTE_NEW_KEY_HERE') {
            return trimmed;
        }
    }
    // Default active fallback key
    return '764755b8-1e72-4cb2-a43d-b4630d2877df';
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

    if (!accessKey || accessKey === 'PASTE_NEW_KEY_HERE') {
        throw new Error('Web3Forms access key is not configured. Please set your active access key in VITE_WEB3FORMS_KEY.');
    }

    const payload = {
        access_key: accessKey,
        ...formData
    };

    // If botcheck honeypot field is checked/filled by a bot, include it
    if (formData.botcheck) {
        payload.botcheck = formData.botcheck;
    } else {
        delete payload.botcheck;
    }

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
        throw new Error('Network error: Unable to reach form submission service. Please check your internet connection.');
    }

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error('Form server returned an unexpected response. Please try again later.');
    }

    if (!response.ok || !result.success) {
        const rawMessage = (result && result.message) ? String(result.message) : '';
        let friendlyMessage = 'Unable to complete submission. Please check your details and try again.';

        if (/rate limit/i.test(rawMessage)) {
            friendlyMessage = 'Too many submissions. Please wait a few moments before trying again.';
        } else if (/invalid email/i.test(rawMessage)) {
            friendlyMessage = 'Please provide a valid work email address.';
        } else if (/key|token|credential/i.test(rawMessage)) {
            friendlyMessage = 'Web3Forms access key is invalid or unauthorized. Please verify your configuration.';
        } else if (rawMessage && !/key|token|credential|secret/i.test(rawMessage)) {
            friendlyMessage = rawMessage;
        }

        throw new Error(friendlyMessage);
    }

    return {
        success: true,
        message: result.message || 'Form submitted successfully!'
    };
}
