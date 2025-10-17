import { API_CONFIG } from '../config/api.js';

/**
 * Verify OTP code
 * @param {string} msisdn - Mobile number with country code (e.g., "639123456789")
 * @param {string} otp - OTP code to verify
 * @param {Object} options - Additional options
 * @param {string} options.channelId - Channel ID (default: "C04")
 * @param {string} options.simType - SIM type (default: "PREPAID")
 * @param {string} options.sessionId - Session ID from validateAccount response
 * @returns {Promise<Object>} API response
 */
export async function verifyOTP(msisdn, otp, { channelId = 'C04', simType = 'PREPAID', sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.VERIFY_OTP}`;

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
      body: JSON.stringify({ msisdn, code: otp, channelId, simType })
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
