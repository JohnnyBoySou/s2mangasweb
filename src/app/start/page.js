'use client';
import React, { useState } from 'react';
import { Column, Row, Title, Label,  ButtonOff, Button} from '../../themes/global';
import './gradient.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Start (){


    const [step, setStep] = useState(1);
    return(
        <Column  style={{ overflow: 'hidden', padding: 44, borderRadius: 8, flexGrow: 1, background: `radial-gradient(circle, #262626, #121212)`,  }}>
        {step == 1 && <Column style={{justifyContent: 'center', alignItems: 'center', marginTop: 100,}}>
            <Row>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
                <Column className='cardoff' style={{width: 100, height: 220, marginLeft: 20, marginRight: 20,}}/>
                <Column className='card' style={{width: 100, height: 220,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
            </Row>
            <Row style={{marginBottom: 60, marginTop: 20,}}>
                <Column className='cardoff' style={{width: 100, height: 20,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 20,}}/>
                <Column className='card' style={{width: 100, height: 20, marginLeft: 20, marginRight: 20,}}/>
                <Column className='cardoff' style={{width: 100, height: 20,}}/>
            </Row>

            <Row>
                <Title style={{fontSize: 72, fontFamily: 'Book', textAlign: 'center', marginTop: 10,}}>Bem vindo ao </Title>
                <Row>
                    <Image src="/star.png" alt="start" width={42} height={42} className='star' style={{marginRight: -20, marginTop: -10,}}/>
                    <h1 className='gradient'>S2mangás.</h1>
                    <Image src="/north.png" alt="north"  className='star' width={42} height={42} style={{marginLeft: -10, marginTop: 60,}}/>
                </Row>
            </Row>
            <Title style={{fontFamily: 'Book', color: "#d8d8d8", }}>Um leitor de mangás completo. Simples, interativo e rápido.</Title>
            <Row style={{marginTop: 50,}} >
            <Link href={`/register`} className='btgo' >
                <span>Começar agora</span>
            </Link>

            <Column className='btof' onClick={() => setStep(2)}>
                <span>Ver funções</span>
            </Column>
          
            </Row>
            </Column>}

            {step == 2 && <Column style={{justifyContent: 'center', alignItems: 'center', marginTop: 100,}}>
                <Row>

                <Column className='cardoff' style={{justifyContent: 'center', alignItems: 'center', width: 260,}}>
                    <Column className='card' style={{borderRadius: 100, width: 106, height: 106, padding: 0,}}/>
                    <Column className='card' style={{borderRadius: 24, width: 106, height: 136, marginBottom: 20, padding: 0,}}/>
                    <Title>Avateres</Title>
                    <Label>Biblioteca de avateres e capas para você personalizar seu perfil.</Label>
                </Column>


                <Column className='cardoff' style={{justifyContent: 'center', alignItems: 'center', width: 260, margin: '0px 40px'}}>
                    <Column className='card' style={{borderRadius: 100, width: 106, height: 106, padding: 0,}}/>
                    <Column className='card' style={{borderRadius: 24, width: 106, height: 136, marginBottom: 20, padding: 0,}}/>
                    <Title>Avateres</Title>
                    <Label>Biblioteca de avateres e capas para você personalizar seu perfil.</Label>
                </Column>


                <Column className='cardoff' style={{justifyContent: 'center', alignItems: 'center', width: 260,}}>
                    <Column className='card' style={{borderRadius: 100, width: 106, height: 106, padding: 0,}}/>
                    <Column className='card' style={{borderRadius: 24, width: 106, height: 136, marginBottom: 20, padding: 0,}}/>
                    <Title>Avateres</Title>
                    <Label>Biblioteca de avateres e capas para você personalizar seu perfil.</Label>
                </Column>

                </Row>

                </Column>}
      </Column>
    )}

    /*<Link href={`/login`} >
    <ButtonOff style={{marginLeft: 15,}}>Entrar</ButtonOff>
    </Link>
        <Title style={{fontFamily: 'Book', fontSize: 20, marginTop: 20,}}>✷ COLEÇÕES ✷ CARDS ✷ CURTIR ✷ SEGUIR ✷ AVATAR ✷ CAPA ✷ MIX ✷ </Title>
    
    */