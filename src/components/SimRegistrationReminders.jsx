import React, { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';
import { FaCheck } from 'react-icons/fa';
import Button from './ui/Button';
import { getRegTypeList } from '../services/RegTypeListApi';
import ErrorModal from './ui/ErrorModal';

const SimRegistrationReminders = ({ onNext }) => {
  const { isAgreed, setIsAgreed } = useForm();
  const [isSimAgreed, setIsSimAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: ''
  });
  const [sessionId, setSessionId] = useState(null);

  // Get sessionId from localStorage (stored during mobile verification)
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isSimAgreed) return;

    setIsLoading(true);
    try {
      const regTypeData = await getRegTypeList({ sessionId });
      console.log('Registration types:', regTypeData);
      
      // Proceed to next page on successful API call
      onNext();
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Failed to load registration types. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    // Handle exit logic here
    console.log('Exit clicked');
  };

  const idTypes = [
    'Passport',
    'National ID',
    'Social Security ID (SSS ID)',
    'Driver\'s License',
    'PRC ID',
    'Voter\'s ID',
    'UMID Card'
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        {/* Reminders */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div 
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white text-sm font-bold"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700
              }}
            >
              1.
            </div>
            <p 
              className="text-white text-sm leading-relaxed"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              If you are under 18 years, your parent or guardian must register the SIM for you.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div 
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white text-sm font-bold"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700
              }}
            >
              2.
            </div>
            <p 
              className="text-white text-sm leading-relaxed"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              If your mobile number is owned by a business or enterprise, only an authorized representative from the business may register or update the SIM.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div 
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white text-sm font-bold"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700
              }}
            >
              3.
            </div>
            <p 
              className="text-white text-sm leading-relaxed"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              Make sure you have one valid Government-issued ID ready for scanning. The ID must contain a picture of your face.
            </p>
          </div>
        </div>

        {/* Recommended ID Types */}
        <div className="space-y-2 ml-9">
          <h3 
            className="text-white"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400,
              fontStyle: 'Regular',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            Recommended ID types include:
          </h3>
          <div className="grid grid-cols-1 gap-1">
            {idTypes.map((idType, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <span 
                  className="text-white"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400,
                    fontStyle: 'Regular',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  {idType}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start space-x-3">
          <div className="relative flex h-5 w-5 items-center">
            <input
              id="simAgreement"
              type="checkbox"
              checked={isSimAgreed}
              onChange={() => setIsSimAgreed(!isSimAgreed)}
              className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border border-pink-500 bg-gray-800"
              style={{
                backgroundColor: isSimAgreed ? '#D20E56' : '#1f2937',
                borderColor: '#D20E56'
              }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
              <FaCheck size={10} />
            </div>
          </div>
          <label
            htmlFor="simAgreement"
            className="cursor-pointer text-gray-300"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400,
              fontStyle: 'Regular',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            I understand and agree that the personal data I will provide will be used to register my SIM and to manage and secure my Globe account, in compliance with the{' '}
            <span
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700,
                fontStyle: 'Bold',
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%',
                color: '#93E9BE'
              }}
            >
              SIM Registration Act
            </span>
            , the{' '}
            <span
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700,
                fontStyle: 'Bold',
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%',
                color: '#93E9BE'
              }}
            >
              Data Privacy Act
            </span>
            , and the{' '}
            <span
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 700,
                fontStyle: 'Bold',
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%',
                color: '#93E9BE'
              }}
            >
              Privacy Policy of GOMO
            </span>
            .
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-8">
        {/* Next Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleNext}
            disabled={!isSimAgreed || isLoading}
          >
            {isLoading ? 'Loading...' : 'Next'}
          </Button>
        </div>

        {/* Exit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleExit}
            className="w-full max-w-[335px] h-[45px] rounded-full border-2 text-white font-bold text-center transition-transform duration-200 hover:scale-105"
            style={{
              backgroundColor: '#2C1D44',
              borderColor: '#D20E56',
              fontFamily: 'Proxima Nova',
              fontWeight: 700,
              fontSize: '13px',
              width: '100%',
              maxWidth: '335px',
              minWidth: '335px'
            }}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
      />
    </div>
  );
};

export default SimRegistrationReminders;