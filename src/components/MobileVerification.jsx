import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import Button from './ui/Button';
import { requestCode } from '../services/MobileVerificationApi';
import { sendOTP } from '../services/SendOTPApi';
import ErrorModal from './ui/ErrorModal';

// Notice this component no longer has the header or main background div.
// It's just the form itself.
const MobileVerification = ({ onNext }) => {
  const { mobileNumber, setMobileNumber, isAgreed, setIsAgreed } = useForm();
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: ''
  });
  const [isValidating, setIsValidating] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(false);
  const [isValidationSuccessful, setIsValidationSuccessful] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const validateMobileNumber = async (msisdn, shouldProceed = false) => {
    setIsValidating(true);
    setHasValidationError(false); // Reset error state
    setIsValidationSuccessful(false); // Reset success state
    try {
      const response = await requestCode(msisdn);
      // Mark validation as successful and store session ID
      setIsValidationSuccessful(true);
      setHasValidationError(false);
      setSessionId(response.sessionId);
      // Store sessionId in localStorage for OTP step
      localStorage.setItem('sessionId', response.sessionId);
      // Only proceed if explicitly requested (button click)
      if (shouldProceed) {
        onNext();
      }
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Validation failed. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
      setHasValidationError(true); // Set error state
      setIsValidationSuccessful(false); // Mark as not successful
    } finally {
      setIsValidating(false);
    }
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!mobileNumber || !isAgreed || !isValidationSuccessful || !sessionId) return;

    const msisdn = `63${mobileNumber}`;
    
    try {
      setIsValidating(true);
      await sendOTP(msisdn, { sessionId });
      // Proceed to next page after successful OTP send
      onNext();
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Failed to send OTP. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
      setHasValidationError(true);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <form onSubmit={handleRequestCode} className="flex h-full flex-col justify-between">
      <div className="space-y-6 flex flex-col items-center">
        {/* Mobile Number Input */}
        <div>
          <label 
            htmlFor="mobileNumber" 
            className="mb-2 block"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#FFD71F'
            }}
          >
            Mobile Number*
          </label>
          <div className="relative">
            <span 
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '10px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#FFFFFF'
              }}
            >
              +63
            </span>
            <input
              type="tel" 
              id="mobileNumber" 
              value={mobileNumber}
              onChange={async (e) => {
                let digitsOnly = e.target.value.replace(/\D/g, '');
                // If starts with 0, replace with 9
                if (digitsOnly.startsWith('0')) {
                  digitsOnly = '9' + digitsOnly.slice(1);
                }
                digitsOnly = digitsOnly.slice(0, 10);
                setMobileNumber(digitsOnly);
                if (digitsOnly.length !== 10) {
                  setIsAgreed(false);
                  setHasValidationError(false); // Reset error when not 10 digits
                  setIsValidationSuccessful(false); // Reset success state
                  setSessionId(null); // Reset session ID
                  setErrorModal({ isOpen: false, message: '' }); // Reset error modal
                } else {
                  // Auto-validate when 10 digits are entered (no auto-proceed)
                  const msisdn = `63${digitsOnly}`;
                  await validateMobileNumber(msisdn, false); // false = don't proceed
                }
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
              className="block rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9569DB] focus:border-transparent"
              style={{
                backgroundColor: '#402E5C',
                border: '2px solid #9569DB',
                width: '335px',
                height: '50px',
                paddingTop: '14px',
                paddingRight: '15px',
                paddingBottom: '14px',
                paddingLeft: '40px',
                borderRadius: '5px',
                opacity: 1,
                marginBottom: '2px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '10px',
                letterSpacing: '0%',
                verticalAlign: 'middle'
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              required
            />
            {mobileNumber && (
              <button type="button" onClick={() => { setMobileNumber(''); setIsAgreed(false); }} className="absolute flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full" style={{ backgroundColor: '#D20E56', top: '50%', right: '6px', transform: 'translateY(-50%)' }}>
                <IoMdClose size={14} className="sm:w-4 sm:h-4" style={{ color: '#2C1D44' }} />
              </button>
            )}
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 sm:gap-4 w-full max-w-[335px]">
          <div className="relative flex h-5 sm:h-6 items-center">
            <input 
              id="terms" 
              type="checkbox" 
              checked={isAgreed} 
              disabled={(mobileNumber || '').length !== 10 || hasValidationError || !isValidationSuccessful}
              onChange={() => {
                if ((mobileNumber || '').length === 10 && !hasValidationError && isValidationSuccessful) {
                  setIsAgreed(!isAgreed);
                }
              }} 
              className="peer h-5 w-5 sm:h-6 sm:w-6 shrink-0 appearance-none rounded-md border border-pink-500 bg-gray-800"
              style={{ 
                backgroundColor: isAgreed ? '#D20E56' : '#1f2937',
                borderColor: '#D20E56',
                cursor: (mobileNumber || '').length === 10 && !hasValidationError && isValidationSuccessful ? 'pointer' : 'not-allowed',
                opacity: (mobileNumber || '').length === 10 && !hasValidationError && isValidationSuccessful ? 1 : 0.6
              }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
              <FaCheck size={10} className="sm:w-3 sm:h-3" />
            </div>
          </div>
          <label 
            htmlFor="terms" 
            className="cursor-pointer text-gray-300 text-xs sm:text-sm leading-relaxed"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 600,
              fontStyle: 'normal',
              lineHeight: '140%',
              letterSpacing: '0.2px'
            }}
          >
            By completing and submitting this form, understand and agree that the personal data l provided will be used to register my SIM and to manage and secure my GOMO account, in compliance with the SIM Registration Act and the Privacy Policy of GOMO. I affirm that I am of legal age, and that the information I will provide is true, accurate, and complete to the best of my knowledge. I acknowledge that any falsification, omission, or concealment of a material fact may result it administrative, civil, or criminal liability.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={!mobileNumber || !isAgreed || isValidating || !isValidationSuccessful}
        >
          Request Code
        </Button>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => {
          setErrorModal({ isOpen: false, message: '' });
          setHasValidationError(false); // Reset error state when modal is closed
          setIsValidationSuccessful(false); // Reset success state
          setSessionId(null); // Reset session ID
        }}
      />
    </form>
  );
};

export default MobileVerification;


