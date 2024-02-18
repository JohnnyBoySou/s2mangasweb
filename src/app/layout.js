
import React from "react"
import ThemeClient from "./page"
import { Column, Row } from "../themes/global"
import Header from '../components/Header'
import Fixed from '../components/Fixed'
import { SpeedInsights } from "@vercel/speed-insights/next"
import NavBar from "../components/NavBar"

export const metadata = {
  title: 'S2Mangás',
  description: 'O seu leitor de mangás moderno.',
  keywords: ['ler mangás', 'S2Mangas', 'mangas', 'Mangas Online',],
  authors: [{ name: 'Johnny', url: 'https://www.instagram.com/joaodesousa.ui' },],
  creator: 'JohnnyBoy',
  publisher: 'S2Mangas Team',
}

import StyledComponentsRegistry from '../lib/registry'


export default function RootLayout({ children }) {

  const fixed = true  
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <ThemeClient>
      <StyledComponentsRegistry>
      <body  style={{ overflow: 'hidden', }} >
      <Row>
        <Header />
        <Column style={{width: '100%', height: '97vh', overflow: 'hidden', backgroundColor: "#262626", borderRadius: 12, marginTop: 12, marginBottom: 0, marginRight:12,}}>
          {children}
        </Column>
         <SpeedInsights />
        {fixed && <Fixed /> }
      </Row>
      </body>
      </StyledComponentsRegistry>

      </ThemeClient>
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

//<NavBar/>