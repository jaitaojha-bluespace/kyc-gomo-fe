// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://devapi.bluwyre.ai/',
  ENDPOINTS: {
    VALIDATE_ACCOUNT: 'v1/ekyc/validateAccount',
    SEND_OTP: 'v1/ekyc/send-otp',
    RESEND_OTP: 'v1/ekyc/resend-otp',
    VERIFY_OTP: 'v1/ekyc/otp-verification',
    CHECK_REGISTRATIONS: 'v1/ekyc/check-registrations',
    REG_TYPE_LIST: 'v1/ekyc/regTypeList',
    REG_TYPE: 'v1/ekyc/regType',
    DOCUMENT_SCAN: 'v1/ekyc/documentScan',
    USER_SELFIE: 'v1/ekyc/userSelfie',
        EKYC_SUMMARY: 'v1/ekyc/summary',
        ADDRESS: 'v1/ekyc/address',
        ADDITIONAL_DOCS_UPLOAD: 'v1/ekyc/additional-docs/upload',
        USER_DETAILS_SUBMIT: 'v1/ekyc/user-details/submit'
  }
};
