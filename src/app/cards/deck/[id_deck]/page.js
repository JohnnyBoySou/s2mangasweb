'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Row, Title, Label, } from '../../../../themes/global';
import Decks from '@data/cards/decks';
import { ThemeContext } from 'styled-components';
import Image from 'next/image';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Draggable from '../../../../components/draggable';
import './details.css'

export default function DetailsDeck ({params}){
    const { color, font} = useContext(ThemeContext)
    const [item, setItem] = useState([]);
    const id = Number(params.id_deck)

    const [card, setCard] = useState(undefined);

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
                    <Image alt="" src={item?.capa} width={94} height={94} style={{borderRadius: 8, objectFit: 'cover', backgroundColor: color.off,}} />
                    <Column style={{justifyContent: 'center', marginLeft: 10,}}>
                    <Title style={{fontSize: 20}}>{item?.name}</Title>
                    <Label style={{background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`, WebkitTextFillColor: 'transparent',  backgroundClip: 'text'}}>{item?.type}  •  {item?.price} coins</Label>
                    </Column>
                </Row>

                <Column onClick={() => setCard(item)} style={{
                    height: 44, width: 44, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: color.primary, borderRadius: 100, color: '#fff', fontSize: 28 }}>
                        <GoArrowRight />

                </Column>
            </Row>
                <Draggable >
                    <Row style={{overflow: 'hidden', borderRadius: 12,}}>    
                    {item?.variant?.slice(0,5)?.map((variantItem, index) => (
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



    const CardDetails = ( { item }) => {
        const cls = item?.type === 'Raro' ? [ '#ffff66', '#ff5050', '#ffcc99'] : item?.type === 'Lendário' ? ['#4287f5', '#cc00cc', '#ccffff',] : ['#000', '#fff', '#171717']
        const [variant, setVariant] = useState();
        return(
            <Column style={{margin: 24, aligSelf: 'center',}}>

                <Column onClick={() => setCard(undefined)} style={{width: 54, height: 54, marginBottom: 20, borderRadius: 100, backgroundColor:"#404040", justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: 32, color: "#fff"}}>
                    <GoArrowLeft/>
                </Column>
                <Draggable >
                    <Row style={{overflow: 'hidden', borderRadius: 12,}}>    
                    {item?.variant?.slice(0,5)?.map((variantItem, index) => (
                        <Column key={index} onClick={() => setVariant(variantItem)}>
                            <Image src={variantItem} alt='' width={280} height={400} style={{ objectFit: 'cover',  borderRadius: 12, border: variantItem === variant ? '4px solid #fff' : '4px solid #00000000', marginRight: 15, }} />
                        </Column>
                    ))}
                    </Row>
                </Draggable>


            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{justifyContent: 'center', marginLeft: 10, marginTop: 30,}}>
                    <Image alt="" src={item?.capa} width={194} height={194} style={{borderRadius: 8,  objectFit: 'cover', backgroundColor: color.off,}} />
                    <Title style={{fontSize: 72, fontFamily: 'Bold', background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`, WebkitTextFillColor: 'transparent',  backgroundClip: 'text'}}>{item?.name}</Title>
                
                    <Label style={{fontSize: 24, marginBottom: 10, background: `linear-gradient(145deg, ${cls[0]} -20.91%, ${cls[1]} 54.92%, ${cls[1]} 80.92%)`, WebkitTextFillColor: 'transparent',  backgroundClip: 'text'}}>{item?.type}  •  {item?.price} coins</Label>
                    <Label style={{maxWidth: 500, lineHeight: 1.2}}>{item?.description}</Label>
                </Column>
                <Column style={{backgroundColor: "#404040", width: 300, borderRadius: 8, padding: 24,}}>
                    <Title>Comprar Card</Title>

                    <Label>1 por {item?.price} coins</Label>
                </Column>
            </Row>
        
        </Column>
        )
    }
    


    return(
    <Column className='banner'>
        <Row style={{ }}>
            <Row style={{justifyContent: 'center', alignItems: 'center', marginLeft: 60, marginTop: 20, marginBottom: 20, }}>
            <img className='capa' width={240} height={240} src={item?.capa} style={{borderRadius:  12, objectFit: 'cover'}} alt='capa usuario' />
            <Column style={{marginTop: 24, marginLeft: 24, marginBottom: 20,}}>
                <Title style={{fontSize: 72,  fontFamily: 'Black',}}>{item?.name}</Title>
                <Label>{item?.description}</Label>
                <Label>Publicado em {item?.date}</Label>
            </Column>
            </Row>
        </Row>


        <Column className='content'>
            {card != undefined && <CardDetails item={card}/>}
            {card === undefined && <Row style={{flexWrap:'wrap', justifyContent: 'center',}}>
            {item?.cards?.map((item, index) =>  <CardsList item={item} key={index} /> )}
            </Row>}


        </Column>

    </Column>
    )}