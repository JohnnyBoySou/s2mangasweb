/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState  } from 'react';
import { Column, Row, Title, Label, BTLike, BTFlow} from '../../../themes/global';
import { mangas } from '../../../requests/mangas';

import { FaPlay } from "react-icons/fa";
import { GoBell, GoBellSlash } from "react-icons/go";

import './manga.css'

export default function DetailsManga({ params }) {
    const id = Number(params.id)
    const [item, setItem] = useState();
    
    const formatNumber = (number) => {
        if (number >= 1000) {
          return (number / 1000).toFixed(1) + 'k';
        } else {
          return number?.toString();
        }
      };
      
    useEffect(() => {
        if(id != undefined){
            const data = mangas.find((manga) => manga.id === id);
            setItem(data)
        }
    },[id])

    const preferences = {
        notify: false,
        liked: false,
    }

    const chaptersLast = [
        {
            id: 2312_187, 
            name: 'A grande guerra',
            number: 187,
            date: '24 de jan, 2024'
        },
        {
            id: 2312_186, 
            name: 'Laços perdidos',
            number: 186,
            date: '17 de jan, 2024'
        },
        {
            id: 2312_185, 
            name: 'Amarras Fortes',
            number: 185,
            date: '10 de jan, 2024'
        },
    
    
    ]


    const Chapter = ({item, index}) => {
        //backgroundColor: index % 2 === 0 ? "#404040" : "#606060",
      return(
        <Row style={{ padding: 12, width: 400, borderRadius: 6, marginTop: 5, justifyContent: 'space-between', alignItems: 'center', }} className='chapter'>
            <Label style={{fontSize: 18, marginRight: 20,}}>#{item.number}</Label>
            <Title style={{fontSize: 20, fontFamily: 'Medium',}}>{item.name}</Title>
            <Label style={{fontSize: 18, marginRight: 20,}}>{item.date}</Label>
        </Row>
      )
    }
    




    return (
        <Column className='banner'>
            <Column>
                <Row>
                    <img src={item?.capa} width={180}  alt={item?.name} style={{objectFit: 'cover', marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                    <Column style={{justifyContent: 'center', marginLeft: 24,  }}>
                        <Label>{item?.type} • {item?.chapters} capítulos • #{item?.id}</Label>
                        <Title style={{fontSize: 42,}}>{item?.name}</Title>
                        <Label> {formatNumber(item?.likes)} curtidas • {item?.date} • {item?.author}</Label>
                        <Label style={{width: 340, marginTop: 15, lineHeight: 1.2, fontSize: 16,}}>{item?.description.slice(0, 220)}...</Label>
                        
                    </Column>
                </Row>
                
                <Column>
                    <Row style={{justifyContent: 'space-between', marginTop: 10, alignItems: 'center', }}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                            <Column className="play"><FaPlay/></Column>
                            <BTLike liked={preferences?.liked} style={{margin: '0px 10px'}}>{preferences?.liked ? 'Curtiu' : 'Curtir'}</BTLike>
                            <BTFlow notify={preferences?.notify}>{preferences?.notify ? 'Seguindo' : 'Seguir'}</BTFlow>
                        </Row>
                    </Row>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Recentes</Title>
                    {chaptersLast.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>
            </Column>

        </Column>
    )
}