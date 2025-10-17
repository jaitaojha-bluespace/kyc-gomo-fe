import { useEffect } from "react";
import "@innovatrics/dot-smile-liveness"; // This line is crucial as it registers the custom HTML element

const SmileLivenessCamera = (props) => {
  useEffect(() => {
    const smileLivenessHTMLElement = document.getElementById(
      "x-dot-smile-liveness"
    );

    if (smileLivenessHTMLElement) {
      // Set props and configuration with higher resolution requirements
      const cameraOptions = {
        ...props,
        video: {
          width: { min: 1280, ideal: 1920, max: 1920 },
          height: { min: 720, ideal: 1080, max: 1080 },
          frameRate: { min: 15, ideal: 30, max: 60 }
        }
      };
      smileLivenessHTMLElement.props = cameraOptions;
      
      // Set attributes for freemium mode
      smileLivenessHTMLElement.setAttribute('cameraFacing', 'user');
      smileLivenessHTMLElement.setAttribute('captureMode', 'smile');
      
      // Add event listeners
      const handleComplete = (event) => {
        console.log('SmileLiveness complete event:', event.detail);
        if (props.onComplete) {
          props.onComplete(event.detail.imageData, event.detail.content);
        }
      };

      const handleError = (event) => {
        console.error('SmileLiveness error event:', event.detail);
        if (props.onError) {
          props.onError(event.detail);
        }
      };

      smileLivenessHTMLElement.addEventListener('complete', handleComplete);
      smileLivenessHTMLElement.addEventListener('error', handleError);

      // Cleanup
      return () => {
        smileLivenessHTMLElement.removeEventListener('complete', handleComplete);
        smileLivenessHTMLElement.removeEventListener('error', handleError);
      };
    }
  }, [props]);

  return <x-dot-smile-liveness id="x-dot-smile-liveness" />;
};

export default SmileLivenessCamera;
