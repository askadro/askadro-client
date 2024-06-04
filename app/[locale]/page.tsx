"use client"

import {getLocalStorage} from "@/utils/storage";
import {ValidateToken} from "@/api/auth";
import {useEffect} from "react";
import {redirect} from "next/navigation";


export default function LocalPage() {
    const token = getLocalStorage("token")
    const {mutate: validateToken, data: isValidate} = ValidateToken()
    const reLink = (path:string)=> {
        return redirect(`${getLocalStorage("lang")}/${path}`);
    }
    useEffect(() => {
        if (token) {
            validateToken(token)
        } else {
            reLink("auth/login")
        }
    }, [token, validateToken]);

    useEffect(() => {
        if (isValidate?.isValid) {
            redirect(`${getLocalStorage("lang")}/`)
        } else {
            reLink("dashboard")
            if (window !== undefined) {
                window.location.reload()
            }
        }
    }, [isValidate]);

    return null
}
