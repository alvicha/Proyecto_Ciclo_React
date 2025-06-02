import { useContext, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts, listTemplateById } from '../services/services';
import ScreensContext from '../screens/ScreensContext';
import "../pages/summernote.css";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ModalError from './ModalError';
import ConfirmDialogContent from './ConfirmDialogContent';
import ConfirmDialogChangeTemplate from './ConfirmDialogChangeTemplate';

const DropdownTemplate = ({
    templates,
    setTemplates,
    selectedTemplate,
    setSelectedTemplate,
    selectedTemplateContent,
    setSelectedTemplateContent,
    contextDropDown,
    setContextDropDown,
    selectedLanguageDropdown,
    setSelectedLanguageDropdown,
    placeholdersList,
    getPlaceholdersApi,
    nameTemplate,
    setNameTemplate,
    codeLanguage,
    setCodeLanguage,
    subjectTemplate,
    setSubjectTemplate,
    setOriginalSubjectTemplate,
    isTemplateModified }) => {

    const [visible, setVisible] = useState(false);
    const [visibleModalWarning, setVisibleModalWarning] = useState(false);
    const [showVariables, setShowVariables] = useState(false);
    const [warningMessage, setWarningMessage] = useState(null);
    const [textButton, setTextButton] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const { editorSummernote, setAlert, visibleAlert, setVisibleAlert, listLanguages, contextsList, setLoadingEditor, saveRangeEditor } = useContext(ScreensContext);
    const [visibleContexts, setVisibleContexts] = useState(false);
    const [visibleTemplates, setVisibleTemplates] = useState(false);
    const toast = useRef(null);

    const acceptModalAcceptContent = () => {
        handleConfirmDelete();
        toast.current.show({ severity: 'info', summary: 'Eliminado', detail: 'Eliminado el contenido con éxito', life: 3000 });
    }

    const rejectModalDeleteContent = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Se ha cancelado la operación', life: 3000 });
    }

    const acceptModalWarning = () => {
        onConfirmChange();
        toast.current.show({ severity: 'info', summary: 'Cambios no guardados', detail: 'Plantilla cambiada con éxito', life: 3000 });
    }

    const rejectModalWarning = () => {
        onCancelChange();
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Operación cancelada', life: 3000 });
    }

    const resetData = () => {
        setSelectedTemplate(null);
        setSelectedTemplateContent("");
        setNameTemplate("");
        setSubjectTemplate("");
        setOriginalSubjectTemplate("");
    };

    /**
     * Se ejecuta cuando el usuario cambia el contexto en el dropdown.
     * Actualiza el dropdown de contexto, carga las plantillas y los placeholders relacionados.
     * @param {Object} selectedContext - Objeto con información del contexto seleccionado
    */
    const onClickContextTemplate = (selectedContext) => {
        setContextDropDown(selectedContext.code);
        getTemplatesApi(selectedContext.id);
        getPlaceholdersApi(selectedContext.id);
        setOriginalSubjectTemplate("");
    };


    const onClickContentTemplate = (templateSelected) => {
        setSelectedTemplate(templateSelected);
        setSelectedTemplateContent(templateSelected.data[codeLanguage].content);
        setSubjectTemplate(templateSelected.data[codeLanguage].subject);
        setOriginalSubjectTemplate(templateSelected.data[codeLanguage].subject);
    };

    /**
     * Función para realizar el cambio de contexto seleccionado.
     * @param {string} selectedCodeContext - Código del contexto seleccionado
    */
    const handleContextChange = (selectedCodeContext) => {
        let selectedContext = contextsList.find(context => context.code === selectedCodeContext);

        if (isTemplateModified()) {
            setWarningMessage("¿Estás seguro de que deseas cambiar de contexto? Se perderán los cambios.");
            setTextButton("Cambiar contexto");
            setVisibleModalWarning(true);

            setConfirmAction(() => () => {
                onClickContextTemplate(selectedContext);
            });
        } else {
            resetData();
            onClickContextTemplate(selectedContext);
        }
    };

    /**
     * Llama a la función que se encargará de insertar una variable de placeholder en el editor o asunto.
     * @param {string} action - Código de la variable a insertar
    */
    const handleActionChange = (action) => {
        insertVariablesText(action);
    };

    /**
     * Función para obtener las plantillas asociadas a un contexto específico
     * @param {*} idContext Id del contexto seleccionado
     */
    const getTemplatesApi = async (idContext) => {
        try {
            const response = await getTemplatesContexts(idContext, setAlert, setVisibleAlert);
            setTemplates(response);
            setVisibleTemplates(true);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error fetching languages:", error);
        }
    };

    /**
     * Inserta el contenido de la plantilla en el editor Summernote una vez que haya información dentro de 'selectedTemplateContent'
     */
    useEffect(() => {
        if (selectedTemplateContent) {
            $(editorSummernote.current).summernote("code", selectedTemplateContent);
        }
    }, [selectedTemplateContent]);


    /**
        * Inserta el texto del placeholder en la posición actual del cursor en el editor o en el input de asunto.
        * @param {string} action - Código del placeholder
    */
    const insertVariablesText = (action) => {
        const placeholderText = `{{${action}}}`;
        if (!selectedTemplateContent && nameTemplate === "") {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'No puedes añadir variables sin una plantilla seleccionada',
                life: 3000
            });
            return;
        }

        if (saveRangeEditor) {
            $(editorSummernote.current).summernote('restoreRange', saveRangeEditor);
            $(editorSummernote.current).summernote('insertText', placeholderText);
        } else {
            const input = document.getElementById('subject');
            if (!input) {
                setSubjectTemplate(subjectTemplate + placeholderText);
                return;
            }

            const start = input.selectionStart;
            const end = input.selectionEnd;

            const before = subjectTemplate.substring(0, start);
            const after = subjectTemplate.substring(end);
            const newValue = before + placeholderText + after;
            setSubjectTemplate(newValue);

            setTimeout(() => {
                input.focus();
                const cursorPos = start + placeholderText.length;
                input.setSelectionRange(cursorPos, cursorPos);
            }, 0);
        }
    };

    /**
    * Funcionalidad para gestionar el cambio de idioma de la plantilla seleccionada.
    * @param {string} langDropdown - Valor del idioma seleccionado en el dropdown
    */
    const handleLanguageChange = async (langDropdown) => {
        try {
            const selectedLanguage = listLanguages.find(lang => lang.value === langDropdown);
            setVisibleContexts(true);

            if (selectedTemplate) {
                setLoadingEditor(true);
                const response = await listTemplateById(selectedTemplate.id, setAlert, setVisibleAlert);

                if (isTemplateModified()) {
                    setWarningMessage("¿Estás seguro de que deseas cambiar de idioma? Se perderán los cambios.");
                    setTextButton("Cambiar idioma");
                    setVisibleModalWarning(true);

                    setConfirmAction(() => () => {
                        if (response) {
                            setSelectedTemplateContent(response.data[selectedLanguage.code].content);
                            setNameTemplate(response.code);
                            setSubjectTemplate(response.data[selectedLanguage.code].subject);
                            setOriginalSubjectTemplate(response.data[selectedLanguage.code].subject);
                            setSelectedLanguageDropdown(selectedLanguage.value);
                            setCodeLanguage(selectedLanguage.code);
                        } else {
                            resetData();
                            setSelectedLanguageDropdown(selectedLanguage.value);
                            setCodeLanguage(selectedLanguage.code);
                        }
                    });
                } else {
                    setSelectedTemplateContent(response.data[selectedLanguage.code].content);
                    setSubjectTemplate(response.data[selectedLanguage.code].subject);
                    setOriginalSubjectTemplate(response.data[selectedLanguage.code].subject);
                    setSelectedLanguageDropdown(selectedLanguage.value);
                    setCodeLanguage(selectedLanguage.code);
                }
            } else {
                setSelectedLanguageDropdown(selectedLanguage.value);
                setCodeLanguage(selectedLanguage.code);
            }
            setLoadingEditor(false);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error:", error);
        }
    };

    const onConfirmChange = () => {
        confirmAction();
        setConfirmAction(null);
        setVisibleModalWarning(false);
    };

    const onCancelChange = () => {
        setVisibleModalWarning(false);
    };

    /**
     * Función para manejar el cambio de plantilla elegido.
     * @param {string} selectedCodeTemplate - Código de la plantilla seleccionada
    */
    const handleTemplateChange = async (selectedCodeTemplate) => {
        try {
            const templateSelected = templates.find(template => template.code === selectedCodeTemplate);
            setShowVariables(true);
            setLoadingEditor(true);

            const response = await listTemplateById(templateSelected.id, setAlert, setVisibleAlert);

            if (isTemplateModified()) {
                setWarningMessage("¿Estás seguro de que quieres cambiar de plantilla? Se perderán los cambios.");
                setTextButton("Cambiar plantilla");
                setVisibleModalWarning(true);

                setConfirmAction(() => () => {
                    setSelectedTemplate(response);
                    setSelectedTemplateContent(response.data[codeLanguage].content);
                    $(editorSummernote.current).summernote("code", selectedTemplateContent);
                    setNameTemplate(selectedCodeTemplate);
                    setSubjectTemplate(response.data[codeLanguage].subject);
                    setOriginalSubjectTemplate(response.data[codeLanguage].subject);
                });
            } else {
                onClickContentTemplate(response);
                setNameTemplate(response.code);
            }
            setLoadingEditor(false);
        } catch (error) {
            setAlert("Ha ocurrido un error: " + error.message);
            setVisibleAlert(true);
            console.error("Error:", error);
        }
    };

    const onShowModal = () => {
        setVisible(true);
    }

    const handleConfirmDelete = () => {
        $(editorSummernote.current).summernote("code", "");
        setVisible(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="container-fluid">
                <div className="row justify-content-lg-start justify-content-center p-2">
                    <div className="col-12 col-md-6 col-lg-auto mb-3">
                        <div className="card">
                            <Dropdown
                                value={selectedLanguageDropdown}
                                onChange={(e) => handleLanguageChange(e.value)}
                                options={listLanguages}
                                optionLabel="value"
                                placeholder="Idioma"
                                disabled={listLanguages?.length === 0}
                                aria-label="Seleccionar idioma"
                            />
                        </div>
                    </div>

                    {visibleContexts && (
                        <div className="col-12 col-md-6 col-lg-auto mb-3">
                            <div className="card">
                                <Dropdown
                                    value={contextDropDown}
                                    onChange={(e) => handleContextChange(e.value)}
                                    options={contextsList}
                                    optionLabel="code"
                                    optionValue="code"
                                    placeholder="Contextos"
                                    disabled={contextsList.length === 0}
                                    aria-label="Seleccionar contexto"
                                />
                            </div>
                        </div>
                    )}

                    {visibleTemplates && templates.length > 0 && (
                        <div className="col-12 col-md-6 col-lg-auto mb-3">
                            <div className="card">
                                <Dropdown
                                    onChange={(e) => handleTemplateChange(e.value)}
                                    options={templates}
                                    optionLabel="code"
                                    optionValue="code"
                                    placeholder="Plantillas"
                                    disabled={templates.length === 0}
                                    aria-label="Seleccionar plantilla"
                                />
                            </div>
                        </div>
                    )}

                    {showVariables && placeholdersList.length > 0 && (
                        <div className="col-12 col-md-6 col-lg-auto mb-3">
                            <div className="card">
                                <Dropdown
                                    onChange={(e) => handleActionChange(e.value)}
                                    options={placeholdersList}
                                    optionLabel="dataVariable.code"
                                    optionValue="dataVariable.code"
                                    placeholder="Variables"
                                    disabled={placeholdersList.length === 0}
                                    aria-label="Seleccionar variable"
                                />
                            </div>
                        </div>
                    )}

                    <div className="col-12 col-lg-auto d-flex justify-content-center mt-1">
                        <Button icon="pi pi-trash" className="rounded-pill" rounded severity="danger" aria-label="Eliminacion" disabled={$(editorSummernote.current).summernote('isEmpty')} onClick={onShowModal} />
                    </div>
                </div>

                <ConfirmDialogContent
                    visible={visible}
                    setVisible={setVisible}
                    acceptModalAcceptContent={acceptModalAcceptContent}
                    rejectModalDeleteContent={rejectModalDeleteContent}
                />

                <ConfirmDialogChangeTemplate
                    visibleModalWarning={visibleModalWarning}
                    onCancelChange={onCancelChange}
                    textButton={textButton}
                    message={warningMessage}
                    acceptModalWarning={acceptModalWarning}
                    rejectModalWarning={rejectModalWarning}
                />

                {visibleAlert && (
                    <ModalError />
                )}
            </div>
        </>
    );
};

export default DropdownTemplate;