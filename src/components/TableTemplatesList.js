import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDataContexts, getTemplatesContexts } from "../services/services";
import ScreensContext from "../screens/ScreensContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ModalShowTemplate from "./ModalShowTemplate";

const TableTemplatesList = () => {
    const navigate = useNavigate();
    const { contextsList, setContextsList, templates, setTemplates, setAlert, setVisibleAlert } = useContext(ScreensContext);
    const [showModalDataTemplate, setShowModalDataTemplate] = useState(false);
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
        <div className="card">
            <div className="d-flex align-items-center text-left bg-white border p-2">
                <Button label="Crear" icon="pi pi-plus" aria-label="Crear" className="rounded-pill filter-text" style={{ backgroundColor: "#18787F", color: "white" }} />
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
                <Column header="Acciones" sortable style={{ width: '25%' }} body={(rowData) => (
                    <div>
                        <button className="btn btn-outline-secondary bg-success text-white" onClick={() => onShowDataTemplate(rowData)}>
                            <i className="bi bi-eye"></i>
                        </button>

                        <button onClick={() => {
                            navigate(`/template/${rowData.id}`)
                        }} className="btn btn-outline-secondary bg-primary text-white mx-1">
                            <i className="bi bi-pencil-square"></i>
                        </button>

                        <button className="btn btn-outline-secondary bg-danger text-white">
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                )} />
            </DataTable>

            {showModalDataTemplate && (
                <ModalShowTemplate selectedTemplate={selectedTemplate} showModalDataTemplate={showModalDataTemplate} setShowModalDataTemplate={setShowModalDataTemplate} />
            )}
        </div>
    );
};

export default TableTemplatesList; 