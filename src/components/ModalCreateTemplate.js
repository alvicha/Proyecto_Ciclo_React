import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from 'react';
import ScreensContext from '../screens/ScreensContext';
import { Dropdown } from 'primereact/dropdown';
import { createTemplate } from '../services/services';

const ModalCreateTemplate = ({ visibleModalCreateTemplate, setvisibleModalCreateTemplate, setVisibleSuccessDialog }) => {
    const [nameTemplate, setNameTemplate] = useState("");
    const { contextsList, setAlert, setVisibleAlert } = useContext(ScreensContext);
    const [selectedContextTemplate, setSelectedContextTemplate] = useState("");

    const handleContextTemplateChange = (event) => {
        setSelectedContextTemplate(event);
    };

    const createTemplateDB = async () => {
        try {
            const body = {
                code: nameTemplate,
                data: {
                    es: {
                        content: "",
                        subject: ""
                    },
                    en: {
                        content: "",
                        subject: ""
                    }
                },
                idContext: selectedContextTemplate.id
            };

            const response = await createTemplate(body, setAlert, setVisibleAlert);
            if (response) {
                setVisibleSuccessDialog(true);
                setvisibleModalCreateTemplate(false);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
            setAlert("Error al crear la plantilla: " + error.message);
            setVisibleAlert(true);
        }
    };

    const footerContent = (
        <div>
            <Button label="Añadir" icon="pi pi-plus" className='rounded-pill buttons mt-3' onClick={createTemplateDB} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Creación Plantilla"
                footer={footerContent}
                visible={visibleModalCreateTemplate}
                style={{ width: '50vw' }}
                onHide={() => setvisibleModalCreateTemplate(false)}
            >
                <div className="mt-3">
                    <label className='mr-3' htmlFor="firstname">Nombre Plantilla: </label>
                    <InputText className="mb-2 w-50" placeholder="Introduce nombre de plantilla" value={nameTemplate} onChange={(e) => setNameTemplate(e.target.value)} />
                </div>
                <div className="mt-3">
                    <label className='mr-3' htmlFor="firstname">Lista Contextos: </label>
                    <Dropdown
                        value={selectedContextTemplate}
                        onChange={(e) => handleContextTemplateChange(e.value)}
                        options={contextsList}
                        optionLabel="code"
                        placeholder="Contextos"
                        disabled={contextsList.length === 0}
                    />
                </div>
            </Dialog>
        </div>
    )
};

export default ModalCreateTemplate;
