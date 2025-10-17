import React from 'react';
import Button from './Button';

/**
 * Reusable Error Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {string} props.title - Modal title (default: "Something went wrong")
 * @param {string} props.message - Error message to display
 * @param {string} props.buttonText - Button text (default: "Got it")
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Object} props.style - Additional styles for the modal container
 */
const ErrorModal = ({ 
  isOpen, 
  title = "Something went wrong", 
  message, 
  buttonText = "Got it", 
  onClose,
  style = {}
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-xl"
        style={{
          backgroundColor: '#2C1B47',
          padding: '32px',
          width: '335px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          ...style
        }}
      >
        <h2
          className="text-white text-xl mb-6 text-center leading-tight"
          style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
        >
          {title}
        </h2>
        <p
          className="text-gray-300 text-sm mb-8 text-center"
          style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
        >
          {message}
        </p>
        <Button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 'fit-content'
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;
