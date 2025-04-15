const endPointLanguage = process.env.REACT_APP_LANGUAGES;
const endPointContexts = process.env.REACT_APP_CONTEXTS;
const endPointContextsById = process.env.REACT_APP_CONTEXTS_BY_ID;
const endPointVariables = process.env.REACT_APP_VARIABLES;
const endPointListTemplatesByContext = process.env.REACT_APP_TEMPLATES;
const endPointPostTemplate = process.env.REACT_APP_CREATE_TEMPLATE;
const endPointUpdateTemplate = process.env.REACT_APP_UPDATE_TEMPLATE;
const endPointDeleteTemplate = process.env.REACT_APP_DELETE_TEMPLATE;

export const getDataApi = async (setAlert, setVisibleAlert) => {
  try {
    if (endPointLanguage) {
      const response = await fetch(`${endPointLanguage}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al realizar la petición: " + error.message);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const getDataContexts = async (setAlert, setVisibleAlert) => {
  try {
    if (endPointContexts) {
      const response = await fetch(`${endPointContexts}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al realizar la petición: " + error.message);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const getPlaceholdersContexts = async (idContext, setAlert, setVisibleAlert) => {
  try {
    if (endPointVariables) {
      const response = await fetch(`${endPointVariables}/${idContext}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al realizar la petición: " + error.message);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const getTemplatesContexts = async (id, setAlert, setVisibleAlert) => {
  try {
    if (endPointListTemplatesByContext) {
      const response = await fetch(`${endPointListTemplatesByContext}/${id}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al realizar la petición: " + error);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const listContextById = async (id, setAlert, setVisibleAlert) => {
  try {
    if (endPointContextsById) {
      const response = await fetch(`${endPointContextsById}/${id}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al obtener el contexto indicado: " + error);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const filterInfoTemplate = async (setAlert, setVisibleAlert, data) => {
  try {
    let response = [];
    response = [
      {
        "pageModel":
        {
          "page": data.page,
          "size": data.rows,
          "orderBy": "id",
          "orientation": "desc"
        },
        "filter":
        {
          "search": data.nameTemplate,
          "context": data.context,
          "department": null,
          "assignedWorker": null,
          "creatorWorker": null
        }
      }
    ];
    return response;
  } catch (error) {
    setAlert("Error al realizar el filtrado: " + error.message);
    setVisibleAlert(true);
    return console.log(error);
  }
};

export const createTemplate = async (body, setAlert, setVisibleAlert) => {
  try {
    const response = await fetch(`${endPointPostTemplate}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) return await response.json();
  } catch (error) {
    setAlert("Ha habido un error al crear la plantilla: " + error.message);
    setVisibleAlert(true);
    console.error('There was a problem with the POST request:', error);
  }
};


export const updateTemplateApi = async (body, setAlert, setVisibleAlert) => {
  try {
    const response = await fetch(`${endPointUpdateTemplate}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (response.ok) return await response.json();
  } catch (error) {
    setAlert("Ha habido un error al actualizar la plantilla: " + error.message);
    setVisibleAlert(true);
    console.error('Ha habido un problema para actualizar:', error);
  }
};

export const deleteTemplateDB = async (idTemplate, setAlert, setVisibleAlert) => {
  try {
    if (endPointDeleteTemplate) {
      const response = await fetch(`${endPointDeleteTemplate}/${idTemplate}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al eliminar la plantilla: " + error.message);
    setVisibleAlert(true);
    console.error('Ha habido un problema para actualizar:', error);
  }
};