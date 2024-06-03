import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {apiClient} from "@/api/index";
import {LOGIN, LOGOUT, VALIDATE_TOKEN} from "@/api/paths";
import {clearAllLocalStorage, clearLocalStorage, getLocalStorage, setLocalStorage} from "@/utils/storage";
import {redirect} from "next/navigation"


export function Login(debounceTime: number = 0) {
    return useMutation({
        mutationFn: async ({username, password}: any) => {
            const res = await apiClient.post(LOGIN, {username, password});
            return res.data
        },
        onSuccess: (data) => {
            setLocalStorage('token', data.access_token);
            if (data.rememberMe) {
                setLocalStorage('rememberedUser', {
                    username: data.username,
                    password: data.password,
                });
            } else {
                clearLocalStorage('rememberedUser');
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });
}

export function ValidateToken(debounceTime: number = 0) {
    return useMutation({
        mutationFn: async (token: string) => {
            const res = await apiClient.post(VALIDATE_TOKEN, {token});
            return res.data
        }
    })
}

export function Logout(debounceTime: number = 0) {
    return useMutation({
        mutationFn: async () => {
            const res = await apiClient.post(LOGOUT);
            clearAllLocalStorage();
            return res.data
        },
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });
}

