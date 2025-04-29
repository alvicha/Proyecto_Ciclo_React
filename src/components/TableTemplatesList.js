import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { deleteTemplateDB } from "../services/services";
import ScreensContext from "../screens/ScreensContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ModalShowTemplate from "./ModalShowTemplate";
import ModalCreateTemplate from "./ModalCreateTemplate";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ModalError from "./ModalError";

const TableTemplatesList = ({ filterDataTemplates }) => {
    const navigate = useNavigate();
    const { totalRecordsTemplates, loading, selectedSortOrder, setSelectedSortOrder, selectedColumnTable, setSelectedColumnTable, currentPage, templates, setAlert, visibleAlert, setVisibleAlert, setCurrentPage, rows, setRows } = useContext(ScreensContext);
    const [showModalDataTemplate, setShowModalDataTemplate] = useState(false);
    const [visibleModalCreateTemplate, setvisibleModalCreateTemplate] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const toast = useRef(null);

    const accept = async (idTemplate) => {
        try {
            const response = await deleteTemplateDB(idTemplate, setAlert, setVisibleAlert);
            await filterDataTemplates();

            if (response) {
                toast.current.show({ severity: 'success', summary: 'Información', detail: 'Plantilla eliminada con éxito', life: 3000 });
                console.log("deuidgyuegdyueg", toast)
            }
        } catch (error) {
            console.error("Error deleting templates API:", error);
        }
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'No se ha eliminado', life: 3000 });
    }

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

    const onShowDataTemplate = async (template) => {
        setSelectedTemplate(template);
        setShowModalDataTemplate(true);
    }

    const onCreateModalTemplate = () => {
        setvisibleModalCreateTemplate(true);
    }

    const onPage = (event) => {
        setRows(event.rows);
        const newPage = event.first / event.rows;
        setCurrentPage(newPage);
    };

    console.log(selectedColumnTable);

    //const templatesToDisplay = filteredTemplates.length > 0 ? filteredTemplates : templates;

    return (
        <div className="card mb-3 ml-1">
            <div className="d-flex align-items-center text-left bg-white border p-2">
                <Button label="Crear" icon="pi pi-plus" aria-label="Crear" className="rounded-pill buttons" onClick={onCreateModalTemplate} />
            </div>

            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable
                value={templates} first={currentPage * rows} showGridlines paginator rows={rows} onPage={onPage} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                lazy paginatorLeft={paginatorLeft} loading={loading} paginatorRight={paginatorRight} paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                totalRecords={totalRecordsTemplates} sortField={selectedColumnTable} sortOrder={selectedSortOrder}
                onSort={(e) => {
                    setSelectedColumnTable(e.sortField);
                    setSelectedSortOrder(e.sortOrder);
                    filterDataTemplates();
                }}
                emptyMessage="No se han encontrado registros">
                <Column field="id" header="Id" sortable style={{ width: '5%' }}></Column>
                <Column field="context"
                    body={(rowData) => rowData.context || "No hay contexto"}
                    header="Contexto"
                    sortable
                    style={{ width: '5%' }}>
                </Column>
                <Column field="code" header="Nombre" body={(rowData) => rowData.code || "No hay nombre"} sortable style={{ width: '5%' }}></Column>
                <Column
                    field="subject"
                    header="Asunto"
                    style={{ width: '20%' }}
                    body={(rowData) => rowData.data.es.subject || "No hay asunto"}
                />
                <Column
                    field="content"
                    header="Contenido"
                    body={(rowData) => rowData.contentText || "No hay contenido"}
                    style={{ width: '30%' }}
                />
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

            {
                showModalDataTemplate && (
                    <ModalShowTemplate selectedTemplate={selectedTemplate} showModalDataTemplate={showModalDataTemplate} setShowModalDataTemplate={setShowModalDataTemplate} />
                )
            }

            {
                visibleModalCreateTemplate && (
                    <ModalCreateTemplate visibleModalCreateTemplate={visibleModalCreateTemplate} filterDataTemplates={filterDataTemplates} setvisibleModalCreateTemplate={setvisibleModalCreateTemplate} toast={toast} />
                )
            }

            {
                visibleAlert && (
                    <ModalError />
                )
            }
        </div >
    );
};

export default TableTemplatesList; 