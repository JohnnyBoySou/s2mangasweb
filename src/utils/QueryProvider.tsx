"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    query?: string;
    variables?: Record<string, any>;
}

export default function QueryProvider({ children }: Props) {
    const [queryClient] = useState(() => new QueryClient());
    return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
}