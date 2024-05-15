"use client"

import React from "react";
import {
    dehydrate,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import {ThemeProvider} from "@/components/theme-provider";
import HydrateClient from "@/utils/hydrate.client";
import {Toaster} from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip";

export function Providers({
                                    children,
                                }: {
    children: React.ReactNode;
}) {
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
                    <TooltipProvider>
                        {children}
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </HydrateClient>
        </QueryClientProvider>
    );
}

