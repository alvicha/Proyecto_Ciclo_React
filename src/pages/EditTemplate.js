import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, updateTemplateApi, listTemplateById, renderTemplatesFinal, uploadImageTemplateDB, getAllFontsDB } from '../services/services';
import DropDownTemplate from '../components/DropdownTemplate';
import ScreensContext from '../screens/ScreensContext';
import ModalError from '../components/ModalError';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { TailSpin } from 'react-loader-spinner';
import PreviewFinalTemplate from '../components/PreviewFinalTemplate';

const EditTemplate = () => {
    const [nameTemplate, setNameTemplate] = useState("");
    const [subjectTemplate, setSubjectTemplate] = useState("");
    const editorRef = useRef(null);
    const [codeLanguage, setCodeLanguage] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("");
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("");
    const [originalSubjectTemplate, setOriginalSubjectTemplate] = useState("");
    const [visiblePreviewFinalTemplate, setvisiblePreviewFinalTemplate] = useState(false);
    const [fontsNames, setFontsNames] = useState([]);
    const [infoFonts, setInfoFonts] = useState([]);
    const [allFontsList, setAllFontsList] = useState([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const toast = useRef(null); // Ref para mostrar mensajes toast
    const idTemplateParams = useParams();
    const hasLoadedTemplate = useRef(false);

    const { editorSummernote, currentContent, setCurrentContent, setAlert, setVisibleAlert, visibleAlert, visibleActionButton, setVisibleActionButton, setContextsList, placeholdersList,
        setPlaceholdersList, templates, setTemplates, listLanguages, setListLanguages, fieldsDisabled, loadingEditor, setLoadingEditor,
        setFieldsDisabled, setPreviewFinalTemplate, visibleButtonPreviewTemplate, setVisibleButtonPreviewTemplate, setSaveRangeEditor } = useContext(ScreensContext);

    const navigate = useNavigate();

    /**
    * Esta función sirve para inicializar el editor Summernote con las opciones deseadas
    */
    const changeSummernoteLanguage = useCallback(() => {
        const defaultsFonts = ['Sans Serif', 'Serif', 'Monospace'];
        const allFonts = [...defaultsFonts, ...fontsNames];
        setAllFontsList(allFonts);
        editorSummernote.current = editorRef.current;

        $(editorRef.current).summernote("destroy");
        $(editorRef.current).summernote({
            placeholder: "Introduce una descripción",
            height: 400,
            toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ['fontname', ['fontname']],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ['insert', ['picture']],
                ['view', ['codeview']]
            ],
            fontNames: allFonts,
            fontNamesIgnoreCheck: allFonts,
            addDefaultFonts: false,
            callbacks: {
                onInit: function () {
                    $(".note-editable").css("font-size", "16px");
                },
                onChange: function (contents) {
                    setCurrentContent(contents);
                },
                onFocus() {
                    const range = $(editorRef.current).summernote('createRange');
                    setSaveRangeEditor(range);
                },
                onImageUpload: function (files) {
                    if (files.length > 0) {
                        uploadImage(files[0]);
                    }
                }
            }
        }).summernote("code", selectedTemplateContent);

        if (fieldsDisabled) {
            $(editorRef.current).summernote("disable");
        }
    }, [selectedTemplateContent, fieldsDisabled, fontsNames]);

    const uploadImage = async (file) => {
        setLoadingEditor(true);
        try {
            const response = await uploadImageTemplateDB(file, setAlert, setVisibleAlert);
            $(editorRef.current).summernote('insertImage', `http://localhost:8000${response.urlImagen}`);
            setLoadingEditor(false);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.log(error);
        }
    }

    // Si cambia el contenido seleccionado, invalida el rango guardado
    useEffect(() => {
        setSaveRangeEditor(null);
    }, [selectedTemplateContent]);

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

    /**
     * Carga la información de la plantilla seleccionada por ID y ajusta estados relacionados
    */
    const getSelectedTemplateEditor = async () => {
        setLoadingEditor(true);
        try {
            const selectedLanguage = listLanguages.find(lang => lang.code === codeLanguage);
            const response = await listTemplateById(idTemplateParams.id, setAlert, setVisibleAlert);

            if (response && codeLanguage) {
                console.log(2);
                setSelectedTemplate(response);
                setNameTemplate(response.code);
                setSubjectTemplate(response.data[codeLanguage].subject);
                setOriginalSubjectTemplate(response.data[codeLanguage].subject);
                setSelectedTemplateContent(response.data[codeLanguage].content);

                if (!selectedLanguageDropdown) {
                    setSelectedLanguageDropdown(selectedLanguage.value);
                }
                setLoadingEditor(false);
            } else {
                console.log(3);
                setCodeLanguage("es");
                console.log(codeLanguage);
                setLoadingEditor(false);
            }
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.log(error);
        }
    }

    /**
    * Obtiene todas las fuentes desde la base de datos para cargarlas en el editor
    */
    const getAllFonts = async () => {
        try {
            const response = await getAllFontsDB(setAlert, setVisibleAlert);
            if (response) {
                const fonts = response.map(font => font.name);
                setFontsNames(fonts);
                setInfoFonts(response);
            } else {
                setFontsNames([]);
                setInfoFonts([]);
            }
            setFontsLoaded(true);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            setFontsLoaded(true);
            console.log(error);
        }
    };

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

    // Controla si los campos están deshabilitados según si hay plantilla seleccionada o no
    useEffect(() => {
        if (selectedTemplate === "") {
            setFieldsDisabled(true);
            setVisibleButtonPreviewTemplate(false);
        } else {
            setVisibleButtonPreviewTemplate(true);
            setFieldsDisabled(false);
        }
    }, [selectedTemplate]);


    /**
     * FUncionalidad para previsualizar la plantilla final con las variables sustituídas por los de la base de datos
     * @param {*} idTemplate Id de la plantilla seleccionada
     */
    const viewTemplateVariables = async (idTemplate) => {
        setLoadingEditor(true);
        const idUser = 1;
        const idIncident = 1;
        const idGuest = 2;

        try {
            const response = await renderTemplatesFinal(idTemplate, idUser, idGuest, codeLanguage, idIncident, setAlert, setVisibleAlert);

            if (response) {
                setPreviewFinalTemplate(response);
                setvisiblePreviewFinalTemplate(true);
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ha ocurrido un error al previsualizar plantilla.',
                    life: 4000
                });
            }
            setLoadingEditor(false);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Ha ocurrido un error:", error);
        }
    }

    /**
     * Función para actualizar una plantilla en la base de datos con llamada a la API
     * @param {*} event Evento del clic en el botón de actualizar plantilla
     */
    const onUpdateTemplate = async (event) => {
        setLoadingEditor(true);
        try {
            event.preventDefault();
            const cleanedContent = cleanHtml(currentContent);

            setOriginalSubjectTemplate(subjectTemplate);
            const updatedData = { ...selectedTemplate.data };

            updatedData[codeLanguage] = {
                content: cleanedContent,
                subject: subjectTemplate
            };

            let body = {
                code: nameTemplate,
                data: updatedData
            };

            const response = await updateTemplateApi(selectedTemplate.id, body, setAlert, setVisibleAlert);

            if (response) {
                setSelectedTemplate(prev => ({
                    ...prev,
                    data: updatedData
                }));
                setSelectedTemplateContent(cleanedContent);
                toast.current.show({ severity: 'success', summary: 'Información', detail: 'Plantilla actualizada con éxito', life: 3000 });
            }
            setLoadingEditor(false);
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

    const cleanHtml = (html) => {
        const $html = $('<div>').html(html);

        $html.find('br').remove();
        $html.find('*').each(function () {
            if ($(this).text().trim() === '' && $(this).children().length === 0 && !$(this).is('img')) {
                $(this).remove();
            }
        });

        return $html.html().trim();
    };

    /**
     * Función para comprobar si la plantilla ha sido modificada
     * @returns Devuelve true si el contenido de la plantilla ha sido modificado, sino false en caso contrario.
     */
    const isTemplateModified = () => {
        const currentContentSummernote = $(editorRef.current).summernote('code');
        const cleanedInitial = cleanHtml(selectedTemplateContent);
        const cleanedCurrent = cleanHtml(currentContentSummernote);

        return (
            cleanedInitial !== cleanedCurrent ||
            (subjectTemplate ?? "").trim() !== (originalSubjectTemplate ?? "").trim()
        );
    };

    // Cuando se modifica el valor del contexto seleccionado, se limpian los campos de la plantilla
    useEffect(() => {
        if (selectedContextDropdown) {
            setFieldsDisabled(true);
            setNameTemplate("");
            setSubjectTemplate("")
            setSelectedTemplate("");
            setSelectedTemplateContent("");
            $(editorRef.current).summernote("code", "");
        }
    }, [selectedContextDropdown]);

    // Si se modifica la variable de estado, se deshabilitará el contenido del editor sino se volverá a activar.
    useEffect(() => {
        if (fieldsDisabled) {
            $(editorRef.current).summernote('disable');
        } else {
            $(editorRef.current).summernote('enable');
            setCurrentContent($(editorRef.current).summernote('code'));
        }
    }, [fieldsDisabled]);

    /**
     * Llama a las APIs de idiomas, contextos y fuentes de la BD una vez al montar el componente.
     */
    useEffect(() => {
        languagesApi();
        contextsApi();
        getAllFonts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /**
    * Establece el idioma por defecto del código si `listLanguages` tiene elementos y no se ha definido `codeLanguage`.
    */
    useEffect(() => {
        if (listLanguages.length > 0 && !codeLanguage) {
            setCodeLanguage("es");
        }
    }, [listLanguages, codeLanguage]);

    /**
    * Carga la plantilla seleccionada en el editor una vez que `codeLanguage` ha sido definido 
    * y asegura que esta acción solo se ejecute una vez usando `hasLoadedTemplate`.
    */
    useEffect(() => {
        if (codeLanguage && !hasLoadedTemplate.current) {
            getSelectedTemplateEditor();
            hasLoadedTemplate.current = true;
        }
    }, [codeLanguage]);

    /**
    * Cuando las fuentes estén cargadas, el contenido de la plantilla ha sido escogido y no estemos en la vista previa, se 
    * configurará el editor cuando esté todo listo.
    */
    useEffect(() => {
        if (fontsLoaded && (!visiblePreviewFinalTemplate || selectedTemplateContent)) {
            changeSummernoteLanguage();
        }
    }, [selectedTemplateContent, visiblePreviewFinalTemplate, fontsLoaded]);


    /**
    * Limpia el contexto del dropdown si no es la previsualización final de la plantilla.
    */
    useEffect(() => {
        if (!visiblePreviewFinalTemplate) {
            setSelectedContextDropdown("");
        }
    }, [visiblePreviewFinalTemplate]);

    /**
    * Se habilita o deshabilta el botón de actualizar dependiendo de si la plantilla ha sido modificada.
    */
    useEffect(() => {
        if (isTemplateModified()) {
            setVisibleActionButton(true);
        } else {
            setVisibleActionButton(false);
        }
    }, [selectedTemplateContent, currentContent, subjectTemplate, originalSubjectTemplate]);

    /**
    * Inserta las fuentes por defecto en el editor Summernote con enlaces <link> al <head> de la base de datos
    */
    useEffect(() => {
        if (allFontsList.length > 0 && infoFonts.length > 0) {
            allFontsList.forEach(fontName => {
                const font = infoFonts.find(f => f.name.toLowerCase() === fontName.toLowerCase());
                if (font && !document.getElementById(`font-${font.name}-link`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = font.url;
                    link.id = `font-${font.name}-link`;
                    document.head.appendChild(link);
                }
            });
        }
    }, [allFontsList, infoFonts]);

    return (
        <>
            {loadingEditor && (
                <div className='containerSpinner'>
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#18787F"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                    />
                </div >
            )}

            <Toast ref={toast} />
            {!visiblePreviewFinalTemplate ? (
                <div>
                    <Button icon="pi pi-arrow-left" label="Volver" className="rounded-pill buttons mt-4 ml-3" onClick={() => navigate('/templatesList')} />

                    <div className="container-edit container mt-4 mb-5">
                        <h1 className="title-edit mb-5">
                            EDICIÓN PLANTILLAS
                        </h1>

                        <hr style={{
                            width: "30%",
                            height: "2px",
                            backgroundColor: "#007bff",
                            border: "none",
                        }} />

                        <div className="filters mt-5 p-1 rounded">
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
                                subjectTemplate={subjectTemplate}
                                setSubjectTemplate={setSubjectTemplate}
                                setOriginalSubjectTemplate={setOriginalSubjectTemplate}
                                isTemplateModified={isTemplateModified}
                            />
                        </div>

                        <div className="text-right mt-4 mb-3">
                            <Button label="Previsualización final" icon="pi pi-eye" aria-label="vista_previa" className="rounded-pill buttons" onClick={() => viewTemplateVariables(selectedTemplate.id)} disabled={!visibleButtonPreviewTemplate} />
                        </div>

                        <div className="d-flex justify-content-center border border-success mt-2 p-2 rounded">
                            <label for="nameTemplate" className="text-name font-weight-bold m-2">Nombre Plantilla:</label>
                            <InputText id="nameTemplate" keyfilter="alpha" className="form-control w-50" placeholder="Introduce nombre de plantilla" value={nameTemplate} onChange={onChangeNameTemplate} aria-label="NameTemplate" aria-describedby="name-template" readOnly />
                        </div>

                        <div className="d-flex justify-content-start mt-4 mb-3 p-2 rounded">
                            <label for="subjectTemplate" className="text-subject font-weight-bold m-2">Asunto:</label>
                            <InputText id="subject" className="form-control w-100 w-sm-50" placeholder="Introduce asunto de plantilla" value={subjectTemplate} onChange={onChangeSubjectTemplate}
                                onFocus={() => setSaveRangeEditor(null)} disabled={fieldsDisabled} aria-describedby="subject" aria-label="Subject" />
                        </div>

                        <div className="mb-3">
                            <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                        </div>
                        <div className="text-center mt-4">
                            <Button label="Actualizar Plantilla" icon="pi pi-refresh" aria-label="Actualizar" className="rounded-pill buttons" disabled={!visibleActionButton}
                                onClick={onUpdateTemplate} />
                        </div>
                        {visibleAlert && (
                            <ModalError />
                        )}
                    </div>
                </div>
            ) : (
                <PreviewFinalTemplate setvisiblePreviewFinalTemplate={setvisiblePreviewFinalTemplate} />
            )}
        </>
    );
};

export default EditTemplate; 