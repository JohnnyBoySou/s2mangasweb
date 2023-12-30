/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react'
import { Column, Row, Title, Label } from "../../themes/global"
import { IoMdClose, IoMdCheckmark , IoMdHeartEmpty  } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { mangas } from "../../requests/mangas"
import './fixed.css';
import '../../themes/ani.css'

import ColorThief from 'colorthief';

export default function Fixed({close}){
   const item = mangas[1];
   const stats = {porcentage: '60%', read: 48, total: 82,}
   const [dominantColor, setDominantColor] = useState(null);

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

   if(dominantColor != null ){
  return(
    <Column className="rightbar slideInRight" style={{ background: `linear-gradient(-145deg, ${dominantColor} -40.91%, #191919 54.92%)`, }}>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Title>
              <IoMdClose onClick={close} style={{cursor: 'pointer'}}/>
            </Title>
            <Title>Fixado</Title>
            <Title>
              <BsThreeDots onClick={() => {}} style={{cursor: 'pointer'}}/>
            </Title>
        </Row>
        <Column>
            <img src={item?.capa} width={140} height={200} alt="fixed_manga" style={{objectFit: 'cover', marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
            <Title style={{fontSize: 22, textAlign: 'center',}}>{item?.name}</Title>
            <Label style={{textAlign: 'center',}}>{item?.chapters} • {item?.score}</Label>
        </Column>
        <Column style={{padding: 12, alignItems: 'center', 
        backgroundColor: '#262626', borderRadius: 8, margin: '10px -10px', }}>
          <Row style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
            <span className="tag-green">{stats?.read} lidos</span>
            <span className="tag-yellow">{stats?.total} total</span>
            <span className="tag-red">faltam {stats?.total - stats?.read} </span>
          </Row>
          <Column style={{width: '100%', marginBottom: 12, 
          backgroundColor: "#404040", borderRadius:100,}}>
            <Column className="progress" style={{width: stats?.porcentage}}>
              <Column style={{color:'#FF007A', backgroundColor: '#fff', width: 40, height: 40, borderRadius: 100, fontSize: 14, justifyContent: 'center', alignItems: 'center',  alignSelf: 'flex-end'}}>
                {stats?.porcentage}
              </Column>
            </Column>
          </Column>
        <Row style={{alignItems: 'center', justifyContent: 'center',}}>
          <IoMdHeartEmpty className="heart"/>
          <Column className="play">
            <FaPlay/>
          </Column>
          <IoMdCheckmark  className="check"/>
        </Row>
      </Column>
    </Column>
  )
}
}
