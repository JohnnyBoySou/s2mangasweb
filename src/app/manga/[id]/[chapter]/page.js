'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Column, Row, Title, Label, BTIcon, } from '../../../../themes/global';
import Image from 'next/image';
import '../manga.css'

export default function ChapterDetails({ params }) {
    const {id, chapter } = params
    const [item, setItem] = useState();
    useEffect(() => {
      requestData()
    },[id])

    const requestData = async () => {
      const item_raw = await axios.get('https://s2mangas.com/api/manga/pages?chapter=' + chapter + '&id=' + id) 
      console.log(item_raw.data)
      setItem(item_raw?.data)
    }
    

    return (
        <Column style={{backgroundColor: "#262626"}} className='banner'>
          <Row>
            <BTIcon>Controle</BTIcon>
          </Row>


           {item?.images?.map((item, index) => <Image alt="text" width={800} height={1000} style={{objectFit: 'contain'}} src={item} key={index} />)}
        </Column>
    )
}


//{item?.imgs?.map((item, index) => <img alt="text" width='100%' height='100%' src={item} key={index} />)}