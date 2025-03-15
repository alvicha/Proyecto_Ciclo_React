import { useEffect, useState, useRef, useCallback } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";
import { getDataContexts, getDataApi, getPlaceholdersContexts, getTemplatesContexts, updateTemplateApi, postDataTemplate } from '../services/services';

const SummernoteEditor = () => {
    const [textName, setTextName] = useState('');
    const [codeLanguage, setCodeLanguage] = useState("es");
    const editorRef = useRef(null);
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("Español");
    const [selectedContextDropdown, setSelectedContextDropdown] = useState("Contextos");
    const [listLanguages, setListLanguages] = useState([]);
    const [contexts, setContexts] = useState([]);
    const [test, setTest] = useState(false);
    const [placeholdersList, setPlaceholdersList] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);
    const [codeTemplate, setCodeTemplate] = useState("");

    const handleInfoLanguage = (languageCode) => {
        if (templates && templates.length > 0) {
            let selectedTemplate = templates.find(template => template.code === codeTemplate);

            if (selectedTemplate.data[languageCode]) {
                setSelectedTemplateContent(selectedTemplate.data[languageCode].content)
            }
        }
    }

    const handleInfoContext = (infoContext) => {
        console.log("Codigo: ", infoContext.code);
    }

    const changeSummernoteLanguage = useCallback((lang) => {
        $(editorRef.current).summernote("destroy");
        $(editorRef.current).summernote({
            placeholder: "Introduce una descripción",
            height: 300,
            lang: lang,
            styleWithSpan: false,
            toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ['language', ['languageDropdown']],
                ['context', ['listContexts']],
                ['variables', ['listPlaceholders']],
                ['template', ['templates']],
                ['trashTemplate', ['trash']]
            ],
            buttons: {
                languageDropdown: () => {
                    var ui = $.summernote.ui;

                    var button = ui.buttonGroup([
                        ui.button({
                            className: 'dropdown-toggle',
                            contents: selectedLanguageDropdown + '<span class="caret" style="margin-left: 8px;"></span>',
                            tooltip: 'Cambiar idioma',
                            data: {
                                toggle: 'dropdown'
                            }
                        }),
                        ui.dropdown({
                            contents: function () {
                                return listLanguages.map(language =>
                                    `<li><a href="#" data-lang="${language.code}">${language.value}</a></li>`
                                ).join('');
                            },
                            callback: function ($dropdown) {
                                $dropdown.find('a').on('click', function (e) {
                                    e.preventDefault();
                                    const newLang = $(this).data('lang');
                                    setCodeLanguage(newLang);
                                    let selectedLanguage = listLanguages.find(lang => lang.code === newLang);
                                    setSelectedLanguageDropdown(selectedLanguage.value);

                                    if (selectedTemplateContent) {
                                        handleInfoLanguage(newLang); //Funcion para despues realizar acciones
                                    }
                                });
                            }
                        })
                    ]);
                    return button.render();
                },
                listContexts: () => {
                    var ui = $.summernote.ui;

                    var button = ui.buttonGroup([
                        ui.button({
                            className: 'dropdown-toggle',
                            contents: selectedContextDropdown + '<span class="caret" style="margin-left: 8px;"></span>',
                            tooltip: 'Contextos para plantillas',
                            data: {
                                toggle: 'dropdown'
                            }
                        }),
                        ui.dropdown({
                            contents: function () {
                                return contexts.map(context =>
                                    `<li><a href="#" data-id="${context.code}">${context.code}</a></li>`
                                ).join('');
                            },
                            callback: function ($dropdown) {
                                $dropdown.find('a').on('click', function (e) {
                                    e.preventDefault();
                                    const codeContext = $(this).data('id');
                                    let selectedContext = contexts.find(context => context.code === codeContext);
                                    setSelectedContextDropdown(selectedContext.code);
                                    setTest(true);
                                    handleInfoContext(selectedContext); //Funcion para despues realizar acciones
                                    getPlaceholdersApi(selectedContext);
                                    getTemplatesApi(selectedContext.code);

                                    if (selectedContextDropdown !== selectedContext.code) {
                                        setSelectedTemplateContent(null);
                                    }
                                });
                            }
                        })
                    ]);
                    return button.render();
                },
                listPlaceholders: (context) => {
                    if (test && placeholdersList.length > 0) {
                        var ui = $.summernote.ui;

                        var button = ui.buttonGroup([
                            ui.button({
                                className: 'dropdown-toggle',
                                contents: 'Acciones <span class="caret" style="margin-left: 8px;"></span>',
                                tooltip: 'Acciones de contextos',
                                data: {
                                    toggle: 'dropdown'
                                }
                            }),
                            ui.dropdown({
                                contents: function () {
                                    return placeholdersList.map(context =>
                                        `<li><a href="#" data-code="${context.code}">${context.code}</a></li>`
                                    ).join('');
                                },
                                callback: function ($dropdown) {
                                    $dropdown.find('a').on('click', function (e) {
                                        e.preventDefault();
                                        const codeVariable = $(this).data('code');
                                        context.invoke('editor.insertText', `{{${codeVariable}}}`);
                                    });
                                }
                            })
                        ]);
                        return button.render();
                    }
                },
                templates: () => {
                    if (test) {
                        var ui = $.summernote.ui;

                        var button = ui.buttonGroup([
                            ui.button({
                                className: 'dropdown-toggle',
                                contents: 'Plantillas <span class="caret" style="margin-left: 8px;"></span>',
                                tooltip: 'Plantillas de contextos',
                                data: {
                                    toggle: 'dropdown'
                                }
                            }),
                            ui.dropdown({
                                contents: function () {
                                    if (templates.length > 0) {
                                        return templates.map(context =>
                                            `<li><a href="#" data-code="${context.code}">${context.code}</a></li>`
                                        ).join('');
                                    }
                                    return "No hay datos";
                                },
                                callback: function ($dropdown) {
                                    $dropdown.find('a').on('click', function (e) {
                                        e.preventDefault();
                                        const codeTemplate = $(this).data('code');
                                        setCodeTemplate(codeTemplate);
                                        let selectedTemplate = templates.find(template => template.code === codeTemplate);

                                        if (selectedTemplate.data[codeLanguage]) {
                                            setSelectedTemplate(selectedTemplate);
                                            setSelectedTemplateContent(selectedTemplate.data[codeLanguage].content)
                                        }
                                    });
                                }
                            })
                        ]);
                        return button.render();
                    }
                },
                trash: () => {
                    var ui = $.summernote.ui;
                    var button = ui.button({
                        contents: '<i class="fa fa-trash"/>',
                        tooltip: 'Eliminar texto de plantilla',
                        click: function () {
                            $(editorRef.current).summernote("code", null)
                        }
                    });

                    return button.render(); // return button as jquery object
                }
            },
        }).summernote("code", selectedTemplateContent)
    }, [selectedContextDropdown, listLanguages, contexts, test, templates, placeholdersList, codeLanguage, selectedTemplateContent, selectedLanguageDropdown]);

    const getTemplatesApi = async (context) => {
        try {
            const response = await getTemplatesContexts(context);
            setTemplates(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const languagesApi = async () => {
        try {
            const response = await getDataApi();
            setListLanguages(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const contextsApi = async () => {
        try {
            const response = await getDataContexts();
            setContexts(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const getPlaceholdersApi = async (infoContext) => {
        try {
            const response = await getPlaceholdersContexts(infoContext);
            setPlaceholdersList(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const onClickData = async (event) => {
        try {
            event.preventDefault();
            let contentTemplate = $(editorRef.current).summernote('code');
            setSelectedTemplate(contentTemplate);

            let body = {
                code: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            const response = await postDataTemplate(body);
            console.log(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const onUpdateTemplate = async (event) => {
        try {
            event.preventDefault();
            let contentTemplate = $(editorRef.current).summernote('code');
            setSelectedTemplateContent(contentTemplate);

            let body = {
                idTemplate: selectedTemplate.id,
                codeLanguage: codeLanguage,
                data: {
                    content: contentTemplate,
                    subject: selectedTemplate.data[codeLanguage].subject
                }
            };
            console.log("Mi cuerpo es: ", body);
            const response = await updateTemplateApi(body);
            console.log(response);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    useEffect(() => {
        languagesApi();
        contextsApi();
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
        changeSummernoteLanguage(codeLanguage);
    }, [codeLanguage, listLanguages, changeSummernoteLanguage]);

    return (
        <div className="container">
            <h2 className="mb-4">Editor de Texto con Summernote</h2>
            <form onSubmit={onClickData}>
                <div>
                    <label className="m-2">
                        Nombre:
                    </label>
                    <input type="text" value={textName} placeholder="Introduce un nombre" />
                </div>
                <div className="form-group mt-4 mb-3">
                    <label className="m-2">Título de la plantilla:</label>
                    <input type="text" value={selectedContextDropdown} className="w-25" placeholder="Título de la plantilla" readOnly />

                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <div className="mb-2">
                    <input type="submit" value="Enviar" className="btn btn-primary" />
                </div>
                <button className="btn btn-primary" onClick={onUpdateTemplate}>Actualizar Plantilla</button>
            </form>
        </div>
    );
};

export default SummernoteEditor; 