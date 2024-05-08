import type {AppProps} from 'next/app'
import {HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";

export default function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </HydrationBoundary>
        </QueryClientProvider>
    )
}