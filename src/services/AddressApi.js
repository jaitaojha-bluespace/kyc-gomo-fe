import { API_CONFIG } from '../config/api.js';

/**
 * Get address data by division type
 * @param {string} division - Division type: 'province', 'city', 'barangay', or 'postalCode'
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @param {string} options.parentCode - Parent code for filtering (e.g., province code for cities)
 * @returns {Promise<Object>} API response containing address data
 */
export async function getAddressData(division, { sessionId, parentCode } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.ADDRESS}?division=${division}`;

  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }

    // Add parent code as query parameter if provided
    const url = parentCode ? `${path}&parentCode=${parentCode}` : path;

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      
      if (isJson && data) {
        // Handle different error response formats
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0].displayMessage || data.errors[0].message || errorMessage;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errorMessage) {
          errorMessage = data.errorMessage;
        }
      } else if (data && typeof data === 'string') {
        errorMessage = data;
      }

      // Add specific error messages for common status codes
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input and try again.';
          break;
        case 401:
          errorMessage = 'Authentication required. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Address data not found. Please try selecting a different option.';
          break;
        case 422:
          errorMessage = 'Invalid address code provided. Please try again.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          // Keep the original error message for other status codes
          break;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.body = data;
      error.type = 'API_ERROR';
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
 * Get provinces
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response containing provinces list
 */
export async function getProvinces({ sessionId } = {}) {
  try {
    return await getAddressData('province', { sessionId });
  } catch (error) {
    console.error('Error fetching provinces:', error);
    
    // Enhance error message for provinces
    if (error.type === 'API_ERROR') {
      throw new Error(`Failed to load provinces: ${error.message}`);
    } else if (error.message.includes('Network error')) {
      throw new Error('Unable to load provinces. Please check your internet connection and try again.');
    } else {
      throw new Error('Failed to load provinces. Please try again later.');
    }
  }
}

/**
 * Get cities by province
 * @param {string} provinceCode - Province code
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response containing cities list
 */
export async function getCities(provinceCode, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.ADDRESS}?division=city&codeName=province&code=${provinceCode}`;

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
      let errorMessage = `Request failed with status ${response.status}`;
      
      if (isJson && data) {
        // Handle different error response formats
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0].displayMessage || data.errors[0].message || errorMessage;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errorMessage) {
          errorMessage = data.errorMessage;
        }
      } else if (data && typeof data === 'string') {
        errorMessage = data;
      }

      // Add specific error messages for common status codes
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid province code provided. Please select a valid province.';
          break;
        case 401:
          errorMessage = 'Authentication required. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'No cities found for the selected province. Please try a different province.';
          break;
        case 422:
          errorMessage = 'Invalid province code. Please select a valid province.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          // Keep the original error message for other status codes
          break;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.body = data;
      error.type = 'API_ERROR';
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
 * Get barangays by city
 * @param {string} cityCode - City code
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response containing barangays list
 */
export async function getBarangays(cityCode, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.ADDRESS}?division=barangay&codeName=city&code=${cityCode}`;

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
      let errorMessage = `Request failed with status ${response.status}`;
      
      if (isJson && data) {
        // Handle different error response formats
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0].displayMessage || data.errors[0].message || errorMessage;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errorMessage) {
          errorMessage = data.errorMessage;
        }
      } else if (data && typeof data === 'string') {
        errorMessage = data;
      }

      // Add specific error messages for common status codes
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid city code provided. Please select a valid city.';
          break;
        case 401:
          errorMessage = 'Authentication required. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'No barangays found for the selected city. Please try a different city.';
          break;
        case 422:
          errorMessage = 'Invalid city code. Please select a valid city.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          // Keep the original error message for other status codes
          break;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.body = data;
      error.type = 'API_ERROR';
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
 * Get postal code by barangay
 * @param {string} barangayCode - Barangay code
 * @param {Object} options - Additional options
 * @param {string} options.sessionId - Session ID from previous steps
 * @returns {Promise<Object>} API response containing postal code
 */
export async function getPostalCode(barangayCode, { sessionId } = {}) {
  const path = `/${API_CONFIG.ENDPOINTS.ADDRESS}?division=postalCode&codeName=barangay&code=${barangayCode}`;

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
      let errorMessage = `Request failed with status ${response.status}`;
      
      if (isJson && data) {
        // Handle different error response formats
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0].displayMessage || data.errors[0].message || errorMessage;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errorMessage) {
          errorMessage = data.errorMessage;
        }
      } else if (data && typeof data === 'string') {
        errorMessage = data;
      }

      // Add specific error messages for common status codes
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid barangay code provided. Please select a valid barangay.';
          break;
        case 401:
          errorMessage = 'Authentication required. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Postal code not found for the selected barangay. Please try a different barangay.';
          break;
        case 422:
          errorMessage = 'Invalid barangay code. Please select a valid barangay.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          // Keep the original error message for other status codes
          break;
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.body = data;
      error.type = 'API_ERROR';
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
