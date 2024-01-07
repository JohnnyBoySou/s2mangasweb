/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState  } from 'react';
import { Column, Row, Title, Label, BTFlow} from '../../../themes/global';
import axios from 'axios'
import { FaPlay } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FaUserAstronaut , FaCalendarDays } from "react-icons/fa6"

import './manga.css'
import Link from 'next/link';

import ColorThief from 'colorthief';

export default function DetailsManga({ params }) {
    const id = Number(params.id)
    const [item, setItem] = useState();
    const [chapters, setChapters] = useState([]);

    const cl = item?.type === 'Manga' ? "#ED274A" : item?.type === 'Manhwa' ? "#366AD3" : item?.type === 'Manhua' ? "#009688" : '#000';

    const [dominantColor, setDominantColor] = useState(null);
    const [liked, setLiked] = useState(false);
    const formatNumber = (number) => { if (number >= 1000) { return (number / 1000).toFixed(1) + 'k'; } else { return number?.toString()}   }
      

    const requestData = async () => {
        if(id != undefined){
            const item_raw = await axios.get('http://localhost:3000/api/manga/details?id=' + id) 
            const chapters_raw = await axios.get('http://localhost:3000/api/manga/chapters?id=' + id) 
            setItem(item_raw)
            setChapters(chapters_raw)
        }
    }
    
    useEffect(() => {
        requestData()
    }, [id])

    const Chapter = ({item, index}) => {
      return(
        <Link href={`chapter/${item?.id}`} style={{textDecoration: 'none'}}>
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

    const getPalette = (url) => {
     return new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                let colorThief = new ColorThief();
                resolve(colorThief.getColor(img));
            }
            img.src = url;
        })
    }
    function rgbToHex(r, g, b) {
     const toHex = (c) => {
       const hex = c.toString(16);
       return hex.length === 1 ? '0' + hex : hex;
     };
   
     return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
 
    useEffect(() => {
     setDominantColor()
     getPalette(item?.capa).then(res => {
       const hex = rgbToHex(res[0], res[1], res[2]);
       setDominantColor(hex)
     })
    }, [item])
 

    return (
        <Column className='banner' style={{background: `linear-gradient(-145deg, ${dominantColor} -40.91%, #191919 54.92%)`,}}>
            <Column>
                <Row>
                    <Column>
                    <img src={item?.capa} className='coverimg' width={220}  alt={item?.name} style={{objectFit: 'cover', marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                    <Label style={{backgroundColor: cl, color: "#fff"}} className='type'>&#10038; {item?.type} &#10022;	</Label>
                    </Column>
                   
                    <Column style={{justifyContent: 'center', marginLeft: 34, marginRight:34, }}>
                        <Title style={{fontSize: '3.6em', textTransform: 'uppercase', fontFamily: 'Black',}}>{item?.name?.slice(0, 20)}</Title>
                        <Label style={{ marginTop: 5, lineHeight: 1.5, fontSize: 16,}}>{item?.description?.slice(0, 270)}...</Label>

                    <Row style={{alignItems: 'center', marginTop: 20,}}>
                        <Row className={liked ? 'btcheck' : 'btlike'} onClick={() => setLiked(!liked)}>
                            <Column className={liked ? 'icblc' : 'icbl'}>
                                <GoHeart/>
                            </Column>   
                            <span>{formatNumber(item?.likes)}</span>
                        </Row>
                      
                        <Row className='btrow'>
                            <Column className='icb'>
                                <FaCalendarDays />
                            </Column>
                            <Label>{item?.date}</Label>
                        </Row>
                        <Row className='btrow'>
                            <Column className='icb'>
                                <FaUserAstronaut/>
                            </Column>
                            <Label>{item?.author}</Label>
                        </Row>
                     </Row>
                    </Column>
                </Row>
                
                <Column>
                    <Row style={{justifyContent: 'space-between', marginTop: 20, alignItems: 'center', backgroundColor: "#262626", marginRight: 30, padding: 10, borderRadius: 8,}}>
                       
                       <Column style={{marginLeft: 10,}}>
                        <Title style={{}}>{item?.chapters} Capítulos</Title>
                        <Label>Todos os capítulos disponíveis aqui</Label>
                       </Column>
                        <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                            <BTFlow>Seguir</BTFlow>
                            <BTFlow style={{marginLeft: 12,}} >Salvar</BTFlow>
                            <Link href={`chapter/${item?.chapters}`}><Column className="play"><FaPlay/></Column></Link>
                        </Row>
                    </Row>


                    <Column style={{width: '96%', height: 2, marginTop: 15, backgroundColor: "#303030"}}/>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Recentes</Title>
                    {chapters?.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>

                <Column>
                <Column style={{width: '96%', height: 2, marginTop: 30, marginBottom: 20, backgroundColor: "#303030"}}/>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Todos ({item?.chapters})</Title>
                    {chapters?.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>
            </Column>

        </Column>
    )
}