"use client";

import { AuthProvider } from "@/context/auth-context";
import QueryProvider from "@/utils/QueryProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./global.css"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <SpeedInsights />
      </AuthProvider>
    </QueryProvider>
  );
}
