"use client"


import React from "react";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import {ThemeProvider} from "@/components/theme-provider";

export function Providers({children}: { children: any }) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}

