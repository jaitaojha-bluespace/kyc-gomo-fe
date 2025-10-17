import "@innovatrics/dot-face-auto-capture";
import { useEffect } from "react";
/*
 * When component is initiliazed, sam.wasm file will be fetched from http://localhost:3000/sam.wasm.
 * That's why sam.wasm file need to be placed in root of public folder.
 */

function FaceCamera(props) {
  useEffect(() => {
    // 2. Init existed custom web-component
    const faceAutoCaptureHTMLElement = document.getElementById(
      "x-dot-face-auto-capture",
    );

    if (faceAutoCaptureHTMLElement) {
      // Configure camera with higher resolution requirements for Innovatrics
      const cameraOptions = {
        ...props,
        video: {
          width: { min: 1280, ideal: 1920, max: 1920 },
          height: { min: 720, ideal: 1080, max: 1080 },
          frameRate: { min: 15, ideal: 30, max: 60 }
        }
      };
      faceAutoCaptureHTMLElement.cameraOptions = cameraOptions;
    }
  });

  // 1. Return empty custom web-component html TAG
  return <x-dot-face-auto-capture id="x-dot-face-auto-capture" />;
}

export default FaceCamera;
