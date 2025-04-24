import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import FiltersTemplateList from '../components/FiltersTemplateList';
import TableTemplatesList from '../components/TableTemplatesList';
import { useContext } from 'react';
import ScreensContext from '../screens/ScreensContext';
import { getDataContexts } from '../services/services';

const TemplatesList = () => {
    const { setTemplates, setContextsList, setAlert, setVisibleAlert } = useContext(ScreensContext);

    const getContextsTemplates = async () => {
        let updatedTemplates = [];
        try {
            const response = await getDataContexts(setAlert, setVisibleAlert);
            if (!response || response.length === 0) {
                setContextsList([]);
                return;
            }

            setContextsList(response);

            for (const context of response) {
                for (const template of context.templates) {
                    updatedTemplates.push({
                        ...template,
                        context: context?.code,
                        contentText: template.data?.es?.content?.replace(/<[^>]+>/g, ''),
                    });
                }
            }
            setTemplates(updatedTemplates);
        } catch (error) {
            setAlert("Ha habido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error fetching contexts API:", error);
        }
    };

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
                <FiltersTemplateList getContextsTemplates={getContextsTemplates} />
                <TableTemplatesList getContextsTemplates={getContextsTemplates} />
            </div>

        </div>
    );
};

export default TemplatesList; 