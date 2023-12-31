'use client'
import React from 'react';
import { Column, Row, Title, Label, B} from '../../themes/global';
import './cards.css'
import Image from 'next/image';
import Decks from '../../requests/cards/decks';
import Cards from '../../requests/cards/cards';
import Draggable from '../../components/draggable';
import Spline from '@splinetool/react-spline';

export default function CardsDecks(){

    const ListDecks = ({item}) => {
        return(
            <Column style={{ flexGrow: 1, margin: 6,  alignSelf: 'center', }}>
            <img src={ item?.capa } alt='' width={162} height={162} style={{ borderRadius: 8, objectFit: 'cover'}}  />
            <Label style={{textAlign: 'center',}}>{item?.name}</Label>
        </Column>
        )
    }
    const ListCards = ({item}) => {
        const cls = item.type === 'Raro' ? [ '#ffff66', '#ff5050', '#ffcc99'] : item.type === 'Lendário' ? ['#4287f5', '#cc00cc', '#ccffff',] : ['#000', '#fff', '#171717']
        return(
            <Column style={{ flexGrow: 1, margin: 6, borderRadius: 8,  alignSelf: 'center', padding: 6,  background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`}}>
            <Image src={ item?.variant } alt='' width={162} height={240} style={{ borderRadius: 8, objectFit: 'cover'}}  />
            <Label style={{textAlign: 'center',}}>{item?.name}</Label>
        </Column>
        )
    }
    
    return (
        <>
        <Column className='banner'>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Column>
                    <Title style={{fontSize: 54,}}>Cards & Decks</Title>
                    <Label>Colecione, compre e se exiba com seus cards.</Label>
                </Column>
                <Spline style={{width: 254, height: 244, marginRight: 100,}} scene="https://prod.spline.design/6doH49l5WS57MZE6/scene.splinecode" />
            </Row>
           
        </Column>
        <Column className='content'>
            <Title style={{marginLeft: 28, marginTop: 28,}}>Meus Cards</Title>
            <Draggable>
            <Row style={{ overflow: 'hidden', paddingLeft: 24,}}>
            {Cards.map((item, index) => <ListCards key={index} item={item}/>)}
            </Row>
            </Draggable>
        </Column>
        <Column className='content'>
            <Title style={{marginLeft: 28, marginTop: 28,}}>Decks em Alta</Title>
            <Draggable>
            <Row style={{ overflow: 'hidden', paddingLeft: 24,}}>
            {Decks.map((item, index) => <ListDecks key={index} item={item}/>)}
            </Row>
            </Draggable>
        </Column>
        </>
    )
}