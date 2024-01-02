'use client';
import React, { useState } from 'react';
import { Column, Row, Title, Label, B} from '../../themes/global';
import './account.css'
import { CiEdit, CiCreditCard1 } from "react-icons/ci";
import ListManga from '../../components/Cards/list';
import ListMangaWrap from '../../components/Cards/listwrap';
import Image from 'next/image';

import user from '../../requests/user/preferences';

export default function Account() {

    const [liked, setLiked] = useState();
    const [step, setStep] = useState('like');

    return (
        <Column className='banner'>
        <Row style={{ }}>
            <Row style={{justifyContent: 'center', alignItems: 'center', marginLeft: 60, }}>
                <Image width={150} height={150} src={user.avatar} style={{borderRadius:  300,  zIndex: 99, objectFit: 'cover',}} alt='avatar usuario' />
            <Column style={{marginTop: 24, marginLeft: 24, marginBottom: 20,}}>
                <Label style={{color: '#ED274A'}}>{user?.premium ? 'Premium' : ''}</Label>
                <Title style={{fontSize: 72,  fontFamily: 'Black',}}>{user?.name}</Title>
                <Label>Desde {user?.date}</Label>
            </Column>
            </Row>
            <Image className='capa' width={350} height={240} src={user.capa} style={{borderRadius:  12, objectFit: 'cover'}} alt='capa usuario' />
        </Row>

        <Column className='content'>
   
            <Title style={{fontSize: 32, marginLeft: 44, fontFamily: 'Bold', marginTop: 40, marginBottom: 20,}}>Continue lendo</Title> 
            <ListManga/>   

            <Row style={{justifyContent: 'space-evenly', marginTop: 30, marginRight: 44, marginLeft: 44, marginBottom: 20,}}>
                <Title onClick={() => setStep('progress')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100, color: step === 'progress' ? '#fff' : '#909090', border: step === 'progress' ? '3px solid #fff' : '3px solid #404040' }}>Em progresso</Title> 
                <Title onClick={() => setStep('complete')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'complete' ? '#fff' : '#909090', border: step === 'complete' ? '3px solid #fff' : '3px solid #404040' }}>Completos</Title> 
                <Title onClick={() => setStep('like')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'like' ? '#fff' : '#909090', border: step === 'like' ? '3px solid #fff' : '3px solid #404040' }}>Curtidos</Title> 
                <Title onClick={() => setStep('follow')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'follow' ? '#fff' : '#909090', border: step === 'follow' ? '3px solid #fff' : '3px solid #404040' }}>Seguindo</Title> 
            </Row>
           
           {step === 'progress' && <ListMangaWrap/>}
           {step === 'complete' && <ListMangaWrap/>}
           {step === 'like' && <ListMangaWrap/>}
           {step === 'follow' && <ListMangaWrap/>}
            
          <span className='btall'>Ver todos</span> 
        </Column>



            <Row style={{margin: 44,}}>
                <Column className='card'>
                    <Row>
                        <Column>
                            <Label style={{textTransform: 'uppercase', letterSpacing: 1.4,}}>Seu plano</Label>
                            <Title style={{fontSize: 32,}}>Premium</Title>
                            <Label>Sua próxima cobrança será no dia <B>23/01/2024</B>, no valor de <B>R$ 4,99.</B></Label>
                            <Label style={{marginTop: 20, }}>Cartão Mastercard que termina com <B>3005</B></Label>
                        </Column>
                    </Row>
                </Column>

                <Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiEdit/>
                        </Title>
                        <Label style={{textAlign: 'center'}}>Editar Perfil</Label>
                    </Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiCreditCard1 />
                        </Title>
                        <Label style={{textAlign: 'center'}}>Atualizar Cartão</Label>
                    </Column>
                </Column>
            </Row>

        </Column>
    )
}