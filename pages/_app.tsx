import type {AppProps} from 'next/app'
import {HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import { appWithTranslation } from 'next-i18next'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import nextI18NextConfig from '../next-i18next.config.js';

function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </HydrationBoundary>
        </QueryClientProvider>
    )
}

export default appWithTranslation(MyApp,nextI18NextConfig)

/*

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'footer',
            ])),
            // Will be passed to the page component as props
        },
    }
}*/
