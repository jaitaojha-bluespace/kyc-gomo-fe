# Analytics and Encryption Setup

## Google Analytics 4 (React GA4)

### Setup Instructions:
1. Create a Google Analytics 4 property
2. Get your GA4 Measurement ID (format: G-XXXXXXXXXX)
3. Create a `.env` file in the project root with:
   ```
   REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

### Features Added:
- Page view tracking for all steps
- Step completion tracking
- Flow completion tracking
- Custom event tracking for document capture, face capture, and smile liveness

## Encryption (CryptoJS)

### Setup Instructions:
1. Create a `.env` file in the project root with:
   ```
   REACT_APP_ENCRYPTION_KEY=your-secret-encryption-key-here
   ```

### Features Added:
- Data encryption/decryption for sensitive form fields
- Data hashing for integrity verification
- Secure ID generation
- Form data encryption utilities

### Usage Examples:
```javascript
import { encryptData, decryptData, hashData } from './utils/encryption';

// Encrypt sensitive data
const encrypted = encryptData({ mobileNumber: '+1234567890' });

// Decrypt data
const decrypted = decryptData(encrypted);

// Hash data
const hash = hashData('sensitive information');
```

## Files Created:
- `src/config/analytics.js` - Google Analytics configuration
- `src/utils/encryption.js` - Encryption utilities
- `ANALYTICS_SETUP.md` - This setup guide

## Dependencies Added:
- `react-ga4` - Google Analytics 4 for React
- `cryptojs` - JavaScript encryption library
