import React, { useEffect } from 'react';
import Button from './ui/Button';

const ProcessingSimRegistration = ({ onNext }) => {
  // Auto-navigate after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Processing SIM Registration completed - auto navigating');
      onNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onNext]);

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Processing SIM Registration completed');
    onNext();
  };

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <div className="text-center space-y-8">
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div 
            className="w-16 h-16 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: '#D20E56',
              borderRightColor: '#D20E56'
            }}
          ></div>
        </div>

        {/* Main Heading */}
        <h2 
          className="text-white text-xl text-center"
          style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
        >
          We're processing your<br />SIM Registration.
        </h2>

        {/* Instructions */}
        <div className="space-y-2">
          <p 
            className="text-white text-base"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            This may take several seconds.
          </p>
          <p 
            className="text-white text-base"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            To avoid interruptions, stay on this
          </p>
          <p 
            className="text-white text-base"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            page. Do not quit this app or refresh
          </p>
          <p 
            className="text-white text-base"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            the screen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSimRegistration;
