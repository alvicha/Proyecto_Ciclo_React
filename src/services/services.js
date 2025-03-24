/*
const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) return await response.json();
  } catch (error) {
    return console.log(error);
  }
};
*/
export const getDataApi = async () => {
  try {
    //const url = '';
    const response = [
      {
        "id": 3,
        "code": "es",
        "value": "Español",
        "isDefault": false,
        "isFrontEnd": true
      },
      {
        "id": 4,
        "code": "en",
        "value": "English",
        "isDefault": true,
        "isFrontEnd": true
      }
    ];
    return response;
  } catch (error) {
    return console.log(error);
  }
};


export const getDataContexts = async () => {
  try {
    //const url = '';
    const response = [
      {
        "id": 1,
        "code": "USER_MANAGEMENT"
      },
      {
        "id": 2,
        "code": "CASE_MANAGEMENT"
      },
      {
        "id": 3,
        "code": "CSV_MANAGEMENT"
      },
      {
        "id": 4,
        "code": "SHOP_RESERVATION_MANAGEMENT"
      },
      {
        "id": 5,
        "code": "SECURITY_MANAGEMENT"
      },
      {
        "id": 6,
        "code": "HOUSEKEEPING_MANAGEMENT"
      },
      {
        "id": 7,
        "code": "MINIBAR_MANAGEMENT"
      },
      {
        "id": 8,
        "code": "WALLET_MANAGEMENT"
      }
    ];
    return response;
  } catch (error) {
    return console.log(error);
  }
};

export const getPlaceholdersContexts = async (searchPlaceholder) => {
  try {
    //const url = '';
    let response = "";
    switch (searchPlaceholder) {
      case 'USER_MANAGEMENT':
        response = [
          {
            "id": 28,
            "code": "DEPARTMENT_ID"
          },
          {
            "id": 29,
            "code": "SHOP_RESERVATION_MEMBER_HOLDER"
          }
        ]
        break;
      case 'CASE_MANAGEMENT':
        response = [
          {
            "id": 55,
            "code": "ROOM_PEPE"
          },
          {
            "id": 56,
            "code": "GUEST_NAME"
          }
        ]
        break;
      case 'CSV_MANAGEMENT':
        response = [
          {
            "id": 59,
            "code": "WALLET_DAYS_FOR_SAVED_BALANCE_EXPINATION"
          }
        ]
        break;
      case 'SHOP_RESERVATION_MANAGEMENT':
        response = [
          {
            "id": 57,
            "code": "HOTEL_NAME"
          }
        ]
        break;
      case 'SECURITY_MANAGEMENT':
        response = [
          {
            "id": 60,
            "code": "WALLET_TOKEN"
          }
        ]
        break;
      case 'HOUSEKEEPING_MANAGEMENT':
        response = [
          {
            "id": 61,
            "code": "WALLET_BALANCE"
          }
        ]
        break;
      case 'MINIBAR_MANAGEMENT':
        response = [
          {
            "id": 62,
            "code": "SHOP_MAP_URL"
          }
        ]
        break;
      case 'WALLET_MANAGEMENT':
        response = []
        break;
      default:
        response = [];
    }
    return response;
  } catch (error) {
    return console.log(error);
  }
};

export const getTemplatesContexts = async (context) => {
  try {
    //const url = '';
    let response = "";
    switch (context) {
      case 'USER_MANAGEMENT':
        response = [
          {
            "id": 1,
            "code": "USER_RESET_PASSWORD",
            "data": {
              "es": {
                "content": '<div><h1>Restablecimiento de contraseña</h1><p>Hola.</p><p>Ha recibido este mensaje porque se ha realizado una petición de restablecimiento de contraseña para el usuario {{USER_NAME}} {{USER_SURNAME}}.</p><p>Para restablecer la contraseña haga click<a href="{{USER_RECOVER_URL}}"> aquí</a>.</p><p> Recuerde que solo el último email recibido es válido. </p><p>Saludos,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": 'GUEXT 1080: Restablecimiento de contraseña.'
              },
              "en": {
                "content": '<div><h1>Password reset</h1><p>Hello.</p><p>You have received this message because it has been asked a password reset for the user {{USER_NAME}} {{USER_SURNAME}}.</p><p>In order to reset the password click<a href="{{USER_RECOVER_URL}}">here</a>.</p><p>Greetings,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT1080: Password reset."
              }
            }
          },
        ]
        break;
      case 'CASE_MANAGEMENT':
        response = [
          {
            "id": 55,
            "code": "ROOM_CODE",
            "data": {
              "es": {
                "content": '<div><p>Hola.</p><p>La tarea {{CASE_ID}} lleva más de {{CASE_ALERT_TIME}} en el estado {{CASE_STATUS}}.</p><p style="text-decoration:underline"><strong>RESUMEN DE LA TAREA</strong></p><table><tbody><tr><td style="text-align:left"><strong>Descripción:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Tipo:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Ubicación:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Asignada a:</strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Motivo:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Saludos,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT 1080: Alerta sobre tarea."
              },
              "en": {
                "content": '<div><p>Hello.</p><p>The task {{CASE_ID}} remains more than {{CASE_ALERT_TIME}} with the {{CASE_STATUS}} status.</p><p style="text-decoration:underline"><strong>TASK SUMMARYd</strong></p><table><tbody><tr><td style="text-align:left"><strong>Description:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Type:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Location:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Assigned to:<strong></strong></strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Reason:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Greetings,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT1080: Case alert."
              }
            }
          },
          {
            "id": 56,
            "code": "GUEST_NAME",
            "data": {
              "es": {
                "content": '<div><p>Hola.</p><p>La tarea {{CASE_ID}} lleva más de {{CASE_ALERT_TIME}} en el estado {{CASE_STATUS}}.</p><p style="text-decoration:underline"><strong>RESUMEN DE LA TAREA</strong></p><table><tbody><tr><td style="text-align:left"><strong>Descripción:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Tipo:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Ubicación:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Asignada a:</strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Motivo:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Saludos,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT 1080: Alerta sobre tarea."
              },
              "en": {
                "content": '<div><p>Hello.</p><p>The task {{CASE_ID}} remains more than {{CASE_ALERT_TIME}} with the {{CASE_STATUS}} status.</p><p style="text-decoration:underline"><strong>TASK SUMMARYd</strong></p><table><tbody><tr><td style="text-align:left"><strong>Description:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Type:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Location:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Assigned to:<strong></strong></strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Reason:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Greetings,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT1080: Case alert."
              }
            }
          }
        ]
        break;
      case 'CSV_MANAGEMENT':
        response = [
          {
            "id": 59,
            "code": "WALLET_DAYS_FOR_SAVED_BALANCE_EXPINATION"
          }
        ]
        break;
      case 'SHOP_RESERVATION_MANAGEMENT':
        response = [
          {
            "id": 3,
            "code": "CASE_ALERT",
            "data": {
              "es": {
                "content": '<div><p>Hola.</p><p>La tarea {{CASE_ID}} lleva más de {{CASE_ALERT_TIME}} en el estado {{CASE_STATUS}}.</p><p style="text-decoration:underline"><strong>RESUMEN DE LA TAREA</strong></p><table><tbody><tr><td style="text-align:left"><strong>Descripción:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Tipo:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Ubicación:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Asignada a:</strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Motivo:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Saludos,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT 1080: Alerta sobre tarea."
              },
              "en": {
                "content": '<div><p>Hello.</p><p>The task {{CASE_ID}} remains more than {{CASE_ALERT_TIME}} with the {{CASE_STATUS}} status.</p><p style="text-decoration:underline"><strong>TASK SUMMARYd</strong></p><table><tbody><tr><td style="text-align:left"><strong>Description:</strong></td><td style="text-align:left">{{CASE_DESCRIPTION}}</td></tr><tr><td style="text-align:left"><strong>Type:</strong></td><td style="text-align:left">{{CASE_TYPE_3}}</td></tr><tr><td style="text-align:left"><strong>Location:</strong></td><td style="text-align:left">{{CASE_LOCATION_TYPE}} - {{CASE_LOCATION_CODE}}</td></tr><tr><td style="text-align:left"><strong>Assigned to:<strong></strong></strong></td><td style="text-align:left">{{CASE_SOLVER_NAME}} {{CASE_SOLVER_SURNAME}}</td></tr><tr><td style="text-align:left"><strong>Reason:</strong></td><td style="text-align:left">{{CASE_SCHEDULED_REASON}}</td></tr></tbody></table><p>Greetings,<br><b>GUEXT 1080</b></p><p>Powered by NETHITS</p></div>',
                "subject": "GUEXT1080: Case alert."
              }
            }
          }
        ]
        break;
      case 'SECURITY_MANAGEMENT':
        response = []
        break;
      case 'HOUSEKEEPING_MANAGEMENT':
        response = []
        break;
      case 'MINIBAR_MANAGEMENT':
        response = [
          {
            "id": 62,
            "code": "SHOP_MAP_URL"
          }
        ]
        break;
      case 'WALLET_MANAGEMENT':
        response = []
        break;
      default:
        response = [];
    }
    return response;
  } catch (error) {
    return console.log(error);
  }
};


export const postDataTemplate = async (body) => {
  try {
    let url = '';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (response.ok) return await response.json();
  } catch (error) {
    console.error('There was a problem with the POST request:', error);
  }
};


export const updateTemplateApi = async (body) => {
  try {
    let url = '';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (response.ok) return await response.json();
  } catch (error) {
    console.error('Ha habido un problema para actualizar:', error);
  }
};