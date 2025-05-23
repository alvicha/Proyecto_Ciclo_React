import { useContext, useRef, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { Button } from "primereact/button";
import ModalSendEmailTemplate from "./ModalSendEmailTemplate";
import { Toast } from "primereact/toast";

const PreviewFinalTemplate = ({ setvisiblePreviewFinalTemplate }) => {
    const { previewFinalTemplate, containerRef } = useContext(ScreensContext);
    const [visibleModalSendEmail, setVisibleModalSendEmail] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [iconDark, setIconDark] = useState("pi pi-moon");

    const toast = useRef(null);

    const sendEmail = async () => {
        setVisibleModalSendEmail(true);
    };

    const changeDarkMode = async () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        setIconDark(newMode ? 'pi pi-sun' : 'pi pi-moon');
        containerRef.current.classList.toggle('dark-mode');
    };

    return (
        <div className="container-fluid">
            <Toast ref={toast} />
            <div className="d-flex justify-content-between mt-2">
                <Button icon="pi pi-arrow-left" label="Volver" className="rounded-pill buttons mt-4" aria-label="Volver"
                    onClick={() => setvisiblePreviewFinalTemplate(false)} />
                <Button icon={iconDark} className="rounded-pill buttons mt-4" aria-label="Icono modo oscuro"
                    onClick={changeDarkMode} />
                <Button icon="pi pi-envelope" label="Prueba Envio" className="rounded-pill buttons mt-4" aria-label="Prueba email"
                    onClick={sendEmail} />
            </div>
            <div className="row my-5">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="template-container card rounded shadow-sm rounded-lg pt-3" style={{ maxWidth: '83%' }} ref={containerRef}>
                        <div className="card-body">
                            <h3 className="font-weight-bold pb-2 title-subject">
                                {previewFinalTemplate.subject}
                            </h3>
                            <hr />
                            <div
                                className="card-text mt-4"
                                dangerouslySetInnerHTML={{ __html: previewFinalTemplate.rendered }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                visibleModalSendEmail && (
                    <ModalSendEmailTemplate toast={toast} previewFinalTemplate={previewFinalTemplate} visibleModalSendEmail={visibleModalSendEmail} setVisibleModalSendEmail={setVisibleModalSendEmail} />
                )
            }
        </div>
    );
};

export default PreviewFinalTemplate; 