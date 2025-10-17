import React from 'react';
import Button from './ui/Button';

const SimRegistrationComplete = ({ onNext }) => {
  const handleNext = (e) => {
    e.preventDefault();
    console.log('SIM Registration Complete');
    onNext();
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText('ABC123');
    console.log('Reference number copied to clipboard');
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6 flex flex-col items-center px-1">
        {/* Success Icon and Main Heading */}
        <div className="text-center space-y-4">
          {/* Success Checkmark */}
          <div className="flex justify-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h2
            className="text-white"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
          >
            SIM Registration complete!
          </h2>

          {/* Description */}
          <p 
            className="text-white leading-relaxed px-4"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400, fontSize: '14px' }}
          >
            We sent an email and text confirmation of your SIM registration. Save the number below for future reference.
          </p>
        </div>

        {/* Reference Number Section */}
        <div className="space-y-4 text-center">
          {/* Divider before Reference Number */}
          <div className="border-t border-white my-6"></div>
          
          <h3 
            className="text-white text-xl"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
          >
            Reference Number
          </h3>
          
          <div className="flex items-center justify-center space-x-4">
            <span 
              className="text-green-400 text-3xl"
              style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
            >
              ABC123
            </span>
            <button
              type="button"
              onClick={handleCopyReference}
              className="p-2 border-2 border-gray-400 rounded-lg hover:bg-gray-400 hover:bg-opacity-10 transition-colors"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
            </button>
          </div>
          
          {/* Divider after ABC123 */}
          <div className="border-t border-white my-6"></div>
        </div>

        {/* SIM Registration Details */}
        <div className="space-y-4">
          <h3 
            className="text-white text-xl text-center"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
          >
            SIM Registration Details
          </h3>
          
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div 
                className="text-white"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400, fontSize: '14px' }}
              >
                Mobile Number
              </div>
              <div 
                className="text-white font-semibold"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 600, fontSize: '14px' }}
              >
                +63 976 123 4567
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div 
                className="text-white"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400, fontSize: '14px' }}
              >
                SIM Registration Date
              </div>
              <div 
                className="text-white font-semibold"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 600, fontSize: '14px' }}
              >
                December 5, 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
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

export default SimRegistrationComplete;
