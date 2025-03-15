import { useEffect, useState } from 'react';

const DropdownTemplate = ({ templates, setSelectedTemplate, setSelectedTemplateContent, codeLanguage, setCodeLanguage }) => {

    const handleTemplateChange = (event) => {
        const selectedTemplate = templates.find(template => template.code === event.target.value);
        setSelectedTemplate(selectedTemplate);
        if (selectedTemplate) {
            setSelectedTemplateContent(selectedTemplate.data[codeLanguage]?.content || '');
        }
    };

    const handleLanguageChange = (event) => {
        setCodeLanguage(event.target.value);
    };

    return (
        <div>
            <div className="dropdown mb-3">
                <label className="form-label">Selecciona Plantilla</label>
                <select
                    className="form-select"
                    onChange={handleTemplateChange}
                >
                    {templates.map((template) => (
                        <option key={template.code} value={template.code}>
                            {template.code}
                        </option>
                    ))}
                </select>
            </div>

            <div className="dropdown mb-3">
                <label className="form-label">Selecciona Idioma</label>
                <select
                    className="form-select"
                    value={codeLanguage}
                    onChange={handleLanguageChange}
                >
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                </select>
            </div>
        </div>
    );
};

export default DropdownTemplate;
