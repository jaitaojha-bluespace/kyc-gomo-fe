import React, { useState, useRef, useEffect } from 'react';
import { useForm } from '../context/FormContext';
import Button from './ui/Button';
import { resendOTP } from '../services/ResendOTPApi';
import { verifyOTP } from '../services/VerifyOTPApi';
import { checkRegistrations } from '../services/CheckRegistrationsApi';
import ErrorModal from './ui/ErrorModal';

const OTPVerificationStep = ({ onNext }) => {
  const { mobileNumber } = useForm();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [expiryTimer, setExpiryTimer] = useState(300); // 5 minutes (OTP validity info only)
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: ''
  });
  const [sessionId, setSessionId] = useState(null);
  const inputRefs = useRef([]);

  // Get sessionId from localStorage (stored during mobile verification)
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (resendTimer === 0) setCanResend(true);
  }, [resendTimer, canResend]);

  // Informational OTP validity countdown (does not change current submission logic)
  useEffect(() => {
    if (expiryTimer > 0) {
      const timer = setTimeout(() => setExpiryTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (expiryTimer === 0 && !isExpired) {
      setIsExpired(true);
      setOtp(['', '', '', '', '', '']); // Clear OTP boxes
    }
  }, [expiryTimer, isExpired]);

  const formatExpiry = (totalSeconds) => {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };


  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only digits, single char
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...otp];
    for (let i = 0; i < pasted.length && i < 6; i++) next[i] = pasted[i];
    setOtp(next);
    const last = Math.min(pasted.length - 1, 5);
    if (last >= 0) inputRefs.current[last]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) return;

    setIsVerifying(true);
    try {
      const msisdn = `63${mobileNumber}`;
      await verifyOTP(msisdn, code, { sessionId });
      
      // After successful OTP verification, check registrations
      const registrationData = await checkRegistrations(msisdn, { sessionId });
      console.log('Registration data:', registrationData);
      
      // Proceed to next page on successful verification
      onNext();
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'OTP verification failed. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const msisdn = `63${mobileNumber}`;
      await resendOTP(msisdn, { sessionId });
      
      // Reset timers and UI on successful resend
      setResendTimer(59);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setExpiryTimer(300); // Reset 5-minute timer
      setIsExpired(false); // Reset expired state
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Failed to resend OTP. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
    } finally {
      setIsResending(false);
    }
  };

  const isOTPComplete = otp.every((d) => d !== '');

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        {/* Instruction */}
        <div className="text-center">
          <div 
            className="text-white"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center'
            }}
          >
            <p>Please enter the OTP code sent to</p>
            <p 
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700,
                fontStyle: 'Bold',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center'
              }}
            >
              {mobileNumber}
            </p>
          </div>
        </div>

        {/* OTP Input Fields + Expiry aligned to left edge */}
        <div className="w-max mx-auto">
          <div className="flex space-x-1 sm:space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="text-center text-white text-lg sm:text-xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9569DB] focus:border-transparent w-10 h-10 sm:w-11 sm:h-11"
                style={{
                  backgroundColor: '#402E5C',
                  border: '2px solid #9569DB',
                  fontFamily: 'Proxima Nova',
                  fontWeight: 700,
                  opacity: 1
                }}
              />
            ))}
          </div>

          {/* OTP validity countdown (informational only) */}
          <div className="mt-3 text-left w-max">
            {isExpired ? (
              <p 
                className="text-red-400 text-xs sm:text-sm font-bold"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 700
                }}
              >
                OTP expired
              </p>
            ) : (
              <p 
                className="text-white text-xs sm:text-sm"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                Code expires in <span 
                  className="text-orange-400 font-bold"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 700
                  }}
                >
                  {formatExpiry(expiryTimer)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <Button type="submit" disabled={!isOTPComplete || isVerifying}>
          {isVerifying ? 'Verifying...' : 'Next'}
        </Button>
      </div>

      {/* Resend OTP */}
      <div className="text-center space-y-2 mt-4">
        <p 
          className="text-white"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center'
          }}
        >
          Didn't receive the code?
        </p>
        <div className="flex justify-center items-center space-x-2">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend || isResending}
            className={`${
              canResend && !isResending ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            style={{ 
              fontFamily: 'Proxima Nova',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              textTransform: 'capitalize',
              textDecoration: 'underline',
              textDecorationStyle: 'solid',
              textDecorationOffset: '0%',
              textDecorationThickness: '0%',
              color: canResend ? '#ABA6B3' : '#ABA6B3'
            }}
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
          {!canResend && (
            <span 
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#FFE16A'
              }}
            >
              ({String(Math.floor(resendTimer / 60)).padStart(2, '0')}:{String(resendTimer % 60).padStart(2, '0')})
            </span>
          )}
        </div>
      </div>

      {/* Security Warning */}
      <div className="mt-4 sm:mt-6 text-center">
        <p 
          className="text-white text-xs leading-relaxed px-2"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >
          NEVER SHARE YOUR ONE-TIME PIN (OTP). Please make sure YOU triggered this SIM registration. If not, DON'T ENTER YOUR OTP ON ANY SITE OR SEND IT TO ANYONE because IT'S A SCAM! If you requested, your GOMO OTP is: <span 
            className="text-[#D20E56] font-bold"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 700
            }}
          >
            OTP
          </span>
        </p>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
      />
    </form>
  );
};

export default OTPVerificationStep;


