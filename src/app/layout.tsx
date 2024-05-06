
import {Inter} from 'next/font/google';
import React from 'react';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import {cn} from '@/lib/utils';
import Head from 'next/head';
import {ThemeProvider} from "../components/tailwind/index";
import {NavBar} from "@/components/dusiness";

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <div className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
                    <Head>
                        <title>Askadrovip - İnsan Kaynakları</title>
                    </Head>
                    {children}
                </div>
            </ThemeProvider>
        </ReactQueryProvider>
    );
}

