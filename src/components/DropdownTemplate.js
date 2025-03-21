import { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts } from '../services/services';
import ScreensContext from '../screens/ScreensContext';
import ModalComponent from '../components/ModalComponent';
import "../screens/summernote.css";

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
    codeTemplate,
    setCodeTemplate }) => {

    const [selectedVariable, setSelectedVariable] = useState('Variables');
    const [selectedTemplateCode, setSelectedTemplateCode] = useState('Plantillas');
    const [visible, setVisible] = useState(false);
    const [showVariables, setShowVariables] = useState(false);
    const { context } = useContext(ScreensContext);

    const handleContextChange = (selectedCodeContext) => {
        let codeContext = selectedCodeContext;
        let selectedContext = contexts.find(context => context.code === codeContext);

        if (selectedContext) {
            setContextDropDown(selectedContext.code);
            getPlaceholdersApi(selectedContext);

            handleInfoContext(selectedContext);
            getTemplatesApi(selectedContext.code);

            if (contextDropDown !== selectedContext.code) {
                setSelectedTemplateContent(null);
            }
        }
    };

    const handleInfoLanguage = (languageCode) => {
        if (templates && templates.length > 0) {
            let selectedTemplate = templates.find(template => template.code === codeTemplate);
            setSelectedTemplate(selectedTemplate);

            if (selectedTemplate.data[languageCode]) {
                setSelectedTemplateContent(selectedTemplate.data[languageCode].content)
            }
        }
    }

    const insertVariablesText = (action) => {
        const placeholderText = `{{${action}}}`;
        $(context.current).summernote('invoke', 'editor.insertText', placeholderText);
    };

    const handleActionChange = (action) => {
        setSelectedVariable(action);
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
        const newLang = selectedCodeLanguage;
        const selectedLanguage = listLanguages.find(lang => lang.code === newLang);
        setSelectedLanguageDropdown(selectedLanguage.value);

        if (selectedTemplateContent) {
            handleInfoLanguage(newLang);
        }

        if (selectedLanguage) {
            setCodeLanguage(newLang);
        }
    };

    const handleTemplateChange = (selectedCodeTemplate) => {
        setCodeTemplate(null);
        setSelectedTemplate(null);
        setSelectedTemplateContent(null);
        setSelectedTemplateCode("");

        const codeTemplate = selectedCodeTemplate;
        setCodeTemplate(codeTemplate);
        setShowVariables(true);
        let templateSelected = templates.find(template => template.code === codeTemplate);

        if (templateSelected.data[codeLanguage]) {
            setSelectedTemplate(templateSelected);
            setSelectedTemplateCode(templateSelected.code);
            setSelectedTemplateContent(templateSelected.data[codeLanguage].content);
        }
    };

    const handleInfoContext = (infoContext) => {
        console.log("Codigo: ", infoContext.code);
    }

    const onShowModal = () => {
        setVisible(true);
    }

    useEffect(() => {
        console.log('contexto seleccionado:', contextDropDown);
        console.log('Accion o variable seleccionado:', selectedVariable);
        console.log('Contenido:', selectedTemplateContent);
    }, [contextDropDown, selectedVariable, codeLanguage, selectedLanguageDropdown, selectedTemplate, selectedTemplateContent, selectedTemplateCode, visible]);

    return (
        <div className='row m-3 p-2 align-items-center'>
            <div className="dropdown show col-12 col-lg-2 col-md-4 mb-3">
                <a class="btn btn-secondary dropdown-toggle w-100 text-truncate" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedLanguageDropdown}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {listLanguages.map((language) => (
                        <button className='dropdown-item' key={language.code} onClick={() => handleLanguageChange(language.code)}>
                            {language.value}
                        </button >
                    ))
                    }
                </div>
            </div>

            <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                <a class="btn btn-secondary dropdown-toggle w-100 text-truncate" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {contextDropDown}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {contexts.map((context) => (
                        <button className='dropdown-item' key={context.code} onClick={() => handleContextChange(context.code)}>
                            {context.code}
                        </button>
                    ))}
                </div>
            </div>

            {placeholdersList.length > 0 && templates.length > 0 && (
                <div className="dropdown show col-12 col-lg-3 col-md-4 mb-3">
                    <button a class="btn btn-secondary dropdown-toggle w-100 text-truncate" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Plantillas
                    </button>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
                    <button class="btn btn-secondary dropdown-toggle w-100 text-truncate" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Variables
                    </button>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
                    <i class="fa fa-trash" />
                </button>
            </div>

            {visible && (
                <ModalComponent
                    setVisible={setVisible}
                    setSelectedTemplateContent={setSelectedTemplateContent}
                />
            )}
        </div>
    );
};

export default DropdownTemplate;


<button className="btn btn-primary" onClick={onUpdateTemplate}>Actualizar Plantilla</button>
