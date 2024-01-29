'use client';
import React, { useState } from 'react';
import { Column, Row, Title, Label,  ButtonOff, Button} from '../../themes/global';
import './gradient.css'
import Link from 'next/link'
import Image from 'next/image'
import { geral } from '../../requests/shop/avatars';
import { geralbg } from '../../requests/shop/capas';

export default function Start (){

    const [avatar, setAvatar] = useState();

    const [step, setStep] = useState(1);
    return(
        <Column  style={{ overflow: 'hidden', padding: 44, borderRadius: 8, flexGrow: 1, background: `radial-gradient(circle, #262626, #121212)`,  }}>
        {step == 1 && <Column style={{justifyContent: 'center', alignItems: 'center', marginTop: 100,}}>
            <Row>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
                <Column className='cardoff' style={{width: 100, height: 220, marginLeft: 20, marginRight: 20,}}/>
                <Column className='card_grad' style={{width: 100, height: 220,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
            </Row>
            <Row style={{marginBottom: 60, marginTop: 20,}}>
                <Column className='cardoff' style={{width: 100, height: 20,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 20,}}/>
                <Column className='card_grad' style={{width: 100, height: 20, marginLeft: 20, marginRight: 20,}}/>
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
            <Column  className='btgo' onClick={() => setStep(2)} >
                <span>Começar agora</span>
            </Column>

            <Column className='btof'>
                <span>Ver funções</span>
            </Column>
          
            </Row>
            </Column>}

        {step == 2 && <Column style={{justifyContent: 'center', alignItems: 'center', maxWidth: 1300, alignSelf: 'center',}}>
                <Row>
                <Column  style={{justifyContent: 'center', alignItems: 'center', border: '2px dashed #303030', padding: 20, borderRadius: 12,}}>
                    <Column className='cardoff' style={{borderRadius: 12, width: 240, height: 130, padding: 0,}}/>
                    <Column className='card_grad' style={{borderRadius: 100, marginTop: -50, zIndex: 99, width: 106, height: 106, padding: 0,}}/>
                    <Title style={{marginTop: 10,}}>Avatar</Title>
                    <Label style={{fontSize: 18, textAlign: 'center',}}>Você pode comprar avatares novos na lojinha. Atualizada semanalmente!</Label>
                </Column>
                <Column style={{padding: 42,}}  className="fadeInLeft">
                <Title style={{fontSize: 32,}}>Perfil</Title>
                <Label>Escolha sua foto de perfil agora mesmo.</Label>
                <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                {geral.map((item, index) => (
                <Image
                src={item}
                key={index}
                width={124}
                height={124}
                onClick={() => setAvatar(item)}
                alt=""
                style={{
                    objectFit: "cover", 
                    borderWidth: 4,
                    transition: 'linear .2s',
                    cursor: 'pointer',
                    transform: `scale(${avatar === item ? 1.1 : 1})`,
                    borderColor: avatar === item ? "#ED274A" : '#00000000',
                    borderStyle: 'solid',
                    borderRadius: 100, margin: 4,}}
                    loading="lazy"
                    />
                ))}
                </Row>
          </Column> </Row>
            </Column>}
            {step == 3 && <Column style={{justifyContent: 'center', alignItems: 'center', maxWidth: 1300, alignSelf: 'center',}}>
                <Row>
                <Column  style={{justifyContent: 'center', alignItems: 'center', border: '2px dashed #303030', padding: 20, borderRadius: 12,}}>
                    <Column className='card_grad' style={{borderRadius: 12, width: 240, height: 130, padding: 0,}}/>
                    <Column className='cardoff' style={{borderRadius: 100, marginTop: -50, zIndex: 99, width: 106, height: 106, padding: 0,}}/>
                    <Title style={{marginTop: 10,}}>Avatar</Title>
                    <Label style={{fontSize: 18, textAlign: 'center',}}>Você pode comprar avatares novos na lojinha. Atualizada semanalmente!</Label>
                </Column>
                <Column style={{padding: 42,}}  className="fadeInLeft">
                <Title style={{fontSize: 32,}}>Capa</Title>
                <Label>Escolha uma capa que combine com você.</Label>
                <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                {geralbg.map((item, index) => (
                <Image
                src={item}
                key={index}
                width={200}
                height={100}
                onClick={() => setAvatar(item)}
                alt=""
                style={{
                    objectFit: "cover", 
                    borderWidth: 4,
                    transition: 'linear .2s',
                    cursor: 'pointer',
                    transform: `scale(${avatar === item ? 1.1 : 1})`,
                    borderColor: avatar === item ? "#ED274A" : '#00000000',
                    borderStyle: 'solid',
                    borderRadius: 12, margin: 4,}}
                    loading="lazy"
                    />
                ))}
                </Row>
          </Column> </Row>
            </Column>}
      </Column>
    )}

    /*<Link href={`/login`} >
    <ButtonOff style={{marginLeft: 15,}}>Entrar</ButtonOff>
    </Link>
        <Title style={{fontFamily: 'Book', fontSize: 20, marginTop: 20,}}>✷ COLEÇÕES ✷ CARDS ✷ CURTIR ✷ SEGUIR ✷ AVATAR ✷ CAPA ✷ MIX ✷ </Title>
    
    */