import React, { useEffect, useState, useRef, useCallback } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import "./summernote.css";

const SummernoteEditor = () => {
    const [textName, setTextName] = useState('');
    const [language, setLanguage] = useState("es-ES");
    const editorRef = useRef(null);
    const [selectedLanguageDropdown, setSelectedLanguageDropdown] = useState("Español");

    const changeSummernoteLanguage = useCallback((lang) => {
        let textCode = lang === "es-ES" ? "Bienvenidos a mi mundo" : "Welcome to my world";

        $(editorRef.current).summernote("destroy");
        $(editorRef.current).summernote({
            placeholder: "Introduce una descripción",
            height: 300,
            lang: lang,
            toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ['language', ['languageDropdown']],
                ['edit', ['edit']]
            ],
            buttons: {
                edit: editText,
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
                            contents: '<li><a href="#" data-lang="es-ES">Español</a></li>' +
                                '<li><a href="#" data-lang="en-US">Inglés</a></li>',
                            callback: function ($dropdown) {
                                $dropdown.find('a').on('click', function (e) {
                                    e.preventDefault();
                                    const newLang = $(this).data('lang');
                                    setLanguage(newLang)
                                    if (newLang === "es-ES") {
                                        setSelectedLanguageDropdown("Español");
                                    } else if (newLang === "en-US") {
                                        setSelectedLanguageDropdown("Inglés");
                                    }
                                });

                                $('.note-status-output').html(
                                    '<div class="alert alert-danger">' +
                                    'This is an error using a Bootstrap alert that has been restyled to fit here.' +
                                    '</div>'
                                );
                            }
                        })
                    ]);
                    return button.render();
                },
            },
        }).summernote("code", textCode);
    }, [selectedLanguageDropdown]);

    const editText = (context) => {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: '<i class="fa fa-pencil"></i> Editar',
            tooltip: 'Boton para editar',
            click: function () {
                context.invoke('editor.insertText', 'hello');
            }
        });

        return button.render();
    }

    useEffect(() => {
        changeSummernoteLanguage(language);
    }, [language, changeSummernoteLanguage]);

    return (
        <div className="container">
            <h2 className="mb-4">Editor de Texto con Summernote</h2>
            <form method="post">
                <div>
                    <label className="m-2">
                        Nombre:
                    </label>
                    <input type="text" value={textName} onChange={(e) => setTextName(e.target.value)}
                        placeholder="Introduce un nombre" />
                </div>
                <div className="form-group mt-4 mb-3">
                    <label className="mb-3">Descripcion</label>
                    <textarea ref={editorRef} id="summernote" className="form-control"></textarea>
                </div>
                <input type="submit" value="Enviar" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default SummernoteEditor; 
