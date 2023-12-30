import React from "react"
import ThemeClient from "./page"
export const metadata = {
  title: 'S2Mangás',
  description: 'O melhor jeito de ler mangás',
}
export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <ThemeClient>
      <body>
          {children}
      </body>
      </ThemeClient>
    </html>
  )
}
