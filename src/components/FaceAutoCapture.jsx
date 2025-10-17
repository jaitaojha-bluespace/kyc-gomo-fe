import FaceCamera from "./FaceCamera";
import FaceUi from "./FaceUi";
import React, { useState, useEffect } from "react";


function FaceAutoCapture({ onPhotoTaken, onError, onBackClick }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePhotoTaken = async (imageData, content) => {
    setIsButtonDisabled(false);
    onPhotoTaken(imageData, content);
  };

  const handleContinueDetection = () => {
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION,
    );

    setIsButtonDisabled(true);
  };

  return (
    <>
    <div style={{ position: "relative", overflow: "hidden" }}>   
      <FaceCamera
          cameraFacing="user"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <FaceUi showCameraButtons />
    </div>
    </>
  );
}

export default FaceAutoCapture;