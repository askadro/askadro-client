"use client"
import React, {useEffect} from 'react';
import {Providers} from "@/utils/providers";
import "./[locale]/globals.css";
import {useRouter} from "next/navigation";
import {getLocalStorage, setLocalStorage} from "@/utils/storage";
import {LANGUAGE} from "@/config/app";

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        if (!getLocalStorage('lang')) {
            setLocalStorage('lang', LANGUAGE); // Varsayılan dil
            router.push(`/${LANGUAGE}`);
        }
    }, [router]);
    return children

}