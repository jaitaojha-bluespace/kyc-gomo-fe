import React, { useState } from 'react';
import Button from './ui/Button';

const ReviewAndConfirm = ({ onNext }) => {
  const [showOtherIdDetails, setShowOtherIdDetails] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleConfirm = () => {
    if (isAgreed) {
      console.log('Review and Confirm submitted');
      onNext();
    }
  };

  const handleBack = () => {
    setShowConfirmationModal(false);
  };

  const handleEdit = (section) => {
    console.log(`Edit ${section}`);
    // Add edit functionality here
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div 
        className="space-y-6 overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b7280 #374151',
          maxHeight: '70vh'
        }}
      >
        {/* Mobile Number Section */}
        <div className="space-y-2">
          <h3 
            className="text-white text-lg font-bold"
            style={{ 
              fontFamily: 'Proxima Nova', 
              fontWeight: 500,
              fontStyle: 'normal'
            }}
          >
            Mobile Number
          </h3>
          <p 
            className="text-gray-300 text-sm"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            +63 976 123 4567
          </p>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        {/* SIM Registration Information Section */}
        <div className="space-y-2">
          <h3 
            className="text-white text-lg font-bold"
            style={{ 
              fontFamily: 'Proxima Nova', 
              fontWeight: 500,
              fontStyle: 'normal'
            }}
          >
            SIM Registration Information
          </h3>
          <p 
            className="text-gray-300 text-sm"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            SIM Owner
          </p>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        {/* ID Details Section */}
        <div className="space-y-4">
          <h3 
            className="text-white text-lg font-bold"
            style={{ 
              fontFamily: 'Proxima Nova', 
              fontWeight: 500,
              fontStyle: 'normal'
            }}
          >
            ID Details
          </h3>
          <p 
            className="text-gray-300 text-sm"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            Driver's License
          </p>
          
          {/* ID Image placeholder */}
          <div 
            className="w-1/2 h-24 rounded-lg border-2 border-gray-600 flex items-center justify-center"
            style={{ backgroundColor: '#402E5C' }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-1"></div>
              <p 
                className="text-gray-400 text-xs"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                Driver's License Image
              </p>
              <p 
                className="text-gray-500 text-xs"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                MASSACHUSETTS
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p 
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
              >
                Full Name
              </p>
              <p 
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
              >
                Daniel Brook
              </p>
            </div>
            <div>
              <p 
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
              >
                Document Number
              </p>
              <p 
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
              >
                S33344455
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOtherIdDetails(!showOtherIdDetails)}
            className="text-green-400 text-sm flex items-center gap-2"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            {showOtherIdDetails ? 'Hide' : 'Show'} other ID Details
            <svg 
              className={`w-4 h-4 transition-transform ${showOtherIdDetails ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        {/* Collapsible content sections */}
        {!showOtherIdDetails && (
          <>
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 
                  className="text-white text-lg font-bold"
                  style={{ 
                    fontFamily: 'Proxima Nova', 
                    fontWeight: 500,
                    fontStyle: 'normal'
                  }}
                >
                  Personal Information
                </h3>
                <button
                  type="button"
                  onClick={() => handleEdit('Personal Information')}
                  className="text-green-400 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Edit
                </button>
              </div>
              
              <div className="space-y-1">
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  First Name: Daniel
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Middle Name: Tyrone
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Last Name: Brook
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Suffix: CPA
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Birthday: 2000-01-15
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Gender: M
                </p>
              </div>
            </div>

            <div className="border-t border-gray-600 my-4"></div>

            {/* Philippine Address Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 
                  className="text-white text-lg font-bold"
                  style={{ 
                    fontFamily: 'Proxima Nova', 
                    fontWeight: 500,
                    fontStyle: 'normal'
                  }}
                >
                  Philippine Address
                </h3>
                <button
                  type="button"
                  onClick={() => handleEdit('Philippine Address')}
                  className="text-green-400 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Edit
                </button>
              </div>
              
              <div className="space-y-1">
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Unit or House No: Microtel Eagle Ridge Cavite
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Street: Amadeo Road
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Village / Subdivision: ---
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Province: Cavite
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  City: General Trias
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Barangay: Javalera
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  ZIP code: 02171-1748
                </p>
              </div>
            </div>

            <div className="border-t border-gray-600 my-4"></div>

            {/* Supporting Documents Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 
                  className="text-white text-lg font-bold"
                  style={{ 
                    fontFamily: 'Proxima Nova', 
                    fontWeight: 500,
                    fontStyle: 'normal'
                  }}
                >
                  Supporting Documents
                </h3>
                <button
                  type="button"
                  onClick={() => handleEdit('Supporting Documents')}
                  className="text-green-400 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Edit
                </button>
              </div>
              
              <div className="space-y-1">
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Philippines Address Proof: Travel Visa_Daniel Brook
                </p>
                <p 
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
                >
                  Return Ticket: Delta Airlines_Ticket 1234567890
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-xl"
            style={{
              backgroundColor: '#2C1B47',
              padding: '32px',
              width: '335px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Modal Title */}
            <h2
              className="text-white text-xl mb-8 text-center leading-tight"
              style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
            >
              To complete your SIM Registration, please confirm the following:
            </h2>

            {/* Checkbox and Legal Text */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="peer h-5 w-5 shrink-0 appearance-none rounded-md border border-pink-500 bg-gray-800"
                    style={{ 
                      backgroundColor: isAgreed ? '#D20E56' : '#1f2937',
                      borderColor: '#D20E56',
                      cursor: 'pointer'
                    }}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </div>
                </div>
                <label 
                  htmlFor="agreement" 
                  className="cursor-pointer text-gray-300 text-xs leading-relaxed"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    lineHeight: '140%',
                    letterSpacing: '0.2px'
                  }}
                >
                  By completing and submitting this SIM Registration Form, I affirm that I am of legal age and that the information provided is true, accurate, and complete to the best of my knowledge. I acknowledge that any falsification, omission, or concealment of a material fact may subject me to administrative, civil, or criminal liability.
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* I agree and confirm button */}
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={!isAgreed}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 'fit-content'
                }}
              >
                I agree and confirm
              </Button>

              {/* Back button */}
              <button
                type="button"
                onClick={handleBack}
                className="w-full text-white font-bold transition-all duration-200 hover:scale-105 relative"
                style={{
                  backgroundColor: '#2C1B47',
                  fontFamily: 'Proxima Nova',
                  fontWeight: 700,
                  fontSize: '14px',
                  textAlign: 'center',
                  borderRadius: '40px',
                  border: '2px solid transparent',
                  background: 'linear-gradient(#2C1B47, #2C1B47) padding-box, linear-gradient(96.14deg, #D20E56 31.04%, #9569DB 100.11%) border-box',
                  paddingTop: '12px',
                  paddingRight: '24px',
                  paddingBottom: '12px',
                  paddingLeft: '24px',
                  height: '45px'
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAndConfirm;
