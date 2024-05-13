import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils"
import {Providers} from "@/utils/providers";
import React from "react";
import {APP_NAME} from "@/config/app";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: APP_NAME,
    description: "İlk çalışmalar",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="tr">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
