import "@innovatrics/dot-auto-capture-ui/document";
import { useEffect } from "react";

function DocumentUi(props) {
  useEffect(() => {
    const uiElement = document.getElementById("x-dot-document-auto-capture-ui");

    if (uiElement) {
      uiElement.props = props;
    }
  }, [props]);

  return <x-dot-document-auto-capture-ui id="x-dot-document-auto-capture-ui" />;
}

export default DocumentUi;
