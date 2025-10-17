import "@innovatrics/dot-document-auto-capture";
import { useEffect } from "react";

function DocumentCamera(props) {
  useEffect(() => {
    const documentAutoCaptureHTMLElement = document.getElementById(
      "x-dot-document-auto-capture"
    );
    if (documentAutoCaptureHTMLElement) {
      // Configure camera with higher resolution requirements for Innovatrics
      const cameraOptions = {
        ...props,
        video: {
          width: { min: 1280, ideal: 1920, max: 1920 },
          height: { min: 720, ideal: 1080, max: 1080 },
          frameRate: { min: 15, ideal: 30, max: 60 }
        }
      };
      documentAutoCaptureHTMLElement.cameraOptions = cameraOptions;
    }
  }, [props]);

  return <x-dot-document-auto-capture id="x-dot-document-auto-capture" />;
}

export default DocumentCamera;
