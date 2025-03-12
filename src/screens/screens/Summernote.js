import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import 'summernote/dist/lang/summernote-en-US';
import { useEffect, useState } from "react";

const SummernoteEditor = () => {
    const [textName, setTextName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        let selectedLanguage = "Español";
        const changeSummernoteLanguage = (lang) => {
            let textCode = lang === "es-ES" ? "Bienvenidos a mi mundo" : "Welcome to my world";

            $("#summernote").summernote("destroy");
            $("#summernote").summernote({
                placeholder: "Introduce una descripción",
                height: 300,
                lang: lang,
                toolbar: [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["font", ["strikethrough", "superscript", "subscript"]],
                    ["fontsize", ["fontsize"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["misc", ["languageDropdown"]],
                ],
                buttons: {
                    languageDropdown: () => {
                        return $("<button>")
                            .addClass("btn btn-light dropdown-toggle")
                            .on("click", function () {
                                if (lang === "es-ES") {
                                    selectedLanguage = "Español";
                                } else if (lang === "en-US") {
                                    selectedLanguage = "Inglés";
                                }
                                changeSummernoteLanguage(lang);
                            });
                    },
                },
            }).summernote("code", textCode);
        };

        changeSummernoteLanguage(selectedLanguage);

    }, []);

    return (
        <div className="container">
            <h2>Editor de Texto con Summernote</h2>
            <form method="post">
                <label>
                    Nombre:
                </label>
                <input type="text" value={textName} placeholder="Introduce un nombre" />
                <div class="form-group">
                    <label>Descripcion</label>
                    <textarea id="summernote" class="form-control" value={description}></textarea>
                </div>
                <input type="submit" value="Enviar" class="btn btn-primary" />
            </form>
        </div>
    );
};

export default SummernoteEditor;
