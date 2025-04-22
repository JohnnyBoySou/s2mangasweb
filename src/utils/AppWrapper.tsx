"use client";

import localFont from "next/font/local";
import { AuthProvider } from "@/context/auth-context";
import QueryProvider from "@/utils/QueryProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./global.css"
const circular = localFont({
  src: [
  {
    path:"../../public/fonts/Circular_Black.ttf",
    weight: '900',
    style: 'normal',
  },
  {
    path:"../../public/fonts/Circular_Bold.ttf",
    weight: '700',
    style: 'normal',
  },
  {
    path:"../../public/fonts/Circular_Medium.ttf",
    weight: '500',
    style: 'normal',
  },
  {
    path:"../../public/fonts/Circular_Book.ttf",
    weight: '400',
    style: 'normal',
  },
  ],
  display: 'swap',
  variable: '--font-circular',
})

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={circular.className}>
    <QueryProvider>
      <AuthProvider>
        {children}
        <SpeedInsights />
      </AuthProvider>
    </QueryProvider>
    </div>
  );
}
