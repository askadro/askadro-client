"use client"


import React, {Suspense} from "react";
import {
    dehydrate,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import {ThemeProvider} from "@/components/theme-provider";
import HydrateClient from "@/utils/hydrate.client";
import {Toaster} from "@/components/ui/toaster";

export function Providers({children}: { children: any }) {
    const [queryClient] = React.useState(() => new QueryClient())
    const dehydratedState = dehydrate(queryClient);
    return (
        <QueryClientProvider client={queryClient}>
            <HydrateClient state={dehydratedState}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Suspense
                        fallback={
                            <p style={{textAlign: "center"}}>loading... on initial request</p>
                        }
                    >
                        {children}
                    </Suspense>
                    <Toaster/>
                </ThemeProvider>
            </HydrateClient>
        </QueryClientProvider>
    );
}

