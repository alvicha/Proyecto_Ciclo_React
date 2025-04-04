import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ModalShowTemplate = ({ selectedTemplate, showModalDataTemplate, setShowModalDataTemplate }) => {

    const footerContent = (
        <div>
            <Button label="Salir" icon="pi pi-sign-out" onClick={() => setShowModalDataTemplate(false)} />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header={selectedTemplate.code} footer={footerContent} visible={showModalDataTemplate} style={{ width: '50vw' }} onHide={() => { if (!showModalDataTemplate) return; setShowModalDataTemplate(false); }}>
                <ul class="list-unstyled m-2">
                    <li class="mb-3">
                        <strong><img src="./images/context.jpg" alt="Icono de contexto" width="30" className='mr-3 my-2' />Contexto: </strong>{selectedTemplate?.context || "No hay contexto"}
                    </li>
                    <li class="mb-3">
                        <strong><img src="./images/subject.jpg" alt="Icono de asunto de correo" width="30" className='mr-3 my-2' />Asunto: </strong> {selectedTemplate?.data?.es?.subject || "No hay asunto"}
                    </li>
                    <li className="mb-3">
                        <div className="d-flex">
                            <div>
                                <img src="./images/content.jpg" alt="Icono de contexto" width="30" className='mr-3 my-2' />
                            </div>
                            <div>
                                <strong>
                                    Contenido:
                                </strong> {selectedTemplate?.contentText || "No hay contenido"}
                            </div>
                        </div>
                    </li>
                </ul>
            </Dialog>
        </div>
    )
};

export default ModalShowTemplate; 