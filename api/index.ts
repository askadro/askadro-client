import axios from "axios";
import {getLocalStorage} from "@/utils/storage";

// const commonHeader = () => ({
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     Authorization: `Bearer ${getLocalStorage('token') || ''}`, // Token yoksa boş string
// });
// console.log("url api/index: ",process.env.BASE_URL)
// console.log("common header: ",commonHeader().Authorization)
// export const apiClient = axios.create({
//     baseURL:process.env.BASE_URL,
//     timeout: 15000,
//     withCredentials: false,
//     headers: commonHeader(), // Başlıkları ortak başlıkla başlat
// });

let token: null = null;

const createAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 15000,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${getLocalStorage("token") || token}`,
        },
    });
};

let apiClient = createAxiosInstance();

export const setToken = (newToken: null) => {
    console.log("token",newToken)
    token = newToken;
    apiClient = createAxiosInstance();
};

export const getApiClient = () => apiClient;

apiClient.interceptors.response.use(
    function (response) {
        // Başarılı yanıt işleme
        return response;
    },
    async function (error) {
        console.log("token, ",token)
        console.log(error);
    }
)