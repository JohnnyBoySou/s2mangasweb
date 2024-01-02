'use client'
import React, {useState, useRef } from 'react';
import { Column, Row, Title, Label, } from '../../../../themes/global';
import { GoArrowUp } from "react-icons/go";

import './category.css'
import tags from '../../../../requests/categories/tags'
import ListManga from '../../../../components/Cards/list'
import ListMangaWrap from '../../../../components/Cards/listwrap';

export default function CategoryDetails ({params}){
    //API
    const id = params.id_category
    const item = tags.find((tag) => tag.id === id);


    //ScrollBt
    const [topView, settopView] = useState(false);
    const scroll = useRef(null);
    const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({top: 0,behavior: 'smooth',}); } };
    const handleScroll = () => {
        if (scroll.current) {
          settopView(scroll.current.scrollTop > 200);
        }
      };

return(
    <>
    <Column  onScroll={handleScroll} ref={scroll} className='banner' style={{ background: `linear-gradient(-180deg, ${item.color} -20.91%, #202020 54.92%)`, }}> 
        <Row style={{justifyContent: 'space-between', }}>

        <Title style={{fontSize: 72, marginTop: 64, marginLeft: 44, marginBottom: 20,    fontFamily: 'Black',}}>{item?.name}</Title>
        <img className='imgcapa' width={200} height={300} src={item.img} alt={item.name + item.img} />
        </Row>
        {topView && <Column className='top' onClick={scrollToTop}><GoArrowUp /></Column> }

        <Column className='content'>
   
            <Title style={{fontSize: 32, marginLeft: 44, fontFamily: 'Bold', marginTop: 40, marginBottom: 20,}}>Em destaque</Title> 
            <ListManga/>   
          
            <Row style={{justifyContent: 'space-between', marginTop: 30, marginRight: 44, marginLeft: 44, marginBottom: 20,}}>
            <Title style={{fontSize: 32, fontFamily: 'Bold', }}>Todos</Title> 
            </Row>
           
            <ListMangaWrap/>

            <span className='btall'>Ver todos</span> 
        </Column>
    </Column>
    </>
)}