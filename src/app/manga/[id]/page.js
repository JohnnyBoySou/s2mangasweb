/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState  } from 'react';
import { Column, Row, Title, Label, BTLike, BTFlow} from '../../../themes/global';
import { mangas } from '../../../requests/mangas';

import { FaPlay } from "react-icons/fa";
import { GoBell, GoBellSlash, GoHeart } from "react-icons/go";
import ChapterList from '../../../requests/chapters/list';

import './manga.css'
import Link from 'next/link';

export default function DetailsManga({ params }) {
    const id = Number(params.id)
    const [item, setItem] = useState();
    const  chapters = ChapterList.find((chapter) => chapter.id === id);
    
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
        collection: true,
    }

    const Chapter = ({item, index}) => {
      return(
        <Link href={`chapter/${item?.id}`}>
        <Row style={{ padding: 12, maxWidth: 700, borderRadius: 6, marginTop: 5, justifyContent: 'space-between', alignItems: 'center', }} className='chapter'>
            <Label style={{fontSize: 18, marginRight: 20,}}>#{item.number}</Label>
            <Title style={{fontSize: 20, fontFamily: 'Medium',}}>{item.name}</Title>
            <Label style={{fontSize: 18, marginRight: 20,}}>{item.date}</Label>
            <Title style={{marginTop: 4,}}>
                <GoHeart />
            </Title>
        </Row>
        </Link>
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
                        <Label style={{width: 360, marginTop: 15, lineHeight: 1.4, fontSize: 16,}}>{item?.description?.slice(0, 240)}...</Label>
                        
                    </Column>
                </Row>
                
                <Column>
                    <Row style={{justifyContent: 'space-between', marginTop: 10, alignItems: 'center', }}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                            <Link href={`chapter/${chapters[0]?.id}`}><Column className="play"><FaPlay/></Column></Link>
                            <BTLike liked={preferences?.liked} style={{margin: '0px 10px'}}>{preferences?.liked ? 'Curtiu' : 'Curtir'}</BTLike>
                            <BTFlow notify={preferences?.notify}>{preferences?.notify ? 'Seguindo' : 'Seguir'}</BTFlow>
                            <BTFlow style={{marginLeft: 12,}} notify={preferences?.collection}>{preferences?.collection ? 'Salvo' : 'Salvar'}</BTFlow>
                      
                        </Row>
                    </Row>
                    <Column style={{width: '96%', height: 2, marginTop: 15, backgroundColor: "#303030"}}/>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Recentes</Title>
                    {chapters.chapters?.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>

                <Column>
                <Column style={{width: '96%', height: 2, marginTop: 30, marginBottom: 20, backgroundColor: "#303030"}}/>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Todos ({item?.chapters})</Title>
                    {chapters.chapters?.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>
            </Column>

        </Column>
    )
}