import React from 'react';
import { Column, Row, Title, Label, ButtonPrimaryLight, ButtonOff } from '../../themes/global.js'
import Image from 'next/image';
import Link from 'next/link'

export default function Start (){
    const currentVersion = '1.2'
    return(
        <Column  style={{backgroundColor: "#ED274A", overflow: 'hidden', padding: 44, borderRadius: 8, marginTop: 12,flexGrow: 1, marginBottom: 12, }}>
        <Image src="/icon.png" alt="logo s2mangas icon" width={64} height={64} className='imgicon'/>
            <Column className='marq'>
                <Title className="marqueeStyle" style={{fontFamily: 'Book',}}>✷ COLEÇÕES ✷ CARDS ✷ CURTIR ✷ SEGUIR ✷ AVATAR ✷ CAPA ✷ MIX ✷ </Title>
            </Column>
        
          <Title style={{fontFamily: 'Intro', fontSize: 82, marginBottom: 0,}}>S2mangas v{currentVersion}</Title>
          
          <Title style={{fontSize: 42,}}>Simples. Intuítivo. Rápido.</Title>
          <Title style={{fontFamily: 'Book',}}>Um leitor de mangás completo. </Title>
          <Row style={{marginTop: 20,}}>
            <Link href={`/register`} >
              <ButtonPrimaryLight>Começar agora</ButtonPrimaryLight>
            </Link>
            <Link href={`/login`} >
              <ButtonOff style={{marginLeft: 15,}}>Entrar</ButtonOff>
            </Link>
          </Row>
        </Column>
      )
}