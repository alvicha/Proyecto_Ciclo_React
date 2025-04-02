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
                        <strong><img src="./images/context.png" width="30" className='mr-3 my-2' />Contexto: </strong>{selectedTemplate?.context || "No hay contexto"}
                    </li>
                    <li class="mb-3">
                        <strong><img src="./images/subject.png" width="30" className='mr-3 my-2' />Asunto: </strong> {selectedTemplate?.data?.es?.subject || "No hay asunto"}
                    </li>
                    <li className="mb-3">
                        <div className="d-flex ml-2">
                            <div className="">
                                <i className="bi bi-body-text"></i>
                            </div>
                            <div className='ml-4'>
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