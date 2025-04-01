import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { getDataContexts, getTemplatesContexts } from "../services/services";
import ScreensContext from "../screens/ScreensContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const TableTemplatesList = () => {
    const navigate = useNavigate();
    const { contextsList, setContextsList, templates, setTemplates, setAlert, setVisibleAlert } = useContext(ScreensContext);
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const getContextsTemplates = async () => {
        try {
            const response = await getDataContexts(setAlert, setVisibleAlert);
            if (response) {
                setContextsList(response);
            } else {
                setContextsList([]);
            }
        } catch (error) {
            console.error("Error fetching contexts API:", error);
        }
    };

    const getTemplatesApi = async (context) => {
        try {
            const response = await getTemplatesContexts(context);
            setTemplates(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        getContextsTemplates();
    }, [templates]);


    return (
        <div className="card">
            <DataTable value={contextsList} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}>
                <Column field="id" header="Id" sortable style={{ width: '10%' }}></Column>
                <Column field="code" header="Contexto" sortable style={{ width: '15%' }}></Column>
                <Column field="" header="Nombre" sortable style={{ width: '15%' }}></Column>
                <Column field="representative.name" header="Asunto" sortable style={{ width: '20%' }}></Column>
                <Column field="representative.name" header="Contenido" sortable style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Acciones" sortable style={{ width: '20%' }}></Column>
            </DataTable>

            {templates && templates.length > 0 ? (
                <table className="table table-hover table-bordered">
                    <thead className="table-primary">
                        <tr>
                            <th>Id</th>
                            <th>Contexto</th>
                            <th>Nombre</th>
                            <th>Asunto</th>
                            <th>Contenido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => (
                            <tr key={template.id}>
                                <td>{template.id}</td>
                                <td onClick={() => console.log("Hola mundo")}>{template.nombre}</td>
                                <td>{template.correo}</td>
                                <td>{template.asunto}</td>
                                <td>{template.contenido}</td>
                                <td>
                                    <button className="btn btn-outline-secondary bg-success text-white">
                                        <i className="bi bi-eye"></i>
                                    </button>

                                    <button onClick={() => {
                                        navigate(`/template/${template.id}`);
                                    }} className="btn btn-outline-secondary bg-primary text-white mx-1">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                    <button className="btn btn-outline-secondary bg-danger text-white">
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) :
                <div className="alert alert-warning text-center mt-3">
                    <i className="bi bi-exclamation-triangle-fill mr-2"></i> No hay plantillas en este momento.
                </div>
            }
        </div>
    );
};

export default TableTemplatesList; 