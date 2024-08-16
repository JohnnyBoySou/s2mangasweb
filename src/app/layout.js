import React from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "@hooks/providers"

export const metadata = {
  title: 'S2Mangás',
  description: 'O seu leitor de mangás moderno.',
  keywords: ['ler mangás', 'S2Mangas', 'mangas', 'Mangas Online',],
  authors: [{ name: 'Johnny', url: 'https://www.instagram.com/https.joaodesousa' },],
  creator: 'JohnnyBoy',
  publisher: 'S2Mangas Team',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <Providers>
        <body>
          {children}
          <SpeedInsights />
        </body>
      </Providers>
    </html>
  )
}

RootLayout.getLayoutProps = () => ({
  title: metadata.title,
  description: metadata.description,
  script: {
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7579936116181719",
    async: true,
    crossOrigin: "anonymous"
  }
});
