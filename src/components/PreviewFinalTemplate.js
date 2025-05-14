import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";
import { Button } from "primereact/button";

const PreviewFinalTemplate = ({ setvisiblePreviewFinalTemplate }) => {
    const { previewFinalTemplate } = useContext(ScreensContext);

    return (
        <div className="container-fluid">
            <Button icon="pi pi-arrow-left" label="Volver" className="rounded-pill buttons" onClick={() => setvisiblePreviewFinalTemplate(false)} />
            <div className="row my-5">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="card rounded shadow-sm rounded-lg pt-3" style={{ width: '77%' }}>
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold pb-2 text-primary">
                                {previewFinalTemplate.subject}
                            </h5>
                            <hr />
                            <div
                                className="card-text text-dark mt-4"
                                dangerouslySetInnerHTML={{ __html: previewFinalTemplate.rendered }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewFinalTemplate; 