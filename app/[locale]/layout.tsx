import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils"
import {Providers} from "@/utils/providers";
import React from "react";
import {APP_NAME} from "@/config/app";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, unstable_setRequestLocale} from "next-intl/server";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: APP_NAME,
    description: "İlk çalışmalar",
};

export default async function LocaleLayout({
                                               children,
                                               params: {locale}
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    return (
        <html lang={locale}>
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
        <Providers>
            <NextIntlClientProvider messages={messages}>
                {children}
            </NextIntlClientProvider>
        </Providers>
        </body>
        </html>
    );
}
