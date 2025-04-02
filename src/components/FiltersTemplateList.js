import { useContext, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import ModalCreateTemplate from "./ModalCreateTemplate";

const FiltersTemplateList = () => {
    const { contextsList } = useContext(ScreensContext);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);

    return (
        <div className="row mb-5w d-flex justify-content-between align-items-center">
            <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={() => setvisibleModalCreateTemplate(true)}>
                    <i className="bi bi-plus"></i>Crear Plantilla
                </button>
            </div>

            <div className="col-4 d-flex align-items-center justify-content-end">
                <button className="btn btn-secondary dropdown-toggle mr-4"
                    href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Contextos

                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {contextsList.map((context) => (
                        <button
                            className="dropdown-item"
                            key={context.code}
                            aria-labelledby="dropdownMenuLink"
                        >
                            {context.code}
                        </button>
                    ))}
                </div>

                <div className="col-9 d-flex justify-content-center align-items-center py-4">
                    <div className="flex">
                        <IconField iconPosition="left">
                            <InputIcon aria-label="Buscar" className="pi pi-search" onClick={() => console.log("Hola mundo")}></InputIcon>
                            <InputText placeholder="Buscar..." className="w-100" />
                        </IconField>
                    </div>
                </div>
            </div>

            {visibleModalCreateTemplate && (
                <ModalCreateTemplate visibleModalCreateTemplate={visibleModalCreateTemplate} setvisibleModalCreateTemplate={setvisibleModalCreateTemplate} />
            )}
        </div>
    );
};

export default FiltersTemplateList; 