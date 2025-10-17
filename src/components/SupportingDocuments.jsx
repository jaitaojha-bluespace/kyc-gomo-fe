import React, { useState } from 'react';
import Button from './ui/Button';

const SupportingDocuments = ({ onNext }) => {
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [certificateFile, setCertificateFile] = useState('');
  const [resolutionFile, setResolutionFile] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeField, setActiveField] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Supporting Documents completed');
    onNext();
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      if (field === 'certificate') {
        setCertificateFile(file.name);
      } else if (field === 'resolution') {
        setResolutionFile(file.name);
      }
    }
  };

  const handleClearFile = (field) => {
    if (field === 'certificate') {
      setCertificateFile('');
      // Clear the file input value
      const fileInput = document.getElementById('certificate');
      if (fileInput) {
        fileInput.value = '';
      }
    } else if (field === 'resolution') {
      setResolutionFile('');
      // Clear the file input value
      const fileInput = document.getElementById('resolution');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  const handleUploadClick = (field) => {
    setActiveField(field);
    setShowUploadModal(true);
  };

  const handleUploadOption = (option) => {
    if (option === 'take-photo') {
      // Handle camera capture
      handleCameraCapture();
    } else if (option === 'photo-library') {
      // Handle photo library
      handlePhotoLibrary();
    } else if (option === 'choose-file') {
      // Trigger file input
      const fileInput = document.getElementById(activeField);
      if (fileInput) {
        fileInput.click();
      }
    }
    setShowUploadModal(false);
  };

  const handleCameraCapture = () => {
    // Create a file input with camera capture
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use back camera
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileChange(activeField, e);
      }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handlePhotoLibrary = () => {
    // Create a file input for photo library
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileChange(activeField, e);
      }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleModalClose = () => {
    setShowUploadModal(false);
    setActiveField('');
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        {/* Required fields notice */}
        <p 
          className="text-sm text-yellow-500"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >
          *All fields with * are required
        </p>
        
        <div className="border-t border-gray-600 my-6"></div>

        {/* Main content */}
        <div className="space-y-6">
          <h2 
            className="text-white text-xl font-bold"
            style={{ 
              fontFamily: 'Proxima Nova', 
              fontWeight: 500,
              fontStyle: 'normal'
            }}
          >
            Supporting Documents
          </h2>
          
          <p 
            className="text-white text-base"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
          >
            Please upload the following supporting document(s):
          </p>

          {/* Guidelines toggle */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowGuidelines(!showGuidelines)}
              className="text-green-400 text-sm flex items-center gap-2"
              style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}
            >
              {showGuidelines ? 'Hide' : 'Show'} document guidelines
              <svg 
                className={`w-4 h-4 transition-transform ${showGuidelines ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {/* Guidelines content */}
            {showGuidelines && (
              <div className="space-y-2 pl-4">
                <ul className="space-y-1">
                  <li className="text-white text-sm flex items-start">
                    <span className="mr-2">•</span>
                    <span style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}>
                      Format: JPEG, PNG, HEIC or HEIF
                    </span>
                  </li>
                  <li className="text-white text-sm flex items-start">
                    <span className="mr-2">•</span>
                    <span style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}>
                      Image Dimensions: 800x800 to 2000x2000 pixels
                    </span>
                  </li>
                  <li className="text-white text-sm flex items-start">
                    <span className="mr-2">•</span>
                    <span style={{ fontFamily: 'Proxima Nova', fontWeight: 400 }}>
                      Text within the image must be clear and readable
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* File upload fields */}
          <div className="space-y-6">
            {/* Certificate of Registration */}
            <div>
              <label 
                className="block text-white text-sm mb-2"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                Certificate of Registration<span 
                  className="text-red-500"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="certificate"
                  accept=".jpg,.jpeg,.png,.heic,.heif"
                  onChange={(e) => handleFileChange('certificate', e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => handleUploadClick('certificate')}
                  className="block w-full p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                  style={{
                    backgroundColor: '#402E5C',
                    border: '2px solid #9569DB',
                    height: '52px',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-white"
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '10px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                    >
                      {certificateFile || 'Choose File'}
                    </span>
                    {certificateFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClearFile('certificate');
                        }}
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ backgroundColor: '#D20E56' }}
                      >
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Duly-adopted resolution */}
            <div>
              <label 
                className="block text-white text-sm mb-2"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                Duly-adopted resolution designating Authorized Representative or Special Power of Attorney / LOA<span 
                  className="text-red-500"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resolution"
                  accept=".jpg,.jpeg,.png,.heic,.heif"
                  onChange={(e) => handleFileChange('resolution', e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => handleUploadClick('resolution')}
                  className="block w-full p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                  style={{
                    backgroundColor: '#402E5C',
                    border: '2px solid #9569DB',
                    height: '52px',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-white"
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '10px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                    >
                      {resolutionFile || 'Choose File'}
                    </span>
                    {resolutionFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClearFile('resolution');
                        }}
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ backgroundColor: '#D20E56' }}
                      >
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </button>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div 
            className="bg-[#2C1D44] w-full max-w-sm"
            style={{
              borderTopLeftRadius: '40px',
              borderTopRightRadius: '40px',
              border: '2px solid transparent',
              background: 'linear-gradient(#2C1D44, #2C1D44) padding-box, linear-gradient(270deg, #9569DB 6.53%, #D20E56 91.73%) border-box',
              padding: '20px 0'
            }}
          >
            {/* Take Photo */}
            <button
              type="button"
              onClick={() => handleUploadOption('take-photo')}
              className="w-full py-4 px-6 text-white text-center hover:bg-gray-700 hover:bg-opacity-20 transition-colors"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              Take Photo
            </button>
            
            {/* Divider */}
            <div className="border-t border-white"></div>
            
            {/* Open Photo Library */}
            <button
              type="button"
              onClick={() => handleUploadOption('photo-library')}
              className="w-full py-4 px-6 text-white text-center hover:bg-gray-700 hover:bg-opacity-20 transition-colors"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              Open Photo Library
            </button>
            
            {/* Divider */}
            <div className="border-t border-white"></div>
            
            {/* Choose File */}
            <button
              type="button"
              onClick={() => handleUploadOption('choose-file')}
              className="w-full py-4 px-6 text-white text-center hover:bg-gray-700 hover:bg-opacity-20 transition-colors"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              Choose File
            </button>
            
            {/* Divider */}
            <div className="border-t border-white"></div>
            
            {/* Cancel */}
            <button
              type="button"
              onClick={handleModalClose}
              className="w-full py-4 px-6 text-white text-center hover:bg-gray-700 hover:bg-opacity-20 transition-colors"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportingDocuments;
