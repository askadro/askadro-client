import axios from "axios";
import {getLocalStorage} from "@/utils/storage";

const commonHeader = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getLocalStorage('token') || ''}`, // Token yoksa boş string
});
console.log("url api/index: ",process.env.BASE_URL)
console.log("common header: ",commonHeader().Authorization)
export const apiClient = axios.create({
    baseURL:process.env.BASE_URL,
    timeout: 15000,
    withCredentials: false,
    headers: commonHeader(), // Başlıkları ortak başlıkla başlat
});

apiClient.interceptors.response.use(
    function (response) {
        // Başarılı yanıt işleme
        return response;
    },
    async function (error) {
        console.log(error);
    }
)