import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";

const PreviewFinalTemplate = () => {
    const { previewFinalTemplate } = useContext(ScreensContext);

    return (
        <div>
            <h1>{previewFinalTemplate.subject}</h1>
            <div dangerouslySetInnerHTML={{ __html: previewFinalTemplate.rendered }} /> {/* Renderiza el HTML de 'rendered' */}
        </div>
    );
};

export default PreviewFinalTemplate; 