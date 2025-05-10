import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const PreviewFinalTemplate = () => {
    const navigate = useNavigate();
    const { previewFinalTemplate, idTemplate } = useContext(ScreensContext);

    return (
        <div className="container-fluid">
            <div className="row my-5">
                <div className="col-12">
                    <Button
                        icon="pi pi-arrow-left"
                        className="rounded-pill buttons"
                        severity="secondary"
                        aria-label="Bookmark"
                        onClick={() => {
                            navigate(`/template/${idTemplate}`)
                        }}
                    />
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="card shadow-sm rounded-lg p-1" style={{ maxWidth: '800px', width: '100%' }}>
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