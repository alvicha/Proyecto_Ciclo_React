import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import FiltersTemplateList from '../components/FiltersTemplateList';
import TableTemplatesList from '../components/TableTemplatesList';

const TemplatesList = () => {
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
                <FiltersTemplateList />
                <TableTemplatesList />
            </div>

        </div>
    );
};

export default TemplatesList; 