import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { deleteTemplateDB, getDataContexts, getTemplatesContexts, listContextById } from "../services/services";
import ScreensContext from "../screens/ScreensContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ModalShowTemplate from "./ModalShowTemplate";
import ModalCreateTemplate from "./ModalCreateTemplate";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ModalError from "./ModalError";
import { Dialog } from "primereact/dialog";

const TableTemplatesList = () => {
    const navigate = useNavigate();
    const { contextsList, setContextsList, filteredTemplates, templates, setTemplates, setAlert, visibleAlert, setVisibleAlert, setCurrentPage, rows, setRows } = useContext(ScreensContext);
    const [pageTable, setPageTable] = useState(false);
    const [showModalDataTemplate, setShowModalDataTemplate] = useState(false);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [visibleSuccessDialog, setVisibleSuccessDialog] = useState(false);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const toast = useRef(null);

    const accept = async (idTemplate) => {
        try {
            console.log("Id seleccionado: ", idTemplate);
            await deleteTemplateDB(idTemplate, setAlert, setVisibleAlert);
            toast.current.show({ severity: 'info', summary: 'Información', detail: 'Plantilla eliminada con éxito', life: 3000 });
        } catch (error) {
            console.error("Error fetching contexts API:", error);
        }
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Operación cancelada', life: 3000 });
    }

    const footerContent = (
        <div>
            <Button label="Aceptar" className='rounded-pill buttons mt-3' icon="pi pi-check" onClick={() => setVisibleSuccessDialog(false)} autoFocus />
        </div>
    );

    const onDeleteTemplate = (idTemplate) => {
        confirmDialog({
            message: '¿Estás seguro que desea eliminar esta plantilla?',
            header: 'Eliminación Plantilla',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => accept(idTemplate),
            reject
        });
    };

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

    const onShowDataTemplate = async (template) => {
        setSelectedTemplate(template);
        setShowModalDataTemplate(true);
    }

    const onCreateModalTemplate = () => {
        setvisibleModalCreateTemplate(true);
    }

    const getTemplatesList = async () => {
        let updatedTemplates = [];

        try {
            for (let i = 0; i < contextsList.length; i++) {
                const response = await getTemplatesContexts(contextsList[i].id);

                if (response && response.length > 0) {
                    for (const template of response) {
                        try {
                            const responseContexts = await listContextById(template.idContext);
                            updatedTemplates.push({
                                ...template,
                                context: responseContexts?.code || "No hay contexto",
                                contentText: template.data?.es?.content?.replace(/<[^>]+>/g, '') || "No hay contenido"
                            });
                        } catch (err) {
                            console.error(`Error al obtener el contexto del template ID ${template.id}:`, err);
                        }
                    }
                }
                setTemplates(updatedTemplates);
            }
        } catch (error) {
            setAlert("Ha habido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        getContextsTemplates();
    }, []);

    useEffect(() => {
        if (filteredTemplates.length === 0) {
            getTemplatesList();
        }
    }, [contextsList]);

    const handlePageChange = (event) => {
        setPageTable(event.first)
        setRows(event.rows);
        const currentPage = event.first / event.rows;
        setCurrentPage(currentPage);
    };

    const templatesToDisplay = filteredTemplates.length > 0 ? filteredTemplates : templates;

    return (
        <div className="card mb-3 ml-1">
            <div className="d-flex align-items-center text-left bg-white border p-2">
                <Button label="Crear" icon="pi pi-plus" aria-label="Crear" className="rounded-pill buttons" onClick={onCreateModalTemplate} />
            </div>

            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={templatesToDisplay} first={pageTable} showGridlines paginator rows={rows} onPage={handlePageChange} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} emptyMessage="No se han encontrado registros">
                <Column field="id" header="Id" sortable style={{ width: '5%' }}></Column>
                <Column field="context" header="Contexto" sortable style={{ width: '5%' }}></Column>
                <Column field="code" header="Nombre" sortable style={{ width: '5%' }}></Column>
                <Column
                    field="data"
                    header="Asunto"
                    style={{ width: '20%' }}
                    body={(rowData) => rowData.data?.es?.subject || "No hay asunto"}
                />
                <Column
                    field="contentText"
                    header="Contenido"
                    style={{ width: '30%' }} />
                <Column header="Acciones" style={{ width: '20%' }} body={(rowData) => (
                    <div className="d-flex w-100 h-25">
                        <Button icon="pi pi-eye" className="rounded-pill mr-1" outlined severity="help" aria-label="Visualización" onClick={() => onShowDataTemplate(rowData)} />
                        <Button icon="pi pi-pen-to-square" className="rounded-pill mr-1" outlined severity="info" aria-label="Edicion" onClick={() => {
                            navigate(`/template/${rowData.id}`)
                        }} />
                        <Button icon="pi pi-trash" className="rounded-pill mr-1" outlined severity="danger" aria-label="Eliminacion" onClick={() => onDeleteTemplate(rowData.id)} />
                    </div>
                )} />
            </DataTable>

            {showModalDataTemplate && (
                <ModalShowTemplate selectedTemplate={selectedTemplate} showModalDataTemplate={showModalDataTemplate} setShowModalDataTemplate={setShowModalDataTemplate} />
            )}

            {visibleModalCreateTemplate && (
                <ModalCreateTemplate visibleModalCreateTemplate={visibleModalCreateTemplate} setvisibleModalCreateTemplate={setvisibleModalCreateTemplate} setVisibleSuccessDialog={setVisibleSuccessDialog} />
            )}

            {visibleAlert && (
                <ModalError />
            )}

            <Dialog
                header="Información"
                footer={footerContent}
                visible={visibleSuccessDialog}
                style={{ width: '50vw' }}
                onHide={() => setVisibleSuccessDialog(false)}
            >
                <p className="m-0">¡La plantilla se ha creado con éxito!</p>
            </Dialog>
        </div>
    );
};

export default TableTemplatesList; 