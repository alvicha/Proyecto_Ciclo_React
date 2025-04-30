import { useContext, useRef, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts } from '../services/services';
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
    originalSubjectTemplate,
    setOriginalSubjectTemplate }) => {

    const [visible, setVisible] = useState(false);
    const [visibleModalWarning, setVisibleModalWarning] = useState(false);
    const [showVariables, setShowVariables] = useState(false);
    const [warningMessage, setWarningMessage] = useState(null);
    const [textButton, setTextButton] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const { context, setAlert, visibleAlert, setVisibleAlert, listLanguages, contextsList } = useContext(ScreensContext);
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

    const onClickContextTemplate = (selectedContext) => {
        setContextDropDown(selectedContext.code);
        getTemplatesApi(selectedContext.id);
        getPlaceholdersApi(selectedContext.id);
    };

    const onClickContentTemplate = (templateSelected) => {
        setSelectedTemplate(templateSelected);
        setSelectedTemplateContent(templateSelected.data[codeLanguage].content);
        setSubjectTemplate(templateSelected.data[codeLanguage].subject);
        setOriginalSubjectTemplate(templateSelected.data[codeLanguage].subject);
    };

    const handleContextChange = (selectedCodeContext) => {
        const currentContentSummernote = $(context.current).summernote('code');
        let selectedContext = contextsList.find(context => context.code === selectedCodeContext);

        if (normalizeHtml(selectedTemplateContent) !== normalizeHtml(currentContentSummernote) || subjectTemplate !== originalSubjectTemplate) {
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

    const insertVariablesText = (action) => {
        const placeholderText = `{{${action}}}`;
        if (selectedTemplateContent || nameTemplate !== "") {
            $(context.current).summernote('invoke', 'editor.insertText', placeholderText);
        } else {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No puedes añadir variables sin una plantilla seleccionada', life: 3000 });
        }
    };

    const handleActionChange = (action) => {
        const isEmpty = $(context.current).summernote('isEmpty');

        if (isEmpty) {
            insertVariablesText(action);
        } else {
            $(context.current).summernote('invoke', 'editor.restoreRange'); // Restauramos el rango del cursor
            insertVariablesText(action);
        }
    };

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

    const normalizeHtml = (html) => {
        return $('<div>').html(html).text(); // Elimina escapes como \", &quot;, etc.
    };

    const handleLanguageChange = (langDropdown) => {
        const selectedLanguage = listLanguages.find(lang => lang.value === langDropdown);
        const currentContentSummernote = $(context.current).summernote('code');
        setVisibleContexts(true);

        if (selectedTemplate) {
            if (normalizeHtml(selectedTemplateContent) !== normalizeHtml(currentContentSummernote) || subjectTemplate !== originalSubjectTemplate) {
                setWarningMessage("¿Estás seguro de que deseas cambiar de idioma? Se perderán los cambios.");
                setTextButton("Cambiar idioma");
                setVisibleModalWarning(true);

                setConfirmAction(() => () => {
                    if (selectedTemplate) {
                        setSelectedTemplateContent(selectedTemplate.data[selectedLanguage.code].content);
                        setNameTemplate(selectedTemplate.code);
                        setSubjectTemplate(selectedTemplate.data[selectedLanguage.code].subject);
                        setOriginalSubjectTemplate(selectedTemplate.data[selectedLanguage.code].subject);
                        setSelectedLanguageDropdown(selectedLanguage.value);
                        setCodeLanguage(selectedLanguage.code);
                    } else {
                        resetData();
                        setSelectedLanguageDropdown(selectedLanguage.value);
                        setCodeLanguage(selectedLanguage.code);
                    }
                });
            } else {
                setSelectedTemplateContent(selectedTemplate.data[selectedLanguage.code].content);
                setSubjectTemplate(selectedTemplate.data[selectedLanguage.code].subject);
                setOriginalSubjectTemplate(selectedTemplate.data[selectedLanguage.code].subject);
                setSelectedLanguageDropdown(selectedLanguage.value);
                setCodeLanguage(selectedLanguage.code);
            }
        } else {
            setSelectedLanguageDropdown(selectedLanguage.value);
            setCodeLanguage(selectedLanguage.code);
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

    const handleTemplateChange = (selectedCodeTemplate) => {
        const templateSelected = templates.find(template => template.code === selectedCodeTemplate);
        const currentContentSummernote = $(context.current).summernote('code');
        setShowVariables(true);

        if (normalizeHtml(selectedTemplateContent) !== normalizeHtml(currentContentSummernote) || originalSubjectTemplate !== subjectTemplate) {
            setWarningMessage("¿Estás seguro de que quieres cambiar de plantilla? Se perderán los cambios.");
            setTextButton("Cambiar plantilla");
            setVisibleModalWarning(true);

            setConfirmAction(() => () => {
                setSelectedTemplate(templateSelected);
                setSelectedTemplateContent(templateSelected.data[codeLanguage].content);
                $(context.current).summernote('code', templateSelected.data[codeLanguage].content);
                setNameTemplate(selectedCodeTemplate);
                setSubjectTemplate(templateSelected.data[codeLanguage].subject);
                setOriginalSubjectTemplate(templateSelected.data[codeLanguage].subject);
            });
        } else {
            onClickContentTemplate(templateSelected);
            setNameTemplate(selectedCodeTemplate);
            setSubjectTemplate(templateSelected.data[codeLanguage].subject);
            setOriginalSubjectTemplate(templateSelected.data[codeLanguage].subject);
        }
    };

    const onShowModal = () => {
        if (selectedTemplateContent !== "") {
            setVisible(true);
        }
    }

    const handleConfirmDelete = () => {
        $(context.current).summernote("code", "");
        setVisible(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <div className='row m-2 d-flex align-items-center'>
                <div className="card mb-3 mr-3">
                    <Dropdown
                        value={selectedLanguageDropdown}
                        onChange={(e) => handleLanguageChange(e.value)}
                        options={listLanguages}
                        optionLabel="value"
                        placeholder="Idioma"
                        disabled={listLanguages?.length === 0} />
                </div>
                {visibleContexts && (
                    <div className="card mb-3 mr-3">
                        <Dropdown
                            value={contextDropDown}
                            onChange={(e) => handleContextChange(e.value)}
                            options={contextsList}
                            optionLabel="code"
                            optionValue="code"
                            placeholder="Contextos"
                            disabled={contextsList.length === 0}
                        />
                    </div>
                )}

                {visibleTemplates && templates.length > 0 && (
                    <div className="card mb-3 mr-3">
                        <Dropdown
                            onChange={(e) => handleTemplateChange(e.value)}
                            options={templates}
                            optionLabel="code"
                            optionValue="code"
                            placeholder="Plantillas"
                            disabled={templates.length === 0}
                        />
                    </div>
                )}

                {showVariables && (
                    <div className="card mb-3">
                        <Dropdown
                            onChange={(e) => handleActionChange(e.value)}
                            options={placeholdersList}
                            optionLabel="dataVariable.code"
                            optionValue="dataVariable.code"
                            placeholder="Variables"
                            disabled={placeholdersList.length === 0}
                        />
                    </div>
                )}

                <div className="col-12 col-lg-1 col-md-2 mb-3">
                    <Button icon="pi pi-trash" className="rounded-pill mr-1" rounded severity="danger" aria-label="Eliminacion" onClick={onShowModal} />
                </div>

                {selectedTemplateContent !== "" && (
                    <ConfirmDialogContent
                        visible={visible}
                        setVisible={setVisible}
                        acceptModalAcceptContent={acceptModalAcceptContent}
                        rejectModalDeleteContent={rejectModalDeleteContent}
                    />
                )}

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