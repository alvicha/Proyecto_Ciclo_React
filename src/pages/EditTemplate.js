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
import ScreensContext from '../screens/ScreensContext';
import ModalError from '../components/ModalError';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

const EditTemplate = () => {
    const [nameTemplate, setNameTemplate] = useState("");
    const [codeLanguage, setCodeLanguage] = useState("es");
    const editorRef = useRef(null);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("");
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("");
    const [visibleModalUpdate, setVisibleModalUpdate] = useState(null);
    const [currentContent, setCurrentContent] = useState("");


    const { setContext, setAlert, setVisibleAlert, visibleAlert, visibleActionButton, setVisibleActionButton, contextsList, setContextsList, placeholdersList,
        setPlaceholdersList, templates, setTemplates, setListLanguages
    } = useContext(ScreensContext);
    const idTemplate = useParams();

    /**
    * Esta función sirve para cargar el menu del editor con las opciones deseadas
    */
    const changeSummernoteLanguage = useCallback((lang) => {
        setContext(editorRef);
        setCurrentContent($(editorRef.current).summernote('code'));

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
            callbacks: {
                onInit: function () {
                    $(".note-editable").css("font-size", "12px");
                },
                onChange: function (contents, $editable) {
                    setCurrentContent(contents);
                }
            }
        }).summernote("code", selectedTemplateContent);
    }, [selectedTemplateContent, setContext]);

    /**
     * Función para que me devuelva la lista de idiomas que hay en la base de datos
     */
    const languagesApi = async () => {
        try {
            const response = await getDataApi(setAlert, setVisibleAlert);
            if (response) {
                setListLanguages(response);
            } else {
                setListLanguages([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSelectedTemplateEditor = () => {
        if (templates && templates.length > 0) {
            const template = templates.find(template =>
                template.id === Number(idTemplate.id)
            );

            if (template) {
                setSelectedTemplate(template);
                setNameTemplate(template.code);
                setSelectedTemplateContent(template.data?.es?.content);
            }
        }
    }

    /**
     * Función para que me devuelva la lista de contextos de la BD
     */
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


    /**
     * Función para que me devuelva la lista de variables dependiendo del contexto
     * @param {*} infoContext Contexto seleccionado 
     */
    const getPlaceholdersApi = async (idContext) => {
        try {
            const response = await getPlaceholdersContexts(idContext);
            if (response) {
                setPlaceholdersList(response);
            } else {
                setPlaceholdersList([]);
            }
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

            const updatedData = { ...selectedTemplate.data };

            //se actualizara solamente el contenido del idioma que hayamos seleccionado
            updatedData[codeLanguage] = {
                content: currentContent,
                subject: selectedTemplate?.data?.[codeLanguage]?.subject
            };

            let body = {
                code: nameTemplate,
                data: updatedData
            };
            console.log("Mi cuerpo es: ", body);

            const response = await updateTemplateApi(selectedTemplate.id, body, setAlert, setVisibleAlert); //Función para actualizar los datos de la plantilla
            if (response) {
                setVisibleModalUpdate(true);
            }
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
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
     * Llama a las APIs de idiomas y contextos una vez al montar el componente.
     */
    useEffect(() => {
        getSelectedTemplateEditor();
        languagesApi();
        contextsApi();
    }, []);

    /**
     * Cambia el idioma del editor cuando `codeLanguage` o `actionButtonUpdate` cambian.
     */
    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
    }, [codeLanguage, changeSummernoteLanguage]);

    useEffect(() => {
        console.log("ANTIGUO: ", selectedTemplateContent);
        console.log("MODERNO: ", currentContent);

        if (selectedTemplateContent !== currentContent) {
            setVisibleActionButton(true);
        } else {
            setVisibleActionButton(false);
        }
    }, [selectedTemplateContent, currentContent]);

    const footerContentModalUpdate = (
        <div>
            <Button label="Aceptar" className="buttons rounded-pill" icon="pi pi-check" onClick={() => setVisibleModalUpdate(false)} autoFocus />
        </div>
    );

    return (
        <>
            <div className="container mt-5 mb-5">
                <h1 className="mb-5" style={{
                    fontSize: '40px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#333',
                    transition: 'border-color 0.3s ease, color 0.3s ease',
                    paddingTop: '40px',
                }}
                    onMouseOver={(e) => {
                        e.target.style.color = '#007bff';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.color = '#333';
                    }} >
                    EDICIÓN PLANTILLAS
                </h1>

                <hr style={{
                    width: "30%",
                    height: "2px",
                    backgroundColor: "#007bff",
                    border: "none",
                    margin: "0 auto",
                }} />

                <div className="w-100 filters mt-5 p-1 rounded">
                    <DropDownTemplate
                        contexts={contextsList}
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
                    />
                </div>

                <div className="form-group d-flex justify-content-center border border-success mt-2 mb-2 p-2 rounded">
                    <label for="nameTemplate" className="font-weight-bold m-2">Nombre Plantilla:</label>
                    <input type="text" value={nameTemplate} onChange={onChangeNameTemplate}
                        className="form-control w-50" id="nameTemplate" aria-describedby="nameTemplate" placeholder="Introduce nombre de plantilla" readOnly />
                </div>

                <div className="form-group mb-3">
                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <div className="text-center mt-4">
                    <Button label="Actualizar Plantilla" aria-label="Actualizar" className="rounded-pill buttons" disabled={!visibleActionButton}
                        onClick={onUpdateTemplate} />
                </div>

                {visibleAlert && (
                    <ModalError />
                )}

                <Dialog visible={visibleModalUpdate} modal header="Información" footer={footerContentModalUpdate} style={{ width: '50rem' }} onHide={() => { if (!visibleModalUpdate) return; setVisibleModalUpdate(false); }}>
                    <p className="m-0">
                        Plantilla actualizada con éxito
                    </p>
                </Dialog>

            </div>
        </>
    );
};

export default EditTemplate; 