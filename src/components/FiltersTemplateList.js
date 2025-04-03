import { useContext, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { InputText } from 'primereact/inputtext';
import ModalCreateTemplate from "./ModalCreateTemplate";
import { Dropdown } from "primereact/dropdown";

const FiltersTemplateList = () => {
    const { contextsList } = useContext(ScreensContext);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);
    const [visibleDropDown, setVisibleDropDown] = useState(false);
    const [optionContext, setOptionContext] = useState(null);
    const [nameTemplate, setNameTemplate] = useState("");


    const onHandleButton = () => {
        const dropDownState = !visibleDropDown;
        setVisibleDropDown(dropDownState);
    }

    return (
        <div className="mb-5 border ml-1">
            <div className="d-flex justify-content-start filters p-2">
                <i className={visibleDropDown ? "bi bi-chevron-down fa-xl mr-4" : "bi bi-chevron-up fa-xl mr-4"} onClick={onHandleButton}></i>
                <p className="filter-text">Filtros</p>
            </div>

            {visibleDropDown && (
                <div className="d-flex bg-white border-top p-3">
                    <div className="mr-5">
                        <p className="filter-text text-left">Contextos</p>
                        <Dropdown
                            value={optionContext}
                            onChange={(e) => setOptionContext(e.value)}
                            options={contextsList}
                            optionLabel="code"
                            placeholder="Seleccionar"
                            style={{ width: "500px", marginBottom: '15px', textAlign: "left" }}
                        />
                    </div>

                    <div className="">
                        <p className="filter-text text-left">Buscar</p>
                        <InputText value={nameTemplate} placeholder="Nombre/Contenido/Asunto" onChange={(e) => setNameTemplate(e.target.value)} style={{ width: "450px" }} />
                    </div>
                </div>
            )}

            {visibleModalCreateTemplate && (
                <ModalCreateTemplate visibleModalCreateTemplate={visibleModalCreateTemplate} setvisibleModalCreateTemplate={setvisibleModalCreateTemplate} />
            )}
        </div >
    );
};

export default FiltersTemplateList; 