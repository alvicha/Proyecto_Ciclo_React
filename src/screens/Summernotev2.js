import { useEffect, useState, useRef, useCallback } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, getTemplatesContexts, updateTemplateApi, postDataTemplate } from '../services/services';
import DropDownTemplate from '../components/DropdownTemplate';

const SummernoteEditorv2 = (props) => {
    const [textName, setTextName] = useState('');
    const [codeLanguage, setCodeLanguage] = useState("es");
    const editorRef = useRef(null);
    const [listLanguages, setListLanguages] = useState([]);
    const [contexts, setContexts] = useState([]);
    const [placeholdersList, setPlaceholdersList] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);
    const [codeTemplate, setCodeTemplate] = useState("");

    const handleInfoLanguage = (languageCode) => {
        if (templates && templates.length > 0) {
            let selectedTemplate = templates.find(template => template.code === codeTemplate);

            if (selectedTemplate.data[languageCode]) {
                setSelectedTemplateContent(selectedTemplate.data[languageCode].content)
            }
        }
    }

    const handleInfoContext = (infoContext) => {
        console.log("Codigo: ", infoContext.code);
    }

    const changeSummernoteLanguage = useCallback((lang) => {
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
        }).summernote("code", selectedTemplateContent)
    }, [selectedTemplateContent]);



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
            console.error("Error fetching languages:", error);
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
            let contentTemplate = $(editorRef.current).summernote('code');
            setSelectedTemplate(contentTemplate);

            let body = {
                code: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            const response = await postDataTemplate(body);
            console.log(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const onUpdateTemplate = async (event) => {
        try {
            event.preventDefault();
            let contentTemplate = $(editorRef.current).summernote('code');
            setSelectedTemplateContent(contentTemplate);

            let body = {
                idTemplate: selectedTemplate.id,
                codeLanguage: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            console.log("Mi cuerpo es: ", body);
            const response = await updateTemplateApi(body);
            console.log(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        languagesApi();
        contextsApi();
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
    }, [codeLanguage, changeSummernoteLanguage]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Editor de Texto con Summernote</h2>
            <form onSubmit={onClickData}>
                <div>
                    <label className="m-2">
                        Nombre:
                    </label>
                    <input type="text" value={textName} placeholder="Introduce un nombre" />
                </div>
                <div className="w-100 bg-success mt-4 p-1 rounded">
                    <DropDownTemplate
                        listLanguages={listLanguages}
                        contexts={contexts}
                        templates={templates}
                        setSelectedTemplate={setSelectedTemplate}
                        setSelectedTemplateContent={setSelectedTemplateContent}
                        setCodeLanguage={setCodeLanguage}
                        selectedTemplateContent={selectedTemplateContent}
                        handleInfoLanguage={handleInfoLanguage}
                    />
                </div>

                <div className="form-group mb-3">
                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <div className="mb-2">
                    <input type="submit" value="Enviar" className="btn btn-primary" />
                </div>
                <button className="btn btn-primary" onClick={onUpdateTemplate}>Actualizar Plantilla</button>
            </form>
        </div>
    );
};

export default SummernoteEditorv2; 