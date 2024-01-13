
import React from "react"
import ThemeClient from "./page"
import { Column, Row } from "../themes/global"
import Header from '../components/Header'
import Fixed from '../components/Fixed'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'S2Mangás',
  description: 'O seu leitor de mangás moderno.',
  keywords: ['ler mangás', 'S2Mangas', 'mangas', 'Mangas Online',],
  authors: [{ name: 'Johnny', url: 'https://www.instagram.com/joaodesousa.ui' },],
  creator: 'JohnnyBoy',
  publisher: 'S2Mangas Team',
}
export default function RootLayout({ children }) {

  const fixed = false  
  return (
    <html lang="pt-BR">
      <ThemeClient>
      <body>
      <Row>
        <Header  style={{width: '10%'}}/>
        <Column style={{height: '100vh', width: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
        {children}
        <SpeedInsights />
        </Column>
        {fixed && <Fixed style={{width: '20%', height: 400,}}/> }
      </Row>
      </body>
      </ThemeClient>
    </html>
  )
}
