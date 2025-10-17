import { API_CONFIG } from '../config/api.js';

/**
 * Submits user details for eKYC processing.
 * @param {Object} payload - The user details payload to submit.
 * @param {string} payload.firstName - User's first name.
 * @param {string} payload.middleName - User's middle name (optional).
 * @param {string} payload.lastName - User's last name.
 * @param {string} payload.gender - User's gender (M/F/Other).
 * @param {string} payload.dateOfBirth - User's date of birth in YYYY-MM-DD format.
 * @param {string} payload.docType - Type of document (e.g., "passport", "drivers_license", "national_id").
 * @param {string} payload.documentNo - Document number.
 * @param {string} payload.nationality - User's nationality code (e.g., "IND", "PHL").
 * @param {string} payload.dateOfExpiry - Document expiry date in YYYY-MM-DD format.
 * @param {Array<Object>} payload.userAddresses - Array of user addresses.
 * @param {string} payload.userAddresses[].addressLine1 - Unit or house number.
 * @param {string} payload.userAddresses[].addressLine2 - Street address.
 * @param {string} payload.userAddresses[].addressLine3 - Village or subdivision.
 * @param {string} payload.userAddresses[].country - Country code (e.g., "PHL").
 * @param {string} payload.userAddresses[].state - State or province name.
 * @param {string} payload.userAddresses[].stateCode - State or province code.
 * @param {string} payload.userAddresses[].city - City name.
 * @param {string} payload.userAddresses[].cityCode - City code.
 * @param {string} payload.userAddresses[].barangay - Barangay name.
 * @param {string} payload.userAddresses[].barangayCode - Barangay code.
 * @param {string} payload.userAddresses[].postalCode - Postal code.
 * @param {Object} options - Additional options.
 * @param {string} options.sessionId - Session ID from previous steps.
 * @returns {Promise<Object>} API response.
 */
export async function submitUserDetails(payload = {}, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.USER_DETAILS_SUBMIT}`;

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

/**
 * Example usage:
 * 
 * const payload = {
 *   "firstName": "HARSHAD A",
 *   "middleName": "",
 *   "lastName": "BAGADE",
 *   "gender": "M",
 *   "dateOfBirth": "1990-07-11",
 *   "docType": "passport",
 *   "documentNo": "Z7276046",
 *   "nationality": "IND",
 *   "dateOfExpiry": "2033-03-15",
 *   "userAddresses": [
 *     {
 *       "addressLine1": "Unit 123, Tower A",
 *       "addressLine2": "123 Main Street",
 *       "addressLine3": "Green Valley Subdivision",
 *       "country": "PHL",
 *       "state": "Metro Manila",
 *       "stateCode": "140100000",
 *       "city": "Makati City",
 *       "cityCode": "140101000",
 *       "barangay": "Barangay Poblacion",
 *       "barangayCode": "140101001",
 *       "postalCode": "1200"
 *     }
 *   ]
 * };
 * 
 * const response = await submitUserDetails(payload, { sessionId: 'your-session-id' });
 */
