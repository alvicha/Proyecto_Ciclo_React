import { useContext, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { InputText } from 'primereact/inputtext';
import ModalCreateTemplate from "./ModalCreateTemplate";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const FiltersTemplateList = () => {
    const { contextsList } = useContext(ScreensContext);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);
    const [visibleDropDown, setVisibleDropDown] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [optionContext, setOptionContext] = useState(null);
    const [nameTemplate, setNameTemplate] = useState("");

    const onHandleButton = () => {
        const dropDownState = !visibleDropDown;
        setVisibleDropDown(dropDownState);
    }

    const handleClearData = () => {
        setNameTemplate("");
        setOptionContext("");
        setIsDisabled(true);
    }

    return (
        <div className="mb-4 border ml-1">
            <div className="d-flex justify-content-start filters pt-2 pl-2">
                <i className={visibleDropDown ? "bi bi-chevron-down fa-xl mr-4" : "bi bi-chevron-up fa-xl mr-4"} onClick={onHandleButton}></i>
                <p className="filter-text">Filtros</p>
            </div>

            {visibleDropDown && (
                <div className="bg-white border-top p-3">
                    <div className="d-flex">
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
                        <div>
                            <p className="filter-text text-left">Buscar</p>
                            <InputText value={nameTemplate} placeholder="Nombre/Contenido/Asunto" onChange={(e) => setNameTemplate(e.target.value)} style={{ width: "450px" }} />
                        </div>
                    </div>
                    <div className="text-left mt-2">
                        <Button label="Limpiar" icon="pi pi-times-circle" aria-label="Limpiar" disabled={isDisabled} className="rounded-pill" onClick={handleClearData} style={{ backgroundColor: "#18787F", color: "white" }} />
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