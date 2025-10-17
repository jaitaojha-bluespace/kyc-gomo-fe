import React from 'react';
import { useForm } from '../context/FormContext';
import Button from './ui/Button';

const ScanInformation = ({ onNext }) => {
  const { mobileNumber } = useForm();

  const handleNext = (e) => {
    e.preventDefault();
    console.log('ScanInformation Next button clicked, onNext function:', typeof onNext);
    if (onNext) {
      onNext();
    } else {
      console.error('onNext function is not provided to ScanInformation');
    }
  };

  const sampleIds = [
    'National ID',
    'Driver\'s License',
    'UMID Card',
    'Voter\'s ID',
    'Passport',
    'Social Security ID (SSS ID)',
    'PRC ID'
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4 sm:space-y-6">
        {/* Section 1: Scan a government-issued ID */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg">
              <img 
                src="/id.png" 
                alt="ID Card" 
                className="w-8 h-6 sm:w-12 sm:h-9"
                style={{ width: '32px', height: '24px' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="text-white text-sm sm:text-base font-semibold mb-2"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 600
                }}
              >
                Scan a government-issued ID
              </h3>
              <div>
                <p className="text-xs sm:text-sm leading-relaxed text-white mb-0" style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}>
                  Sample IDs:
                </p>
                <div className="grid grid-cols-1 gap-0">
                  {sampleIds.map((id, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 rounded-full bg-white flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm leading-relaxed text-white break-words" style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}>
                        {id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Scan your document */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg">
              <img 
                src="/document.png" 
                alt="Document" 
                className="w-8 h-8 sm:w-12 sm:h-12"
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="text-white text-sm sm:text-base font-semibold"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 600
                }}
              >
                Scan your document, if applicable
              </h3>
            </div>
          </div>
        </div>

        {/* Section 3: Take a selfie */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg">
              <img 
                src="/selfie.png" 
                alt="Selfie" 
                className="w-8 h-8 sm:w-12 sm:h-12"
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="text-white text-sm sm:text-base font-semibold"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 600
                }}
              >
                Take a selfie
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <Button
          type="button"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ScanInformation;
