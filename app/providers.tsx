"use client"

import {ThemeProvider} from "@/helpers/tailwind-material";
import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

export function Providers({children}: { children: any }) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}