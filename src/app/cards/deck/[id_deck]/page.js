'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Row, Title, Label, } from '../../../../themes/global';
import Decks from '../../../../requests/cards/decks';
import { ThemeContext } from 'styled-components';
import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";
import Draggable from '../../../../components/draggable';
import './details.css'

export default function DetailsDeck ({params}){
    const { color, font} = useContext(ThemeContext)
    const [item, setItem] = useState([]);
    const id = Number(params.id_deck)

    useEffect(() => {
        if(id != undefined){
            const data = Decks.find((deck) => deck.manga_id === id);
            setItem(data)
        }
    },[id])

    
    const CardsList = ( { item } ) => {
        const cls = item.type === 'Raro' ? [ '#ffff66', '#ff5050', '#ffcc99'] : item.type === 'Lendário' ? ['#4287f5', '#cc00cc', '#ccffff',] : ['#000', '#fff', '#171717']
        return(
            <Column style={{padding: 4, margin: 10, borderRadius: 14, background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`}}>
        <Column className='cardlist' style={{}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 15,}}>
                <Row>
                    <Image alt="" src={item?.capa} width={94} height={94} style={{borderRadius: 8, backgroundColor: color.off,}} />
                    <Column style={{justifyContent: 'center', marginLeft: 10,}}>
                    <Title style={{fontSize: 20}}>{item?.name}</Title>
                    <Label style={{background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`, WebkitTextFillColor: 'transparent',  backgroundClip: 'text'}}>{item?.type}  •  {item?.price} coins</Label>
                    </Column>
                </Row>

                <Column style={{
                    height: 44, width: 44, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: color.primary, borderRadius: 100, }}>
                        <GoArrowRight />

                </Column>
            </Row>
                <Draggable >
                    <Row style={{overflow: 'hidden', borderRadius: 12,}}>    
                    {item?.variant?.map((variantItem, index) => (
                        <Column key={index}>
                                <Image src={variantItem} alt='' width={100} height={160} style={{  borderRadius: 4, marginRight: 15, }} />
                            </Column>
                            ))}
                    </Row>
                </Draggable>
        </Column>
        </Column>
    )
    }




    return(
    <Column className='banner'>
        <Title>Detalhes {item?.name}</Title>
        <Row style={{flexWrap:'wrap'}}>
        {item?.cards?.map((item, index) =>  <CardsList item={item} key={index} /> )}
        </Row>
    </Column>
    )}