import { API_CONFIG } from '../config/api.js';

/**
 * Submit user selfie images (neutral and smile)
 * @param {Object} payload - Selfie images payload
 * @param {string} payload.neutralImage - Base64 encoded neutral image
 * @param {string} payload.smileImage - Base64 encoded smile image
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response
 */
export async function submitUserSelfie(payload = {}, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.USER_SELFIE}`;

  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }

    const response = await fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
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
