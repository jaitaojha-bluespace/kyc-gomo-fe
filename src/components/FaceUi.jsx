import { useEffect } from "react";
import "@innovatrics/dot-auto-capture-ui/face";

function FaceUi(props) {
  useEffect(() => {
    const uiElement = document.getElementById(
      "x-dot-face-auto-capture-ui",
    );

    if (uiElement) {
      uiElement.props = props;
    }
  });

  return <x-dot-face-auto-capture-ui id="x-dot-face-auto-capture-ui" />;
}

export default FaceUi;
