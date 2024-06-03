"use client"
import React, {useEffect} from 'react';
import {Providers} from "@/utils/providers";
import "./[locale]/globals.css";
import {useRouter} from "next/navigation";
import {getLocalStorage, setLocalStorage} from "@/utils/storage";

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        if (!getLocalStorage('lang')) {
            setLocalStorage('lang', 'tr'); // Varsayılan dil
            router.push('/tr');
        }
    }, [router]);
    return children

}