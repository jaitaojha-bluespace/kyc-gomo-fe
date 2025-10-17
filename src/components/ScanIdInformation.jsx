import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import DocumentAutoCapture from './DocumentAutoCapture';
import SmileLiveness from './SmileLiveness';
import { trackDocumentCapture, trackSmileLiveness } from '../config/analytics';

const ScanIdInformation = ({ onNext }) => {
  const navigate = useNavigate();
  const [showDocumentCapture, setShowDocumentCapture] = useState(false);
  const [documentCaptured, setDocumentCaptured] = useState(false);
  const [documentPreviewUrl, setDocumentPreviewUrl] = useState("");
  const [documentCaptureFailed, setDocumentCaptureFailed] = useState(false);
  const [captureErrorMessage, setCaptureErrorMessage] = useState("");
  const [showSmileLiveness, setShowSmileLiveness] = useState(false);
  const [smileLivenessCompleted, setSmileLivenessCompleted] = useState(false);
  const [neutralImageUrl, setNeutralImageUrl] = useState(null);
  const [smileImageUrl, setSmileImageUrl] = useState(null);

  // Cleanup image URLs when component unmounts
  useEffect(() => {
    return () => {
      if (neutralImageUrl) {
        URL.revokeObjectURL(neutralImageUrl);
      }
      if (smileImageUrl) {
        URL.revokeObjectURL(smileImageUrl);
      }
    };
  }, [neutralImageUrl, smileImageUrl]);

  const handleScanId = () => {
    setShowDocumentCapture(true);
  };

  const handlePhotoTaken = (imageData, content) => {
    try {
      trackDocumentCapture('Id Scanned Successfully', true);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
    
    // Create preview URL from the captured image
    if (imageData?.image instanceof Blob) {
      const previewUrl = URL.createObjectURL(imageData.image);
      setDocumentPreviewUrl(previewUrl);
    } else if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      setDocumentPreviewUrl(imageData);
    }
    
    setDocumentCaptured(true);
    setShowDocumentCapture(false);
  };

  const handleError = (error, imageData) => {
    console.error('Document capture error:', error);
    try {
      trackDocumentCapture('Document Capture Failed', false);
    } catch (analyticsError) {
      console.warn('Analytics tracking failed:', analyticsError);
    }
    
    // Create preview URL even for failed captures
    if (imageData?.image instanceof Blob) {
      const previewUrl = URL.createObjectURL(imageData.image);
      setDocumentPreviewUrl(previewUrl);
    } else if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      setDocumentPreviewUrl(imageData);
    }
    
    setCaptureErrorMessage(error);
    setDocumentCaptureFailed(true);
    setShowDocumentCapture(false);
  };

  const handleBackClick = () => {
    setShowDocumentCapture(false);
  };

  const handleNext = () => {
    console.log('Moving to smile liveness...');
    setShowSmileLiveness(true);
  };


  const handleSmileLivenessComplete = (imageData, content) => {
    try {
      trackSmileLiveness('SmileLiveness Completed Successfully', true);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
    
    // Create preview URLs for both images
    if (Array.isArray(imageData) && imageData.length >= 2) {
      if (imageData[0]?.image instanceof Blob) {
        const neutralUrl = URL.createObjectURL(imageData[0].image);
        setNeutralImageUrl(neutralUrl);
      }
      if (imageData[1]?.image instanceof Blob) {
        const smileUrl = URL.createObjectURL(imageData[1].image);
        setSmileImageUrl(smileUrl);
      }
    }
    
    setSmileLivenessCompleted(true);
    setShowSmileLiveness(false);
  };

  const handleSmileLivenessError = (error) => {
    console.error('SmileLiveness error:', error);
    try {
      trackSmileLiveness('SmileLiveness Failed', false);
    } catch (analyticsError) {
      console.warn('Analytics tracking failed:', analyticsError);
    }
  };

  const handleSmileLivenessBack = () => {
    setShowSmileLiveness(false);
  };

  const handlePersonalInformationNext = () => {
    if (onNext) {
      onNext();
    } else {
      navigate('/personal-information');
    }
  };


  if (showDocumentCapture) {
    return (
      <DocumentAutoCapture
        onPhotoTaken={handlePhotoTaken}
        onError={handleError}
        onBackClick={handleBackClick}
      />
    );
  }


  if (showSmileLiveness) {
    return (
      <SmileLiveness
        onComplete={handleSmileLivenessComplete}
        onError={handleSmileLivenessError}
        onBackClick={handleSmileLivenessBack}
      />
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Content */}
      <div className="space-y-4 sm:space-y-6">
        {/* Section Title */}
        <div className="text-center px-2">
          <h2
            className="text-white text-lg sm:text-xl whitespace-nowrap"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
          >
            Scan your government-issued ID
          </h2>
          <p
            className="mt-3 text-gray-300 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: 'Proxima Nova' }}
          >
            Make sure that the photo and the information on your ID are clearly seen
          </p>
          <p
            className="text-gray-300 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: 'Proxima Nova' }}
          >
            Avoid using IDs with manually attached photos.
          </p>
        </div>

        {/* Success Messages */}
        {documentCaptured && !smileLivenessCompleted && (
          <div className="text-center px-2">
            <div 
              className="text-green-400 text-lg font-semibold mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 600
              }}
            >
              ✅ Document captured successfully
            </div>
            <p 
              className="text-gray-300 text-sm"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              Your document has been processed and saved.
            </p>
            
            {/* Document Preview */}
            {documentPreviewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={documentPreviewUrl}
                  alt="Captured document"
                  className="max-w-full h-auto rounded-lg border border-gray-600"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Error Messages */}
        {documentCaptureFailed && !documentCaptured && (
          <div className="text-center px-2">
            <div 
              className="text-red-400 text-lg font-semibold mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 600
              }}
            >
              ❌ Document capture failed
            </div>
            <p 
              className="text-gray-300 text-sm mb-4"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              {captureErrorMessage || 'Please try again with a clearer image.'}
            </p>
            
            {/* Document Preview for failed capture */}
            {documentPreviewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={documentPreviewUrl}
                  alt="Captured document (failed validation)"
                  className="max-w-full h-auto rounded-lg border border-red-500"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
            
            {/* Retry Button */}
            <div className="mt-4">
              <Button 
                type="button" 
                className="w-full sm:w-auto"
                onClick={() => {
                  setDocumentCaptureFailed(false);
                  setCaptureErrorMessage("");
                  setDocumentPreviewUrl("");
                  setShowDocumentCapture(true);
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {smileLivenessCompleted && (
          <div className="text-center px-2">
            <div 
              className="text-green-400 text-lg font-semibold mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 600
              }}
            >
              ✅ SmileLiveness completed successfully
            </div>
            <p 
              className="text-gray-300 text-sm mb-4"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400
              }}
            >
              Your smile liveness has been verified.
            </p>
            
            {/* Image Preview Container */}
            {(neutralImageUrl || smileImageUrl) && (
              <div className="flex justify-center gap-4 mb-4 flex-wrap">
                {/* Neutral Image */}
                {neutralImageUrl && (
                  <div className="flex flex-col items-center">
                    <div 
                      className="text-gray-400 text-xs mb-2 font-medium"
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 500
                      }}
                    >
                      Neutral Image
                    </div>
                    <img
                      src={neutralImageUrl}
                      alt="Neutral face capture"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-green-400 shadow-lg"
                    />
                  </div>
                )}
                
                {/* Smile Image */}
                {smileImageUrl && (
                  <div className="flex flex-col items-center">
                    <div 
                      className="text-gray-400 text-xs mb-2 font-medium"
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 500
                      }}
                    >
                      Smile Image
                    </div>
                    <img
                      src={smileImageUrl}
                      alt="Smile face capture"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-green-400 shadow-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 mt-6 sm:mt-8">
        {!documentCaptured ? (
          <div className="flex justify-center">
            <Button 
              type="button" 
              className="w-full sm:w-auto"
              onClick={handleScanId}
            >
              Scan your ID
            </Button>
          </div>
        ) : !smileLivenessCompleted ? (
          <div className="flex justify-center">
            <Button 
              type="button" 
              className="w-full sm:w-auto"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              type="button" 
              className="w-full sm:w-auto"
              onClick={handlePersonalInformationNext}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanIdInformation;


