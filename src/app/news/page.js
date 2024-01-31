'use client';
import React, {useEffect, useState} from 'react';
import { Column, Row, Title, Label, ButtonOff} from '../../themes/global';
import ListMangaWrap from '../../components/Cards/listwrap';
export default function News (){

    const [step, setStep] = useState(1);
    return(
    <Column style={{padding: 44,}}>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Column>
            <Title style={{fontSize: 42, marginBottom: 5,}}>Novidades</Title>
            <Label>Os últimos lançamentos dos mangás que você segue.</Label>
            </Column>
        </Row>
        <Row style={{margin: '20px 0px'}}>
            <ButtonOff style={{backgroundColor: step == 1 ? '#fff' : '#404040', color: step == 1 ? '#000' : '#f6f6f6', }} onClick={() => setStep(1)}>Mangás</ButtonOff>
            <ButtonOff style={{backgroundColor: step == 2 ? '#fff' : '#404040', color: step == 2 ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep(2)}>Atualizações</ButtonOff>
        </Row>

        {step == 1 &&
        <Column style={{marginTop: 20, marginLeft: -44,}}>
            <ListMangaWrap/>    
        </Column>
        }
        
    </Column>
    )}