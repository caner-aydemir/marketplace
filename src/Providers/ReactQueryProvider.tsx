"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query için bir QueryClient oluşturuyorum
const queryClient = new QueryClient();

// React Query Provider bileşenimi tanımlıyorum
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    // Tüm uygulamamda React Query'yi etkinleştirmek için Provider'ı sarıyorum
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
