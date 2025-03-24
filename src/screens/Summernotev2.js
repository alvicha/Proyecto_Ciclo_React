import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, updateTemplateApi } from '../services/services';
import DropDownTemplate from '../components/DropdownTemplate';
import ScreensContext from './ScreensContext';

const SummernoteEditorv2 = () => {
    const [nameTemplate, setNameTemplate] = useState("");
    const [codeLanguage, setCodeLanguage] = useState("es");
    const editorRef = useRef(null);
    const [listLanguages, setListLanguages] = useState([]);
    const [contexts, setContexts] = useState([]);
    const [placeholdersList, setPlaceholdersList] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("Contextos");
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("Idioma");
    const [codeTemplate, setCodeTemplate] = useState(null);
    const [actionButtonUpdate, setActionButtonUpdate] = useState(false);
    const { setContext } = useContext(ScreensContext);

    const changeSummernoteLanguage = useCallback((lang) => {
        setContext(editorRef);
        $(editorRef.current).summernote("destroy");
        $(editorRef.current).summernote({
            placeholder: "Introduce una descripción",
            height: 300,
            lang: lang,
            toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
            ],
        }).summernote("code", selectedTemplateContent);
    }, [selectedTemplateContent, setContext]);


    const languagesApi = async () => {
        try {
            const response = await getDataApi();
            setListLanguages(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const contextsApi = async () => {
        try {
            const response = await getDataContexts();
            setContexts(response);
        } catch (error) {
            console.error("Error fetching contexts API:", error);
        }
    };

    const getPlaceholdersApi = async (infoContext) => {
        try {
            const response = await getPlaceholdersContexts(infoContext);
            setPlaceholdersList(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const onClickData = async (event) => {
        try {
            event.preventDefault();
            /*
            let body = {
                code: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            const response = await postDataTemplate(body);
            console.log(response);
*/
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const onUpdateTemplate = async (event) => {
        try {
            event.preventDefault();
            let contentTemplate = selectedTemplateContent;
            setSelectedTemplateContent(contentTemplate);

            let body = {
                idTemplate: selectedTemplate.id,
                codeLanguage: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            console.log("Mi cuerpo es: ", body)
            const response = await updateTemplateApi(body);
            console.log(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const handleNameTemplateChange = (event) => {
        setNameTemplate(event.target.value);
    };

    useEffect(() => {
        languagesApi();
        contextsApi();
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
        console.log("Codigo: ", codeTemplate);

        if (codeTemplate !== null) {
            setNameTemplate(codeTemplate);
        }
    }, [codeLanguage, changeSummernoteLanguage, codeTemplate, actionButtonUpdate, selectedTemplateContent]);

    return (
        <div className="container mt-5">
            <h2 className="mb-5">Editor de Texto con Summernote</h2>
            <form onSubmit={onClickData}>
                <div className="w-100 bg-info mt-4 p-1 rounded">
                    <DropDownTemplate
                        listLanguages={listLanguages}
                        setListLanguages={setListLanguages}
                        contexts={contexts}
                        templates={templates}
                        setTemplates={setTemplates}
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        selectedTemplateContent={selectedTemplateContent}
                        setSelectedTemplateContent={setSelectedTemplateContent}
                        contextDropDown={selectedContextDropdown}
                        setContextDropDown={setSelectedContextDropdown}
                        codeLanguage={codeLanguage}
                        setCodeLanguage={setCodeLanguage}
                        selectedLanguageDropdown={selectedLanguageDropdown}
                        setSelectedLanguageDropdown={setSelectedLanguageDropdown}
                        placeholdersList={placeholdersList}
                        getPlaceholdersApi={getPlaceholdersApi}
                        nameTemplate={nameTemplate}
                        setNameTemplate={setNameTemplate}
                        setCodeTemplate={setCodeTemplate}
                        setActionButtonUpdate={setActionButtonUpdate}
                    />
                </div>

                <div className="form-group d-flex justify-content-center border border-success mt-2 p-2 mb-2 p-4 rounded">
                    <label for="nameTemplate" className="fw-bold m-2">Nombre Plantilla:</label>
                    <input type="text" value={nameTemplate} onChange={handleNameTemplateChange} className="form-control w-50" id="nameTemplate" aria-describedby="nameTemplate" placeholder="Introduce nombre de plantilla" />
                </div>

                <div className="form-group mb-3">
                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <div className="mb-2">
                    <button
                        className="btn btn-primary"
                        onClick={actionButtonUpdate ? onUpdateTemplate : onClickData}
                    >
                        {actionButtonUpdate ? "Actualizar Plantilla" : "Guardar Nueva Plantilla"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SummernoteEditorv2; 