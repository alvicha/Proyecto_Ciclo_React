import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDataContexts, getTemplatesContexts } from "../services/services";
import ScreensContext from "../screens/ScreensContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ModalShowTemplate from "./ModalShowTemplate";
import ModalCreateTemplate from "./ModalCreateTemplate";

const TableTemplatesList = () => {
    const navigate = useNavigate();
    const { contextsList, setContextsList, templates, setTemplates, setAlert, setVisibleAlert } = useContext(ScreensContext);
    const [showModalDataTemplate, setShowModalDataTemplate] = useState(false);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const getContextsTemplates = async () => {
        try {
            const response = await getDataContexts(setAlert, setVisibleAlert);
            if (!response) {
                setContextsList([]);
            }

            setContextsList(response);
        } catch (error) {
            console.error("Error fetching contexts API:", error);
        }
    };

    const onShowDataTemplate = (template) => {
        setSelectedTemplate(template);
        setShowModalDataTemplate(true);
    }

    const onCreateModalTemplate = () => {
        setvisibleModalCreateTemplate(true);
    }

    const getTemplatesList = async () => {
        try {
            const updatedTemplates = [];

            for (let i = 0; i < contextsList.length; i++) {
                const response = await getTemplatesContexts(contextsList[i].code);

                if (response && response.length > 0) {
                    const templatesContext = response.map(template => ({
                        ...template,
                        context: contextsList[i].code,
                        contentText: template.data?.es?.content.replace(/<[^>]+>/g, '') || "No hay contenido",
                    }));
                    updatedTemplates.push(...templatesContext);
                }
            }
            setTemplates(updatedTemplates);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        getContextsTemplates();
    }, []);

    useEffect(() => {
        if (contextsList.length > 0) {
            getTemplatesList();
        }
    }, [contextsList]);

    return (
        <div className="card ml-1">
            <div className="d-flex align-items-center text-left bg-white border p-2">
                <Button label="Crear" icon="pi pi-plus" aria-label="Crear" className="rounded-pill filter-text" onClick={onCreateModalTemplate} style={{ backgroundColor: "#18787F", color: "white" }} />
            </div>

            <DataTable value={templates} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} emptyMessage="No hay plantillas disponibles">
                <Column field="id" header="Id" sortable style={{ width: '5%' }}></Column>
                <Column field="context" header="Contexto" sortable style={{ width: '5%' }}></Column>
                <Column field="code" header="Nombre" sortable style={{ width: '5%' }}></Column>
                <Column
                    field="data.es.subject"
                    header="Asunto"
                    sortable
                    style={{ width: '20%' }}
                    body={(rowData) => rowData.data?.es?.subject || "No hay asunto"}
                />
                <Column
                    field="contentText"
                    header="Contenido"
                    sortable
                    style={{ width: '30%' }} />
                <Column header="Acciones" sortable style={{ width: '20%' }} body={(rowData) => (
                    <div className="d-flex w-100 h-25">
                        <Button icon="pi pi-eye" className="rounded-pill mr-1" outlined severity="help" aria-label="Visualización" onClick={() => onShowDataTemplate(rowData)} />
                        <Button icon="pi pi-pen-to-square" className="rounded-pill mr-1" outlined severity="info" aria-label="Edicion" onClick={() => {
                            navigate(`/template/${rowData.id}`)
                        }} />
                        <Button icon="pi pi-trash" className="rounded-pill mr-1" outlined severity="danger" aria-label="Eliminacion" onClick={() => {
                            console.log("Hola mundo");
                        }} />
                    </div>
                )} />
            </DataTable>

            {showModalDataTemplate && (
                <ModalShowTemplate selectedTemplate={selectedTemplate} showModalDataTemplate={showModalDataTemplate} setShowModalDataTemplate={setShowModalDataTemplate} />
            )}

            {visibleModalCreateTemplate && (
                <ModalCreateTemplate visibleModalCreateTemplate={visibleModalCreateTemplate} setvisibleModalCreateTemplate={setvisibleModalCreateTemplate} />
            )}
        </div>
    );
};

export default TableTemplatesList; 