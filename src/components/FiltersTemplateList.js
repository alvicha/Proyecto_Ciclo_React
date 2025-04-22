import { useContext, useEffect, useState } from "react";
import ScreensContext from "../screens/ScreensContext";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import '../pages/summernote.css'
import { Dialog } from "primereact/dialog";
import { filterInfoTemplate } from "../services/services";

const FiltersTemplateList = () => {
    const { contextsList, templates, setTemplates, filteredTemplates, setFilteredTemplates, currentPage, rows, setAlert, setVisibleAlert } = useContext(ScreensContext);
    const [visibleDropDown, setVisibleDropDown] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [optionContext, setOptionContext] = useState(null);
    const [nameTemplate, setNameTemplate] = useState("");
    const [visibleWarning, setVisibleWarning] = useState(false);

    const onHandleButton = () => {
        const dropDownState = !visibleDropDown;
        setVisibleDropDown(dropDownState);
    }

    const handleClearData = () => {
        setNameTemplate("");
        setOptionContext(null);
    }

    const filterDataTemplates = async () => {
        let filtered = [];
        let data;

        try {
            if (optionContext && optionContext.code) {
                data = {
                    nameTemplate: nameTemplate,
                    context: optionContext.code,
                    page: currentPage,
                    rows: rows
                }
            } else {
                data = {
                    nameTemplate: nameTemplate,
                    context: null,
                    page: currentPage,
                    rows: rows
                };
            }

            const response = await filterInfoTemplate(setAlert, setVisibleAlert, data);
            console.log(response);
        } catch (error) {
            console.error("Error al filtrar plantillas:", error);
        }
    }

    useEffect(() => {
        if (nameTemplate !== "" || optionContext !== null) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [optionContext, nameTemplate, isDisabled]);

    useEffect(() => {
        filterDataTemplates();
    }, [nameTemplate, optionContext, templates, currentPage, rows]);

    return (
        <div className="mb-4 border ml-1">
            <div className="d-flex justify-content-start filters pt-2 pl-2">
                <i className={visibleDropDown ? "bi bi-chevron-down fa-xl mr-4" : "bi bi-chevron-up fa-xl mr-4"} onClick={onHandleButton}></i>
                <p className="font-weight-bold">Filtros</p>
            </div>

            {visibleDropDown && (
                <div className="bg-white border shadow-sm p-3">
                    <div className="d-flex">
                        {Array.isArray(contextsList) && contextsList.length > 0 && (
                            <div className="mr-5">
                                <p className="font-weight-bold text-left">Contextos</p>
                                <Dropdown
                                    value={optionContext}
                                    onChange={(e) => setOptionContext(e.value)}
                                    options={[{ code: 'Todos' }, ...contextsList]}
                                    optionLabel="code"
                                    placeholder="Seleccionar..."
                                    style={{ width: "500px", marginBottom: '15px', textAlign: "left" }}
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-weight-bold text-left">Buscar</p>
                            <InputText value={nameTemplate} placeholder="Nombre" onChange={(e) => setNameTemplate(e.target.value)} style={{ width: "450px" }} />
                        </div>
                    </div>
                    <div className="text-left mt-2">
                        <Button label="Limpiar" icon="pi pi-times-circle" aria-label="Limpiar" disabled={isDisabled} className="rounded-pill buttons" onClick={handleClearData} />
                    </div>
                </div>
            )}

            {visibleWarning && (
                <Dialog header="Información" visible={visibleWarning} style={{ width: '50vw' }} onHide={() => { if (!visibleWarning) return; setVisibleWarning(false); }}>
                    <p className="m-0">
                        No ha habido resultados con este resultado
                    </p>
                </Dialog>
            )}
        </div >
    );
};

export default FiltersTemplateList;