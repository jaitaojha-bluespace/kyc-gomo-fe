import DocumentCamera from "./DocumentCamera";
import DocumentUi from "./DocumentUi";
import { useState, useEffect } from "react";
import { documentScan } from "../services/DocumentScanApi";

function DocumentAutoCapture({ onPhotoTaken, onError }) {
  const [isDocumentCaptured, setIsDocumentCaptured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const toBase64Payload = (imageData) => {
    if (!imageData) return "";

    // Case 1: data URL string
    if (typeof imageData === "string") {
      const commaIndex = imageData.indexOf(",");
      if (imageData.startsWith("data:") && commaIndex !== -1) {
        return imageData.substring(commaIndex + 1);
      }
      return imageData;
    }

    // Case 2: object with Blob/File at imageData.image (like your reference)
    if (typeof imageData === "object" && imageData?.image instanceof Blob) {
      return imageData.image; // return Blob for async handling in caller
    }

    return "";
  };

  const handlePhotoTaken = async (imageData, content) => {
    try {
      setIsUploading(true);

      const sessionId = localStorage.getItem("sessionId");
      
      const maybeBase64OrBlob = toBase64Payload(imageData);

      if (maybeBase64OrBlob instanceof Blob) {
        // Create immediate preview URL
        const objectURL = URL.createObjectURL(imageData?.image);
        setPreviewUrl(objectURL);

        // Convert Blob to base64
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageData.image);
          reader.onloadend = function () {
            const base64data = reader.result.split(",")[1];
            resolve(base64data);
          };
          reader.onerror = reject;
        });
        
        if (!base64 || base64.length < 100) {
          throw new Error("Invalid base64 image data");
        }
        
        const payload = { 
          image: base64,
          documentType: "ID_FRONT",
          locale: "en"
        };
        await documentScan(payload, { sessionId });
      } else {
        const imageBase64 = maybeBase64OrBlob;
        
        if (!imageBase64 || imageBase64.length < 100) {
          throw new Error("Invalid base64 image data");
        }
        
        const payload = { 
          image: imageBase64,
          documentType: "ID_FRONT",
          locale: "en"
        };
        await documentScan(payload, { sessionId });

        // Create data URL for preview
        const dataUrl = `data:image/jpeg;base64,${imageBase64}`;
        setPreviewUrl(dataUrl);
      }

      setIsDocumentCaptured(true);
      onPhotoTaken && onPhotoTaken(imageData, content);
    } catch (err) {
      const message = err?.body?.errors?.[0]?.displayMessage || err?.message || "Document scan failed. Please try again.";
      onError && onError(message, imageData);
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup preview URL object when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{ 
        position: "relative", 
        overflow: "hidden",
        width: "auto",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}>
      {!isDocumentCaptured && !isUploading && (
        <>
          <DocumentCamera
            cameraFacing="environment"
            onPhotoTaken={handlePhotoTaken}
            onError={onError}
          />
          <DocumentUi showCameraButtons disabled={isUploading} />
        </>
      )}

      {!isDocumentCaptured && isUploading && (
        <div style={{ 
          textAlign: "center", 
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#fff"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #333",
            borderTop: "4px solid #D20E56",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px"
          }}></div>
          <div style={{
            fontSize: "16px",
            fontFamily: "Proxima Nova",
            fontWeight: 400
          }}>
            Processing document...
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default DocumentAutoCapture;
