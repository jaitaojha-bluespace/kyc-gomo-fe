import { API_CONFIG } from '../config/api.js';

/**
 * Upload additional documents for eKYC verification
 * @param {Object} payload - Additional documents payload
 * @param {Array} payload.documents - Array of document objects
 * @param {string} payload.documents[].documentType - Type of document (e.g., 'utility_bill', 'bank_statement')
 * @param {string} payload.documents[].documentImage - Base64 encoded document image
 * @param {string} payload.documents[].documentName - Name/description of the document
 * @param {string} payload.locale - Locale for the request (e.g., 'en')
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response containing upload confirmation
 */
export async function uploadAdditionalDocs(payload = {}, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.ADDITIONAL_DOCS_UPLOAD}`;

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
