import './gradient.css'
import React from 'react';
import { Column, Row, Title, ButtonOff } from '../../themes/global.js'
import Image from 'next/image';
import Link from 'next/link'

export default function Home (){
    return(
        <Column  style={{ overflow: 'hidden', padding: 44, borderRadius: 8, flexGrow: 1, marginBottom: 12, }}>
          
          <Column style={{justifyContent: 'center', alignItems: 'center', }}>
          <Title className='gradient'>S2 mangás</Title>
          <Title style={{fontSize: 42,}}>Simples. Intuítivo. Rápido.</Title>
          <Title style={{fontFamily: 'Book', color: "#d8d8d8", }}>Um leitor de mangás completo. </Title>
          <Row style={{marginTop: 20,}}>
            <Link href={`/register`} >
              <ButtonOff style={{backgroundColor: '#FFF', color: "#262626", }}>Começar agora</ButtonOff>
            </Link>
            <Link href={`/login`} >
              <ButtonOff style={{marginLeft: 15,}}>Entrar</ButtonOff>
            </Link>
          </Row>
          <Title style={{fontFamily: 'Book',}}>✷ COLEÇÕES ✷ CARDS ✷ CURTIR ✷ SEGUIR ✷ AVATAR ✷ CAPA ✷ MIX ✷ </Title>
          </Column>

        </Column>
      )
}


//<Image src="/icon.png" alt="logo s2mangas icon" width={164} height={164} />