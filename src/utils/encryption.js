import CryptoJS from 'crypto-js';

// Encryption key - in production, this should be stored securely
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secret-key-here';

// Encrypt data
export const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Decrypt data
export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Hash data (one-way encryption)
export const hashData = (data) => {
  try {
    return CryptoJS.SHA256(data).toString();
  } catch (error) {
    console.error('Hashing error:', error);
    return null;
  }
};

// Encrypt sensitive form data
export const encryptFormData = (formData) => {
  const sensitiveFields = ['mobileNumber', 'firstName', 'lastName', 'address', 'zipCode'];
  const encryptedData = { ...formData };
  
  sensitiveFields.forEach(field => {
    if (encryptedData[field]) {
      encryptedData[field] = encryptData(encryptedData[field]);
    }
  });
  
  return encryptedData;
};

// Decrypt sensitive form data
export const decryptFormData = (encryptedFormData) => {
  const sensitiveFields = ['mobileNumber', 'firstName', 'lastName', 'address', 'zipCode'];
  const decryptedData = { ...encryptedFormData };
  
  sensitiveFields.forEach(field => {
    if (decryptedData[field]) {
      decryptedData[field] = decryptData(decryptedData[field]);
    }
  });
  
  return decryptedData;
};

// Generate a secure random string
export const generateSecureId = (length = 32) => {
  return CryptoJS.lib.WordArray.random(length).toString();
};

// Verify data integrity
export const verifyDataIntegrity = (data, hash) => {
  const dataHash = hashData(JSON.stringify(data));
  return dataHash === hash;
};

export default {
  encryptData,
  decryptData,
  hashData,
  encryptFormData,
  decryptFormData,
  generateSecureId,
  verifyDataIntegrity
};
