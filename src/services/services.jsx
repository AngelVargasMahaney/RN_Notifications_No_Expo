import axios from "axios";
import { URL_BACKEND } from "../environments/environments";

axios.interceptors.request.use(async (config) => {
    // const token = await AsyncStorage.getItem('token')
    const token = 'a'
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

let dataSolicitarFirma = {
    "data": {
        "nombre": "test",
        "roles": [1, 2, 3],
        "adicional": [
            {
                "id": 1,
                "name": "test"
            },
            {
                "id": 1,
                "name": "test"
            }
        ]
    },
    "key_id": "#asd123",
    "user_origin_id": 7,
    "user_destiny_id": 8
}

let config = {

}

export const solicitarFirma = (data) => {
    data = dataSolicitarFirma
    const rpta = axios.post(`${URL_BACKEND}/app/ask/notificate`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
    return rpta
}