import '@/styles/globals.css';
import React from "react";
import {Button, ThemeProvider} from "@tailwind";
import {AppProps} from "next/app";

export default function MyApp({ Component, pageProps }:AppProps) {
    return (
        <ThemeProvider>
            {/*<NavBar />*/}
            <Button title={"sss"} placeholder={""} onPointerEnterCapture={()=>{}}
                    onPointerLeaveCapture={()=>{}}>sss</Button>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}