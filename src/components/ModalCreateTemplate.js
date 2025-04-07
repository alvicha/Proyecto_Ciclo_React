import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const ModalCreateTemplate = ({ visibleModalCreateTemplate, setvisibleModalCreateTemplate }) => {
    const [nameTemplate, setNameTemplate] = useState("");

    const footerContent = (
        <div>
            <Button label="Añadir" icon="pi pi-plus" className='rounded-pill buttons mt-3' onClick={() => setvisibleModalCreateTemplate(false)} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Crear Plantilla" footer={footerContent} visible={visibleModalCreateTemplate} style={{ width: '50vw' }} onHide={() => { if (!visibleModalCreateTemplate) return; setvisibleModalCreateTemplate(false); }}>
                <div className="align-items-center mt-3">
                    <label className='mr-3' htmlFor="firstname">Nombre Plantilla: </label>
                    <InputText value={nameTemplate} onChange={(e) => setNameTemplate(e.target.value)} />
                </div>
            </Dialog>
        </div>
    )
};

export default ModalCreateTemplate; 