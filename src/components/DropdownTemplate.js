import { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts } from '../services/services';
import ScreensContext from '../screens/ScreensContext';
import ModalComponent from '../components/ModalComponent';
import "../screens/summernote.css";
import ModalWarning from './ModalWarning';

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
    const [warningMessage, setWarningMessage] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [previousTemplateName, setPreviousTemplateName] = useState("");
    const { context } = useContext(ScreensContext);

    const resetData = () => {
        setSelectedTemplate(null);
        setSelectedTemplateContent(null);
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
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const handleLanguageChange = (selectedCodeLanguage) => {
        const selectedLanguage = listLanguages.find(lang => lang.code === selectedCodeLanguage);
        const currentContentSummernote = $(context.current).summernote('code');
        let templateNameSelected = nameTemplate;

        setSelectedTemplateContent(currentContentSummernote);
        setCodeLanguage(selectedCodeLanguage);

        if (selectedTemplateContent) {
            setPreviousTemplateName(nameTemplate);
            setCodeTemplate(templateNameSelected);
            setWarningMessage("¿Estás seguro de que deseas cambiar de idioma? Se perderán los cambios.");
            setVisibleModalWarning(true);

            setConfirmAction(() => () => {
                setSelectedTemplateContent(selectedTemplate.data[selectedLanguage.code].content);
                setCodeTemplate(selectedTemplate.code)
                setNameTemplate(selectedTemplate.code);
                setSelectedLanguageDropdown(selectedLanguage.value);
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
        setShowVariables(false);
    };

    const handleTemplateChange = (selectedCodeTemplate) => {
        const templateSelected = templates.find(template => template.code === selectedCodeTemplate);
        const currentContentSummernote = $(context.current).summernote('code');

        if (selectedLanguageDropdown === "Idioma") {
            alert("Selecciona un idioma antes de escoger plantilla");
            return;
        }

        setShowVariables(true);

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

            // Asegurar que el editor de texto se actualiza
            setTimeout(() => {
                $(context.current).summernote('code', templateSelected.data[codeLanguage].content);
            }, 0);

        }
    };

    const onShowModal = () => {
        setVisible(true);
    }

    useEffect(() => {
        console.log("Contenido actualizado:", selectedTemplateContent);
    }, [contextDropDown, codeLanguage, selectedLanguageDropdown, previousTemplateName, selectedTemplate, selectedTemplateContent, visibleModalWarning, visible]);

    return (
        <div className='row m-3 p-2 align-items-center'>
            <div className="dropdown show col-12 col-lg-2 col-md-4 mb-3">
                <a className="btn btn-secondary dropdown-toggle w-100 text-truncate" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedLanguageDropdown}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {listLanguages.map((language) => (
                        <button className='dropdown-item' key={language.code} onClick={() => handleLanguageChange(language.code)}>
                            {language.value}
                        </button>
                    ))
                    }
                </div>
            </div>

            <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                <a className="btn btn-secondary dropdown-toggle w-100 text-truncate" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {contextDropDown}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {contexts.map((context) => (
                        <button className='dropdown-item' key={context.code} onClick={() => handleContextChange(context.code)}>
                            {context.code}
                        </button>
                    ))}
                </div>
            </div>

            {templates.length > 0 && (
                <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                    <button className="btn btn-secondary dropdown-toggle w-100 text-truncate" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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

            {placeholdersList.length > 0 && showVariables && (
                <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                    <button className="btn btn-secondary dropdown-toggle w-100 text-truncate" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                <button type="button" className="btn btn-danger m-auto" data-toggle="modal" data-target="#exampleModal" onClick={onShowModal}>
                    <i className="fa fa-trash" />
                </button>
            </div>

            {visible && (
                <ModalComponent
                    setVisible={setVisible}
                    setSelectedTemplateContent={setSelectedTemplateContent}
                    setActionButtonUpdate={setActionButtonUpdate}
                />
            )}

            {visibleModalWarning && (
                <ModalWarning
                    onConfirmChange={onConfirmChange}
                    onCancelChange={onCancelChange}
                    warningMessage={warningMessage}
                />
            )}
        </div>
    );
};

export default DropdownTemplate;
