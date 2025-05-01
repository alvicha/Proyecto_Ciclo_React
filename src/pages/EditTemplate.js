import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, updateTemplateApi, listTemplateById } from '../services/services';
import DropDownTemplate from '../components/DropdownTemplate';
import ScreensContext from '../screens/ScreensContext';
import ModalError from '../components/ModalError';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';

const EditTemplate = () => {
    const [nameTemplate, setNameTemplate] = useState("");
    const [subjectTemplate, setSubjectTemplate] = useState(null);
    const editorRef = useRef(null);
    const [codeLanguage, setCodeLanguage] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("");
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("");
    const [originalSubjectTemplate, setOriginalSubjectTemplate] = useState("");
    const toast = useRef(null);

    const { currentContent, setCurrentContent, setContext, setAlert, setVisibleAlert, visibleAlert, visibleActionButton, setVisibleActionButton, setContextsList, placeholdersList,
        setPlaceholdersList, templates, setTemplates, listLanguages, setListLanguages
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
                onChange: function (contents) {
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
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.log(error);
        }
    };

    const getSelectedTemplateEditor = async () => {
        try {
            const selectedLanguage = listLanguages.find(lang => lang.code === codeLanguage);
            const response = await listTemplateById(idTemplate.id, setAlert, setVisibleAlert);

            if (codeLanguage) {
                setSelectedTemplate(response);
                setNameTemplate(response.code);
                setSubjectTemplate(response.data[codeLanguage].subject);
                setOriginalSubjectTemplate(response.data[codeLanguage].subject);
                setSelectedTemplateContent(response.data[codeLanguage].content);

                if (!selectedLanguageDropdown) {
                    setSelectedLanguageDropdown(selectedLanguage.value);
                }
            } else {
                setCodeLanguage("es");
            }
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.log(error);
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
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error fetching contexts API:", error);
        }
    };


    /**
     * Función para que me devuelva la lista de variables dependiendo del contexto
     * @param {*} infoContext Contexto seleccionado 
     */
    const getPlaceholdersApi = async (idContext) => {
        try {
            const response = await getPlaceholdersContexts(idContext, setAlert, setVisibleAlert);
            if (response) {
                setPlaceholdersList(response);
            } else {
                setPlaceholdersList([]);
            }
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
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
            const currentContentSummernote = $(editorRef.current).summernote('code');
            setSelectedTemplateContent(currentContentSummernote);
            setOriginalSubjectTemplate(subjectTemplate);

            const updatedData = { ...selectedTemplate.data };

            //se actualizara solamente el contenido del idioma que hayamos seleccionado
            updatedData[codeLanguage] = {
                content: currentContentSummernote,
                subject: subjectTemplate
            };

            let body = {
                code: nameTemplate,
                data: updatedData
            };

            const response = await updateTemplateApi(selectedTemplate.id, body, setAlert, setVisibleAlert); //Función para actualizar los datos de la plantilla
            if (response) {
                toast.current.show({ severity: 'success', summary: 'Información', detail: 'Plantilla actualizada con éxito', life: 3000 });
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

    const onChangeSubjectTemplate = (event) => {
        setSubjectTemplate(event.target.value);
    };

    const cleanHTML = (html) => {
        return html.replace(/<br\s*\/?>/gi, '')
            .replace(/&nbsp;/gi, '')
            .replace(/\s+/g, '')
            .replace(/<[^>]*>/g, '')
            .trim();
    };

    const isTemplateModified = () => {
        const currentContentSummernote = $(editorRef.current).summernote('code');

        const cleanHtml = (html) => {
            const $html = $('<div>').html(html);

            // Elimina <br>, espacios vacíos y etiquetas sin texto
            $html.find('br').remove();
            $html.find('*').each(function () {
                if ($(this).text().trim() === '' && $(this).children().length === 0 && !$(this).is('img')) {
                    $(this).remove();
                }
            });

            return $html.html().trim();
        };

        const cleanedInitial = cleanHtml(selectedTemplateContent);
        const cleanedCurrent = cleanHtml(currentContentSummernote);

        return (
            cleanedInitial !== cleanedCurrent ||
            (subjectTemplate ?? "").trim() !== (originalSubjectTemplate ?? "").trim()
        );
    };

    useEffect(() => {
        if (selectedContextDropdown) {
            setNameTemplate("");
            setSubjectTemplate("")
            setSelectedTemplate("");
            setSelectedTemplateContent("");
            $(editorRef.current).summernote("code", "");
        }
    }, [selectedContextDropdown]);

    /**
     * Llama a las APIs de idiomas y contextos una vez al montar el componente.
     */
    useEffect(() => {
        languagesApi();
        contextsApi();
    }, []);

    useEffect(() => {
        if (listLanguages.length > 0) {
            getSelectedTemplateEditor();
        }
    }, [listLanguages]);

    useEffect(() => {
        if (listLanguages.length > 0 && !codeLanguage) {
            setCodeLanguage("es");
        }
    }, [listLanguages, codeLanguage]);

    /**
     * Cambia el idioma del editor cuando `codeLanguage` o `actionButtonUpdate` cambian.
     */
    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
    }, [codeLanguage, selectedTemplateContent]);

    useEffect(() => {
        if (isTemplateModified()) {
            setVisibleActionButton(true);
        } else {
            setVisibleActionButton(false);
        }
    }, [selectedTemplateContent, currentContent, subjectTemplate, originalSubjectTemplate]);

    return (
        <>
            <Toast ref={toast} />
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
                        setSubjectTemplate={setSubjectTemplate}
                        setOriginalSubjectTemplate={setOriginalSubjectTemplate}
                        isTemplateModified={isTemplateModified}
                    />
                </div>

                <div className="d-flex justify-content-center border border-success mt-2 p-2 rounded">
                    <label for="nameTemplate" className="font-weight-bold m-2">Nombre Plantilla:</label>
                    <input type="text" value={nameTemplate} onChange={onChangeNameTemplate}
                        className="form-control w-50" id="nameTemplate" aria-describedby="nameTemplate" placeholder="Introduce nombre de plantilla" readOnly />
                </div>

                <div className="d-flex justify-content-start mt-4 mb-3 p-2 rounded">
                    <label for="subjectTemplate" className="font-weight-bold m-2">Asunto:</label>
                    <input type="text" value={subjectTemplate} onChange={onChangeSubjectTemplate}
                        className="form-control w-50" id="subject" aria-describedby="subject" placeholder="Introduce asunto de plantilla" />
                </div>

                <div className="mb-3">
                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <div className="text-center mt-4">
                    <Button label="Actualizar Plantilla" aria-label="Actualizar" className="rounded-pill buttons" disabled={!visibleActionButton}
                        onClick={onUpdateTemplate} />
                </div>

                {visibleAlert && (
                    <ModalError />
                )}
            </div>
        </>
    );
};

export default EditTemplate; 