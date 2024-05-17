import axios from "axios";

const commonHeader = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Authorization: `Bearer ${MMKV.getString('token') || ''}`, // Token yoksa boş string
});
console.log("url api/index: ",process.env.BASE_URL)
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