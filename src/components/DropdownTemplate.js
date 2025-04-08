import { useContext, useRef, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts } from '../services/services';
import ScreensContext from '../screens/ScreensContext';
import "../pages/summernote.css";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const DropdownTemplate = ({
    contexts,
    templates,
    setTemplates,
    selectedTemplate,
    setSelectedTemplate,
    selectedTemplateContent,
    setSelectedTemplateContent,
    contextDropDown,
    setContextDropDown,
    codeLanguage,
    setCodeLanguage,
    listLanguages,
    selectedLanguageDropdown,
    setSelectedLanguageDropdown,
    placeholdersList,
    getPlaceholdersApi,
    nameTemplate,
    setNameTemplate,
    setCodeTemplate,
    setActionButtonUpdate }) => {

    const [visible, setVisible] = useState(false);
    const [visibleModalWarning, setVisibleModalWarning] = useState(false);
    const [showVariables, setShowVariables] = useState(false);
    const [warningMessage, setWarningMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [previousTemplateName, setPreviousTemplateName] = useState("");
    const { context } = useContext(ScreensContext);
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
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const rejectModalWarning = () => {
        onCancelChange();
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }


    const resetData = () => {
        setSelectedTemplate(null);
        setSelectedTemplateContent("");
        setCodeTemplate(null);
        setNameTemplate("");
    };

    const onClickContextTemplate = (selectedContext) => {
        setContextDropDown(selectedContext.code);
        getTemplatesApi(selectedContext.code);
        getPlaceholdersApi(selectedContext.code);
    };

    const onClickContentTemplate = (templateSelected) => {
        setSelectedTemplate(templateSelected);
        setSelectedTemplateContent(templateSelected.data[codeLanguage].content);
        setCodeTemplate(templateSelected.code);
        setActionButtonUpdate(true);
    };

    const handleContextChange = (selectedCodeContext) => {
        let selectedContext = contexts.find(context => context.code === selectedCodeContext);

        if (selectedTemplateContent) {
            setPreviousTemplateName(nameTemplate);
            setWarningMessage("¿Estás seguro de que deseas cambiar de contexto? Se perderán los cambios.");
            setVisibleModalWarning(true);

            setConfirmAction(() => () => {
                resetData();
                onClickContextTemplate(selectedContext);
            });
        } else {
            onClickContextTemplate(selectedContext);
        }
    };

    const insertVariablesText = (action) => {
        const placeholderText = `{{${action}}}`;
        $(context.current).summernote('invoke', 'editor.insertText', placeholderText);
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

    const getTemplatesApi = async (context) => {
        try {
            const response = await getTemplatesContexts(context);
            setTemplates(response);
            setVisibleTemplates(true);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const handleLanguageChange = (selectedCodeLanguage) => {
        const selectedLanguage = listLanguages.find(lang => lang.code === selectedCodeLanguage);
        const currentContentSummernote = $(context.current).summernote('code');

        setSelectedTemplateContent(currentContentSummernote);
        setCodeLanguage(selectedCodeLanguage);
        setVisibleContexts(true);

        if (selectedTemplateContent) {
            setPreviousTemplateName(nameTemplate);
            setWarningMessage("¿Estás seguro de que deseas cambiar de idioma? Se perderán los cambios.");
            setVisibleModalWarning(true);

            setConfirmAction(() => () => {
                if (selectedTemplate) {
                    setSelectedTemplateContent(selectedTemplate.data[selectedLanguage.code].content);
                    setCodeTemplate(selectedTemplate.code);
                    setNameTemplate(selectedTemplate.code);
                    setSelectedLanguageDropdown(selectedLanguage.value);
                } else {
                    resetData();
                    setSelectedLanguageDropdown(selectedLanguage.value);
                }
            });
        } else {
            setSelectedLanguageDropdown(selectedLanguage.value);
        }
    };

    const onConfirmChange = () => {
        confirmAction();
        setConfirmAction(null);
        setVisibleModalWarning(false);
    };

    const onCancelChange = () => {
        setNameTemplate(previousTemplateName);
        setVisibleModalWarning(false);
    };

    const handleTemplateChange = (selectedCodeTemplate) => {
        const templateSelected = templates.find(template => template.code === selectedCodeTemplate);
        const currentContentSummernote = $(context.current).summernote('code');

        setShowVariables(true);
        setActionButtonUpdate(true);

        if (selectedTemplateContent) {
            if (selectedTemplateContent !== currentContentSummernote || nameTemplate !== selectedCodeTemplate) {
                setPreviousTemplateName(nameTemplate);
                setWarningMessage("¿Estás seguro de que quieres cambiar de plantilla? Se perderán los cambios.");
                setVisibleModalWarning(true);

                setConfirmAction(() => () => {
                    onClickContentTemplate(templateSelected);
                    setNameTemplate(selectedCodeTemplate);

                    setTimeout(() => {
                        $(context.current).summernote('code', templateSelected.data[codeLanguage].content);
                    }, 0);
                });
            }
        } else {
            onClickContentTemplate(templateSelected);
            setNameTemplate(selectedCodeTemplate);
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
                <div className="dropdown show col-12 col-lg-2 col-md-4 mb-3">
                    <button className="btn btn-secondary dropdown-toggle w-100 text-truncate" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={listLanguages.length === 0}
                    >
                        {selectedLanguageDropdown}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {listLanguages.map((language) => (
                            <button className='dropdown-item' key={language.code} onClick={() => handleLanguageChange(language.code)}>
                                {language.value}
                            </button>
                        ))
                        }
                    </div>
                </div>

                {visibleContexts && (
                    <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                        <button
                            className="btn btn-secondary dropdown-toggle w-100 text-truncate"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            disabled={contexts.length === 0}
                        >
                            {contextDropDown}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {contexts.map((context) => (
                                <button
                                    className="dropdown-item"
                                    key={context.code}
                                    onClick={() => handleContextChange(context.code)}
                                >
                                    {context.code}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {visibleTemplates && templates.length > 0 && (
                    <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                        <button className="btn btn-secondary dropdown-toggle w-100 text-truncate" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            disabled={templates.length === 0}>
                            Plantillas
                        </button>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {templates.map((template) => (
                                <button className='dropdown-item' key={template.code} onClick={() => handleTemplateChange(template.code)}>
                                    {template.code}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {showVariables && (
                    <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                        <button className="btn btn-secondary dropdown-toggle w-100 text-truncate"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            disabled={placeholdersList.length === 0}
                        >
                            Variables
                        </button>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {placeholdersList.map((context) => (
                                <button className='dropdown-item' key={context.code} onClick={() => handleActionChange(context.code)}>
                                    {context.code}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-12 col-lg-1 col-md-2 mb-3">
                    <Button icon="pi pi-trash" className="rounded-pill mr-1" rounded severity="danger" aria-label="Eliminacion" onClick={onShowModal} />
                </div>

                {visible && selectedTemplateContent !== "" && (
                    <ConfirmDialog
                        group="declarative"
                        visible={visible}
                        onHide={() => setVisible(false)}
                        message="¿Desea eliminar el contenido del editor?"
                        header="Confirmación"
                        icon="pi pi-exclamation-triangle"
                        acceptLabel='Sí'
                        rejectLabel='No'
                        accept={acceptModalAcceptContent}
                        reject={rejectModalDeleteContent}
                        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                    />
                )}

                {visibleModalWarning && (
                    <ConfirmDialog
                        group="declarative"
                        visible={visible}
                        onHide={onCancelChange}
                        message={warningMessage}
                        header="Advertencia"
                        icon="pi pi-exclamation-triangle"
                        acceptLabel='Cambiar Plantilla'
                        rejectLabel='Cancelar'
                        accept={acceptModalWarning}
                        reject={rejectModalWarning}
                        style={{ width: '50vw' }}
                        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                    />
                )}
            </div>
        </>
    );
};

export default DropdownTemplate;