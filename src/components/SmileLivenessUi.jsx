import { useEffect } from "react";
import "@innovatrics/dot-auto-capture-ui/smile-liveness";

function SmileLivenessUi(props) {
  useEffect(() => {
    const uiElement = document.getElementById("x-dot-smile-liveness-ui");

    if (uiElement) {
      uiElement.props = props;
    }
  }, [props]);

  return <x-dot-smile-liveness-ui id="x-dot-smile-liveness-ui" />;
}

export default SmileLivenessUi;
