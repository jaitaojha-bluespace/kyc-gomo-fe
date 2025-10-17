import SmileLivenessCamera from "./SmileLivenessCamera";
import SmileLivenessUi from "./SmileLivenessUi";
import React, { useState, useEffect } from "react";
import { submitUserSelfie } from "../services/UserSelfieApi";

function SmileLiveness({ onComplete }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [neutralImageUrl, setNeutralImageUrl] = useState(null);
  const [smileImageUrl, setSmileImageUrl] = useState(null);
  const [apiFailed, setApiFailed] = useState(false);

  // Cleanup preview URLs when component unmounts
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

  const handleOnComplete = async (imageData, content) => {
    setIsLoading(false);
    
    try {
      setIsSubmitting(true);
      
      // Validate input data structure
      if (!imageData) {
        throw new Error('No image data received from SmileLiveness');
      }
      
      if (!Array.isArray(imageData)) {
        throw new Error(`Expected imageData to be an array, but got ${typeof imageData}`);
      }
      
      if (imageData.length < 2) {
        throw new Error(`Expected at least 2 images, but got ${imageData.length}`);
      }
      
      // Validate array elements structure
      if (!imageData[0] || typeof imageData[0] !== 'object') {
        throw new Error('First image data is invalid or missing');
      }
      
      if (!imageData[1] || typeof imageData[1] !== 'object') {
        throw new Error('Second image data is invalid or missing');
      }
      
      const neutralImageBlob = imageData[0].image;
      const smileImageBlob = imageData[1].image;
      
      // Validate image blobs (presence and size)
      if (!neutralImageBlob) {
        throw new Error('Neutral image is missing');
      }
      
      if (!smileImageBlob) {
        throw new Error('Smile image is missing');
      }
      
      // Validate blob sizes
      if (neutralImageBlob.size === 0) {
        throw new Error('Neutral image is empty');
      }
      
      if (smileImageBlob.size === 0) {
        throw new Error('Smile image is empty');
      }
      
      // basic info validation done above
      
      // Create preview URLs immediately
      const neutralPreviewUrl = URL.createObjectURL(neutralImageBlob);
      const smilePreviewUrl = URL.createObjectURL(smileImageBlob);
      setNeutralImageUrl(neutralPreviewUrl);
      setSmileImageUrl(smilePreviewUrl);

      // Convert images to base64
      const neutralBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(",")[1];
          if (!base64 || base64.length < 100) {
            reject(new Error('Invalid image data'));
          } else {
            resolve(base64);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read image'));
        reader.readAsDataURL(neutralImageBlob);
      });
      
      const smileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(",")[1];
          if (!base64 || base64.length < 100) {
            reject(new Error('Invalid image data'));
          } else {
            resolve(base64);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read image'));
        reader.readAsDataURL(smileImageBlob);
      });
      
      // Get session ID with validation
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        throw new Error('Session ID is required for userSelfie API - please restart the registration process');
      }
      
      // Create payload with validation
      const payload = {
        neutralImage: neutralBase64,
        smileImage: smileBase64
      };
      
      // Final payload validation
      if (!payload.neutralImage || !payload.smileImage) {
        throw new Error('Missing neutral or smile image data in payload - validation failed');
      }
      
      // API call
      try {
        await submitUserSelfie(payload, { sessionId });
        setIsSubmitting(false);
        
        // Call onComplete with the original data
        if (onComplete) {
          onComplete(imageData, content);
        }
      } catch (apiError) {
        // API failed but show images with error
        setApiFailed(true);
        setIsSubmitting(false);
        setError(apiError);
        return;
      }
      
    } catch (err) {
      // Other errors (validation, FileReader, etc.)
      setError(err);
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = (error) => {
    setError(error);
    setIsLoading(false);
  };


  // Show error state
  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "20px",
        textAlign: "center",
        color: "#fff",
        minHeight: "300px"
      }}>
        <div style={{ fontSize: "18px", marginBottom: "10px", color: "#ff6b6b" }}>
          ⚠️ {apiFailed ? "API Error" : "Image Processing Error"}
        </div>
        <div style={{ 
          fontSize: "14px", 
          color: "#ccc", 
          marginBottom: "20px",
          maxWidth: "400px",
          lineHeight: "1.4"
        }}>
          {error.message || "An unexpected error occurred while processing your images"}
        </div>
        
        {/* Show preview images if API failed */}
        {apiFailed && (neutralImageUrl || smileImageUrl) && (
          <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {neutralImageUrl && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div style={{
                  fontSize: "12px",
                  color: "#888",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}>
                  Neutral Image
                </div>
                <img
                  src={neutralImageUrl}
                  alt="Neutral face capture"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ff6b6b",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
                  }}
                />
              </div>
            )}
            
            {smileImageUrl && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div style={{
                  fontSize: "12px",
                  color: "#888",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}>
                  Smile Image
                </div>
                <img
                  src={smileImageUrl}
                  alt="Smile face capture"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ff6b6b",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
                  }}
                />
              </div>
            )}
          </div>
        )}
        
        <div style={{ 
          fontSize: "12px", 
          color: "#888", 
          marginBottom: "20px",
          fontStyle: "italic"
        }}>
          {apiFailed ? "Images captured but submission failed. Please try again." : "Please try capturing your images again"}
        </div>
        <button 
          onClick={() => {
            setError(null);
            setApiFailed(false);
            setNeutralImageUrl(null);
            setSmileImageUrl(null);
            setIsLoading(true);
            setIsSubmitting(false);
          }}
          style={{
            padding: "12px 24px",
            backgroundColor: "#D20E56",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {(isLoading || isSubmitting) && (
        <>
        <SmileLivenessUi showCameraButtons={true} disabled={isSubmitting} />
        <SmileLivenessCamera
          onComplete={handleOnComplete}
          onError={handleError}
        />  
        </>
      )}
      
    </div>
  );
}

export default SmileLiveness;
