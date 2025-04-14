import { useContext } from "react";
import ScreensContext from "../screens/ScreensContext";

const urlData = process.env.REACT_APP_URL_API;
const endPointLanguage = process.env.REACT_APP_LANGUAGES;
const endPointContexts = process.env.REACT_APP_CONTEXTS;
const endPointVariables = process.env.REACT_APP_VARIABLES;
const endPointListTemplatesByContext = process.env.REACT_APP_TEMPLATES;
const endPointPostTemplate = process.env.REACT_APP_CREATETEMPLATE;
const endPointUpdateTemplate = process.env.REACT_APP_UPDATETEMPLATE;

const DropdownTemplate = () => {
  const { setAlert, setVisibleAlert } = useContext(ScreensContext);
  getDataApi(setAlert, setVisibleAlert);
  getDataContexts(setAlert, setVisibleAlert);
  getPlaceholdersContexts(setAlert, setVisibleAlert);
  getTemplatesContexts(setAlert, setVisibleAlert);
  updateTemplateApi(setAlert, setVisibleAlert);
}

export default DropdownTemplate;

export const getDataApi = async (setAlert, setVisibleAlert) => {
  try {
    const response = await fetch(`${urlData}${endPointLanguage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer kiPuzuNhBCevGS30XJbJpZQOs1tbHzy7bY0DqFinmhlyU+UkB2ylHWXN/qCoQpZ/0Jxkb1+OgTWN5FqogEPwnM5uDr2Jl16ck3nKkHiEmy7WAOBsZsTvKWGR+LLnQiOc8PlxlxX90Vosg0jVRLaSX/LVVuVcez49zn2knuR0m2YIx/hjLamEyZ3zZORtrJiYGafUZ5pdETZoXyYUiP7zzAS1vXvGsXCQ34filnSBoaOcriO6rVkyie+J9+k6X/2wyYVKrlvluBxBO9UJrD2FL0Vxv8az5RCE+jMqzNpQjZVvfqqHgaTbpz+6QrytWmFm9GE4w78fXihXmCw8hk+PxFW6qk/d62EqD85ng+stvnBnbcD1tkRf2SdTRUk6elBGtcEIZmIGACvtMmqSL8p7uNXcAMjRT/TKgPW+SaEa7OruFh5BNw5Tk1idvJRuUBgn6fHju0otUs9zR6zBaIHBrJJ3QGkI1IT17+um8XJ7OsWrkulNgDaBBqXAQADE8ooYK2aJG07CXd+Sef1tebvP+J9I1xr2GrPyqp9ApU0m3uUjrJ4LssduMqZeSphxcgpo'
      },
      body: {},
    });

    if (response.ok) return await response.json();
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

export const getTemplatesContexts = async (idContext, setAlert, setVisibleAlert) => {
  try {
    if (endPointListTemplatesByContext) {
      const response = await fetch(`${endPointListTemplatesByContext}/${idContext}`);
      if (response.ok) return await response.json();
    }
  } catch (error) {
    setAlert("Error al realizar la petición: " + error);
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