import axios from "axios";
import {getLocalStorage} from "@/utils/storage";
import {getSession} from "next-auth/react";

const createAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 15000,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${getLocalStorage("token")}`,
        },
    });
};


export const getApiClient = () => createAxiosInstance();

getApiClient().interceptors.response.use(
    async (config) => {
        if (config) {
            config.headers.Authorization = `Bearer ${getLocalStorage("token")}`;
        }
        console.log(config)
        return config;
    },

    async (error) => {
        console.log("storage token: ", getLocalStorage("token"))
        console.log(error);
    }
)