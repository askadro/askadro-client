import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getApiClient,setToken} from "@/api/index";
import {LOGIN, LOGOUT, VALIDATE_TOKEN} from "@/api/paths";
import {clearAllLocalStorage, clearLocalStorage, getLocalStorage, setLocalStorage} from "@/utils/storage";


export function Login(debounceTime: number = 0) {
    return useMutation({
        mutationFn: async ({username, password}: any) => {
            const res = await getApiClient().post(LOGIN, {username, password});
            return res.data
        },
        onSuccess: (data) => {
            setLocalStorage('token', data.access_token);
            setToken(data.access_token)
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
            const res = await getApiClient().post(VALIDATE_TOKEN, {token});
            return res.data
        }
    })
}

export function Logout(debounceTime: number = 0) {
    return useMutation({
        mutationFn: async () => {
            const res = await getApiClient().post(LOGOUT);
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

