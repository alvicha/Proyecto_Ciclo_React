import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import FiltersTemplateList from '../components/FiltersTemplateList';
import TableTemplatesList from '../components/TableTemplatesList';
import { useContext, useEffect, useState } from 'react';
import { filterInfoTemplate, getDataContexts } from '../services/services';
import ScreensContext from '../screens/ScreensContext';

const TemplatesList = () => {
    const { setContextsList, setTemplates, currentPage, setTotalRecordsTemplates, rows, setAlert, setVisibleAlert } = useContext(ScreensContext);

    const [optionContext, setOptionContext] = useState(null);
    const [nameTemplateSearch, setNameTemplateSearch] = useState("");

    const filterDataTemplates = async () => {
        let data;
        try {
            data = {
                search: nameTemplateSearch || null,
                context: optionContext?.code || null,
                page: currentPage,
                rows: rows
            }
            await contextsApi();

            const response = await filterInfoTemplate(setAlert, setVisibleAlert, data);
            console.log("Respuesta: ", response);

            if (response) {
                const cleanTemplates = response.templates.map(template => ({
                    ...template,
                    contentText: template.data?.es?.content?.replace(/<[^>]+>/g, '')
                }));
                setTemplates(cleanTemplates);
                setTotalRecordsTemplates(response.total);
            }
        } catch (error) {
            console.error("Error al filtrar plantillas:", error);
        }
    }

    const contextsApi = async () => {
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

    useEffect(() => {
        filterDataTemplates();
    }, [nameTemplateSearch, optionContext, currentPage, rows]);

    return (
        <div>
            <h1 style={{
                textAlign: 'center',
                marginTop: '20px',
                fontSize: '40px',
                fontWeight: '600',
                color: '#333',
                letterSpacing: '0.5px',
                transition: 'border-color 0.3s ease, color 0.3s ease',
                paddingBottom: '40px',
                paddingTop: '40px',
            }}
                onMouseOver={(e) => {
                    e.target.style.color = '#007bff';
                }}
                onMouseOut={(e) => {
                    e.target.style.color = '#333';
                }} >
                Listado de Plantillas
            </h1>
            <hr style={{
                width: "30%",
                height: "2px",
                backgroundColor: "#007bff",
                border: "none",
                margin: "0 auto",
            }} />

            <div className='mt-5 m-1'>
                <FiltersTemplateList nameTemplateSearch={nameTemplateSearch}
                    setNameTemplateSearch={setNameTemplateSearch}
                    optionContext={optionContext}
                    setOptionContext={setOptionContext}
                    filterDataTemplates={filterDataTemplates}
                />
                <TableTemplatesList filterDataTemplates={filterDataTemplates} />
            </div>

        </div>
    );
};

export default TemplatesList; 