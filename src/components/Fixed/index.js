/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react'
import { Column, Row, Title, Label } from "../../themes/global"
import { IoMdClose, IoMdCheckmark , IoMdHeartEmpty  } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import mangas from "../../requests/mangas_old"
import './fixed.css';
import { usePathname } from "next/navigation";

import ColorThief from 'colorthief';
import Progress from '../Kit/Progress';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import requestSimilar from '../../requests/manga/similar';
import ListSimilar from '../Cards/list_similar';
import Comments from '../Comments';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Fixed({}){
  const [close, setClose] = useState(false);
  const [descShort, setDescShort] = useState(true);
  const [similar, setSimilar] = useState([]);
  const item = mangas[0]
  const stats = {porcentage: 60, read: 48, total: 82,}
  const [dominantColor, setDominantColor] = useState(null);


   function rgbToHex(r, g, b) {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

   useEffect(() => {
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
      const getSimilar = async () => {requestSimilar(item?.id).then((response) => {setSimilar(response.mangas); })}


      getPalette(item?.capa).then(res => {const hex = rgbToHex(res[0], res[1], res[2]);setDominantColor(hex)})
      getSimilar()
    
   }, [item])


   
   if(close){
    return (<></>)
   }

    return(
      <Column className='sidebar' style={{ background: `linear-gradient(-145deg, ${dominantColor} -40.91%, #191919 54.92%)`, }}>
        <Column style={{padding: 20, justifyContent: 'center', alignSelf: 'center'  }}>

        <Row style={{justifyContent: 'space-between', alignItems: 'center',}}>
            <Title>
              <IoMdClose onClick={() => setClose(!close)} style={{cursor: 'pointer'}}/>
            </Title>
            <Title>Continue lendo</Title>
            <Title>
              <BsThreeDots onClick={() => {}} style={{cursor: 'pointer'}}/>
            </Title>
        </Row>
        
        <Column>
            <img  src={item?.capa} width={220} height={340} alt="fixed_manga" style={{objectFit: 'cover', marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
            <Title style={{fontSize: 22, textAlign: 'center',}}>{item?.name}</Title>
            <Label style={{textAlign: 'center',}}>{item?.chapters} • {item?.score}</Label>
        </Column>


        <Progress  porcentage={stats.porcentage}/>


        <Column  className='desc' onClick={() => setDescShort(!descShort)}>
            <Label>
              {descShort ? item?.description.slice(0, 140) + '...' : item?.description}
            </Label>
          </Column>
        </Column>

        <Column style={{padding: 20, marginTop: -10,}}>
          <Title style={{marginBottom: 10,}}>Comentários</Title>
          <Comments id={item?.id}/> 
        </Column>

        <Column style={{padding: 20, marginTop: -10,}}>
          <Title style={{marginBottom: 10,}}>Similares</Title>
          <ListSimilar data={similar} page={1}/>
        </Column>
      
      </Column>
    )
}
