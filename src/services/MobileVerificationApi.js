import { API_CONFIG } from '../config/api.js';

// API base URL for mobile verification
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Endpoint for mobile number validation
export const VALIDATE_ACCOUNT_ENDPOINT = API_CONFIG.ENDPOINTS.VALIDATE_ACCOUNT;



// Real API call (relative path uses Vite proxy in dev)
export async function postValidateAccount({ msisdn, channelId, simType }) {
	const path = `/${VALIDATE_ACCOUNT_ENDPOINT}`;
	console.log('POST', path, { msisdn, channelId, simType });
	
	try {
		const response = await fetch(path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ msisdn, channelId, simType })
		});

		const contentType = response.headers.get('content-type') || '';
		const isJson = contentType.includes('application/json');
		const data = isJson ? await response.json() : await response.text();

		if (!response.ok) {
			// Server error - return the server's error message
			const message = isJson
				? (data?.errors?.[0]?.displayMessage || data?.message || `Request failed with ${response.status}`)
				: (data || `Request failed with ${response.status}`);
			const error = new Error(message);
			error.status = response.status;
			error.body = data;
			throw error;
		}

		// Extract session ID from response headers
		const sessionId = response.headers.get('X-Session-Id');
		return {
			...data,
			sessionId
		};
	} catch (err) {
		// Network error or other issues
		if (err.name === 'TypeError' && err.message.includes('fetch')) {
			throw new Error('Network error. Please check your connection and try again.');
		}
		throw err;
	}
}

// Public API: single entry point used by UI
export async function requestCode(msisdn, { channelId = 'C04', simType = 'PREPAID' } = {}) {
	return postValidateAccount({ msisdn, channelId, simType });
}
