import { useContext, useRef, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { Button } from "primereact/button";
import ModalSendEmailTemplate from "./ModalSendEmailTemplate";
import { Toast } from "primereact/toast";

const PreviewFinalTemplate = ({ setvisiblePreviewFinalTemplate }) => {
    const { previewFinalTemplate } = useContext(ScreensContext);
    const [visibleModalSendEmail, setVisibleModalSendEmail] = useState(false);
    const toast = useRef(null);

    const sendEmail = async () => {
        setVisibleModalSendEmail(true);
    };

    return (
        <div className="container-fluid">
            <Toast ref={toast} />
            <div className="d-flex justify-content-between mt-2">
                <Button icon="pi pi-arrow-left" label="Volver" className="rounded-pill buttons mt-4" onClick={() => setvisiblePreviewFinalTemplate(false)} />
                <Button icon="pi pi-envelope" label="Prueba Envio" className="rounded-pill buttons mt-4" onClick={sendEmail} />
            </div>
            <div className="row my-4">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="card rounded shadow-sm rounded-lg pt-3" style={{ width: '77%' }}>
                        <div className="card-body">
                            <h3 className="card-title font-weight-bold pb-2 title-subject text-primary">
                                {previewFinalTemplate.subject}
                            </h3>
                            <hr />
                            <div
                                className="card-text text-dark mt-4"
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