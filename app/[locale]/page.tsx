"use client"

import {getLocalStorage} from "@/utils/storage";
import {useEffect} from "react";
import {redirect, useRouter} from "next/navigation";
import {LANGUAGE} from "@/config/app";
import {jwtDecode} from 'jwt-decode';

export default function LocalPage() {
    const token = getLocalStorage("token")
    const router = useRouter()
    // const {mutate: validateToken, data: isValidate} = ValidateToken()
    const reLink = (path: string) => {
        return redirect(`${LANGUAGE}/${path}`);
    }
    useEffect(() => {
        if (token) {
            console.log("token", token)
            const decodedToken = jwtDecode(token);
            // @ts-ignore
            const expirationTime = decodedToken?.exp * 1000; // Convert to milliseconds
            const currentTime = new Date().getTime();

            if (currentTime >= expirationTime) {
                // Token süresi dolmuş, çıkış yap
                handleLogout();
            } else {
                // Token süresini izlemeye devam et
                const timeoutId = setTimeout(() => {
                    handleLogout();
                }, expirationTime - currentTime);

                // Component unmounted olduğunda timeout'u temizleyin
                return () => clearTimeout(timeoutId);
            }
        }
    }, [token]);

    const handleLogout = () => {
        // Token'ı temizleyin ve giriş sayfasına yönlendirin
        console.log("token sürexzsi bitmiş")
        localStorage.removeItem('token');
        router.push(`${LANGUAGE}/auth/login`);
    };
    return null
}
