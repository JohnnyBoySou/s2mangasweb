import React from "react"
import ThemeClient from "./page"
import { Column, Row } from "../themes/global"
import Header from '../components/Header'
import Fixed from '../components/Fixed'

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
      <Row>
        <Header  style={{width: '10%'}}/>
        <Column style={{height: '100vh', width: '70%', overflowY: 'auto', overflowX: 'hidden'}}>
        {children}
        </Column>
         <Fixed style={{width: '20%'}}/> 
      </Row>
      </body>
      </ThemeClient>
    </html>
  )
}
