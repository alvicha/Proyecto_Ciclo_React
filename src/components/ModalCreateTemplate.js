import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useContext, useEffect, useState } from 'react';
import ScreensContext from '../screens/ScreensContext';
import { Dropdown } from 'primereact/dropdown';
import { createTemplate, getDataApi } from '../services/services';

const ModalCreateTemplate = ({ visibleModalCreateTemplate, setvisibleModalCreateTemplate, filterDataTemplates, toast }) => {
    const { contextsList, setAlert, setVisibleAlert, listLanguages, setListLanguages } = useContext(ScreensContext);
    const [nameTemplate, setNameTemplate] = useState("");
    const [selectedContextTemplate, setSelectedContextTemplate] = useState("");

    const handleContextTemplateChange = (event) => {
        setSelectedContextTemplate(event);
    };

    const languagesApi = async () => {
        try {
            const response = await getDataApi(setAlert, setVisibleAlert);
            if (response) {
                setListLanguages(response);
            } else {
                setListLanguages([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createTemplateDB = async () => {
        try {
            let data = {};
            listLanguages.forEach(lang => {
                data[lang.code] = {
                    content: "",
                    subject: ""
                };
            });

            const body = {
                code: nameTemplate,
                data: data,
                idContext: selectedContextTemplate.id
            };

            const response = await createTemplate(body, setAlert, setVisibleAlert);
            if (response) {
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Plantilla creada con éxito' });
                setvisibleModalCreateTemplate(false);
                await filterDataTemplates();
            }
        } catch (error) {
            setAlert("Error al crear la plantilla: " + error.message);
            setVisibleAlert(true);
            console.error("Error fetching templates:", error);
        }
    };

    useEffect(() => {
        languagesApi();
    }, []);

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
    );

};

export default ModalCreateTemplate;
