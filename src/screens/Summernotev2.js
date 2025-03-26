import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, updateTemplateApi, postDataTemplate } from '../services/services';
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
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("Contextos");
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("Idioma");
    const [codeTemplate, setCodeTemplate] = useState("");
    const [actionButtonUpdate, setActionButtonUpdate] = useState(false);
    const { setContext } = useContext(ScreensContext);

    /**
     * Esta función sirve para cargar el menu del editor con las opciones deseadas
     */
    const changeSummernoteLanguage = useCallback((lang) => {
        setContext(editorRef);
        $(editorRef.current).summernote("destroy");
        $(editorRef.current).summernote({
            placeholder: "Introduce una descripción",
            height: 400,
            lang: lang,
            toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ['fontname', ['fontname']],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ['insert', ['picture']],
            ],
            fontNames: ['Sans Serif', 'Serif', 'Monospace'],
            fontNamesIgnoreCheck: ['Sans Serif', 'Serif', 'Monospace'],
            addDefaultFonts: false,
        }).summernote("code", selectedTemplateContent);
    }, [selectedTemplateContent, setContext]);

    /**
     * Función para que me devuelva la lista de idiomas que hay en la base de datos
     */
    const languagesApi = async () => {
        try {
            const response = await getDataApi();
            setListLanguages(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    /**
     * Función para que me devuelva la lista de contextos de la BD
     */
    const contextsApi = async () => {
        try {
            const response = await getDataContexts();
            setContexts(response);
        } catch (error) {
            console.error("Error fetching contexts API:", error);
        }
    };


    /**
     * Función para que me devuelva la lista de variables dependiendo del contexto
     * @param {*} infoContext Contexto seleccionado 
     */
    const getPlaceholdersApi = async (infoContext) => {
        try {
            const response = await getPlaceholdersContexts(infoContext);
            setPlaceholdersList(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    /**
     * Función para añadir una plantilla y almacenarla en la base de datos mediante una llamada a la API
     * @param {*} event Evento del clic en el botón de guardar
     */
    const onClickData = async (event) => {
        try {
            event.preventDefault();
            const currentContent = $(editorRef.current).summernote('code');
            setSelectedTemplateContent(currentContent);

            let body = {
                code: nameTemplate,
                data: {
                    content: currentContent,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            console.log("Mi cuerpo es: ", body)
            const response = await postDataTemplate(body);
            console.log("Añadiendo plantilla con respuesta: ", response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    /**
     * Función para actualizar una plantilla en la base de datos con llamada a la API
     * @param {*} event Evento del clic en el botón de actualizar plantilla
     */
    const onUpdateTemplate = async (event) => {
        try {
            event.preventDefault();
            const currentContent = $(editorRef.current).summernote('code');
            setSelectedTemplateContent(currentContent);

            let body = {
                idTemplate: selectedTemplate.id,
                codeLanguage: codeLanguage,
                data: {
                    content: currentContent,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            console.log("Mi cuerpo es: ", body)
            const response = await updateTemplateApi(body); //Función para actualizar los datos de la plantilla
            console.log("Actualizado plantilla con ID: ", selectedTemplate.id + "y la respuesta es: ", response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    /**
     * Función para actualizar el estado del nombre de la plantilla constantemente
     * @param {Event} event - Evento del input.
     */
    const onChangeNameTemplate = (event) => {
        setNameTemplate(event.target.value);
    };

    /**
     * Llama a las APIs de idiomas y contextos al montar el componente.
     */
    useEffect(() => {
        languagesApi();
        contextsApi();
    }, []); // Se ejecuta solo una vez al montar el componente


    /**
     * Cambia el idioma del editor cuando `codeLanguage` o `actionButtonUpdate` cambian.
     */
    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
    }, [codeLanguage, changeSummernoteLanguage, actionButtonUpdate]);


    /**
    * Verifica si el nombre de la plantilla ha cambiado y actualiza el estado del botón.
    */
    useEffect(() => {
        const currentContent = $(editorRef.current).summernote('code');

        if (nameTemplate !== codeTemplate) {
            setActionButtonUpdate(false);
        } else {
            setActionButtonUpdate(true);
        }
        setSelectedTemplateContent(currentContent);
    }, [nameTemplate, codeTemplate, selectedTemplateContent]);

    return (
        <div className="container mt-5">
            <h2 className="mb-5">Editor de Texto con Summernote</h2>
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
                    actionButtonUpdate={actionButtonUpdate}
                />
            </div>

            <div className="form-group d-flex justify-content-center border border-success mt-2 mb-2 p-2 rounded">
                <label for="nameTemplate" className="fw-bold m-2">Nombre Plantilla:</label>
                <input type="text" value={nameTemplate} onChange={onChangeNameTemplate}
                    className="form-control w-50" id="nameTemplate" aria-describedby="nameTemplate" placeholder="Introduce nombre de plantilla" />
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
        </div>
    );
};

export default SummernoteEditorv2; 