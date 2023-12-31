import React from "react"
import ThemeClient from "./page"
export const metadata = {
  title: 'S2Mangás',
  description: 'O seu leitor de mangás moderno.',
  keywords: ['ler mangás', 'S2Mangas', 'mangas', 'Mangas Online',],
  authors: [{ name: 'Johnny', url: 'https://www.instagram.com/joaodesousa.ui' },],
  creator: 'JohnnyBoy',
  publisher: 'S2Mangas Team',
}
export default function RootLayout({ children }) {
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
