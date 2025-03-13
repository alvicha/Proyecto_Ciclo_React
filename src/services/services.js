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
    let response = "";

    switch (searchPlaceholder.code) {
      case 'USER_MANAGEMENT':
        response = [
          { "id": 28, "code": "DEPARTMENT_ID" },
          { "id": 29, "code": "SHOP_RESERVATION_MEMBER_HOLDER" }
        ];
        break;

      case 'CASE_MANAGEMENT':
        response = [
          { "id": 55, "code": "ROOM_CODE" },
          { "id": 56, "code": "GUEST_NAME" }
        ];
        break;
      case 'CSV_MANAGEMENT':
        response = [
          { "id": 57, "code": "WALLET_DAYS_FOR_SAVED_BALANCE_EXPIRATION" }
        ];
        break;
      case 'SHOP_RESERVATION_MANAGEMENT':
        response = [
          { "id": 58, "code": "HOTEL_NAME" }
        ];
        break;

      case 'SECURITY_MANAGEMENT':
        response = [
          { "id": 59, "code": "WALLET_TOKEN" }
        ];
        break;

      case 'HOUSEKEEPING_MANAGEMENT':
        response = [
          { "id": 60, "code": "WALLET_BALANCE" }
        ];
        break;

      case 'MINIBAR_MANAGEMENT':
        response = [
          { "id": 61, "code": "SHOP_MAP_URL" }
        ];
        break;

      case 'WALLET_MANAGEMENT':
        response = [
          { "id": 62, "code": "PANIC_LOCATION" }
        ];
        break;

      default:
        response = [];
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
