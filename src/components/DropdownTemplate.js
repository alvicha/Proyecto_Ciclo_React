import { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import { getTemplatesContexts } from '../services/services';
import ScreensContext from '../screens/ScreensContext';
import ModalComponent from '../components/ModalComponent'

const DropdownTemplate = ({
    contexts,
    templates,
    setTemplates,
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

    const [selectedAction, setSelectedAction] = useState('Acciones');
    const [selectedTemplateCode, setSelectedTemplateCode] = useState('Plantillas');
    const [visible, setVisible] = useState(false);
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

            if (selectedTemplate.data[languageCode]) {
                setSelectedTemplateContent(selectedTemplate.data[languageCode].content)
            }
        }
    }

    const handleActionChange = (action) => {
        const codeVariable = action;
        setSelectedAction(codeVariable);

        if (!context.current) return;

        $(context.current).summernote('invoke', 'editor.restoreRange');
        $(context.current).summernote('invoke', 'editor.insertText', `{{${codeVariable}}}`);
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
        const codeTemplate = selectedCodeTemplate;
        setCodeTemplate(codeTemplate);
        let selectedTemplate = templates.find(template => template.code === codeTemplate);

        if (selectedTemplate.data[codeLanguage]) {
            setSelectedTemplate(selectedTemplate);
            setSelectedTemplateCode(selectedTemplate.code)
            setSelectedTemplateContent(selectedTemplate.data[codeLanguage].content)
        }
    };

    const handleInfoContext = (infoContext) => {
        console.log("Codigo: ", infoContext.code);
    }

    const onShowModal = () => {
        setVisible(true)
    }

    useEffect(() => {
        console.log('contexto seleccionado:', contextDropDown);
        console.log('Accion o variable seleccionado:', selectedAction);
        console.log('Lenguaje cambiado: ', codeLanguage);
    }, [contextDropDown, selectedAction, codeLanguage, selectedLanguageDropdown, selectedTemplateCode]);

    return (
        <div className='row m-3 p-2 gap-3'>
            <div className="dropdown col-6 col-md-6 mb-3">
                <a class="btn btn-secondary dropdown-toggle px-3 mb-3" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedLanguageDropdown}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {listLanguages.map((language) => (
                        <a className='dropdown-item' key={language.code} onClick={() => handleLanguageChange(language.code)}>
                            {language.value}
                        </a>
                    ))
                    }
                </div>
            </div>

            <div className="dropdown col-6 mb-3">
                <a class="btn btn-secondary dropdown-toggle px-3 mb-3" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {contextDropDown}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {contexts.map((context) => (
                        <a className='dropdown-item' key={context.code} onClick={() => handleContextChange(context.code)}>
                            {context.code}
                        </a>
                    ))}
                </div>
            </div>

            {placeholdersList.length > 0 && (
                <div className="dropdown d-flex justify-content-center align-items-center col-6 mb-3">
                    <a class="btn btn-secondary dropdown-toggle px-3 mb-3" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedAction}
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {placeholdersList.map((context) => (
                            <a className='dropdown-item' key={context.code} onClick={() => handleActionChange(context.code)}>
                                {context.code}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {placeholdersList.length > 0 && templates.length > 0 && (
                <div className="dropdown d-flex justify-content-center align-items-center col-6 mb-3">
                    <a class="btn btn-secondary dropdown-toggle px-3 mb-3" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedTemplateCode}
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {templates.map((template) => (
                            <a className='dropdown-item' key={template.code} onClick={() => handleTemplateChange(template.code)}>
                                {template.code}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <button type="button" class="btn btn-primary m-auto" data-toggle="modal" data-target="#exampleModal" onClick={onShowModal}>
                <i class="fa fa-trash" />
            </button>
            
            {visible && (<ModalComponent />)}
        </div>
    );
};

export default DropdownTemplate;
