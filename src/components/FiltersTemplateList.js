import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const FiltersTemplateList = () => {

    const { contextsList } = useContext(ScreensContext);

    return (
        <div className="row mb-5 mt-2 d-flex justify-content-between align-items-center">
            <div className="col-1">
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-plus"></i>Crear
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

                <div className="col-10 d-flex justify-content-center align-items-center py-4">
                    <div className="flex">
                        <IconField iconPosition="left">
                            <InputIcon aria-label="Buscar" className="pi pi-search" onClick={() => console.log("Hola mundo")}></InputIcon>
                            <InputText placeholder="Buscar..." className="w-100" />
                        </IconField>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltersTemplateList; 