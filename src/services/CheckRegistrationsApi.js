import { API_CONFIG } from '../config/api.js';

/**
 * Check registrations for a mobile number
 * @param {string} msisdn - Mobile number with country code (e.g., "639123456789")
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from validateAccount response
 * @returns {Promise<Object>} API response
 */
export async function checkRegistrations(msisdn, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.CHECK_REGISTRATIONS}?msisdn=${msisdn}`;

  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }

    const response = await fetch(path, {
      method: 'GET',
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message = isJson
        ? (data?.errors?.[0]?.displayMessage || data?.message || `Request failed with ${response.status}`)
        : (data || `Request failed with ${response.status}`);
      const error = new Error(message);
      error.status = response.status;
      error.body = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw err;
  }
}
