import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const ModalError = () => {
    const { alert, visibleAlert, setVisibleAlert } = useContext(ScreensContext);

    const footerContent = (
        <div>
            <Button label="Cerrar" className="rounded-pill buttons" icon="pi pi-sign-out" onClick={() => setVisibleAlert(false)} />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog visible={visibleAlert} modal header="Error" footer={footerContent} style={{ width: '50rem' }} onHide={() => { if (!visibleAlert) return; setVisibleAlert(false); }}>
                <p className="m-0">
                    {alert}
                </p>
            </Dialog>
        </div>
    )
}

export default ModalError;