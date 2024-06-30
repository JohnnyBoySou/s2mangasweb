'use client'
import React, {useState, useRef, useEffect, memo } from 'react';
import { Column, Row, Title, Label, ButtonOff } from '../../../../themes/global';
import { GoArrowUp } from "react-icons/go";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './category.css'
import tags from '@data/tags'
import ListMangaWrap from '@components/Cards/listwrap';
import NavBar from '@components/NavBar/index';
import Skeleton from '@components/Loading';

export default function CategoryDetails ({params}){
    //API
    const id = params.id_category
    const item = tags.find((tag) => tag.id === id);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    //ScrollBt
    const [topView, settopView] = useState(false);
    const scroll = useRef(null);
    const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({top: 0,behavior: 'smooth',}); } };
    const handleScroll = () => {  if (scroll.current) {  settopView(scroll.current.scrollTop > 200);  }  };

    /* 
    useEffect(() => {
      async function requestData(){
        setLoading(true)
        try {
          const res = await requestGenre(id, page)
          setData(res)
          setLoading(false)
            } catch (error) {
                console.log(error)
              }
            }
            requestData()
          }, [id, page]);
      */
          
return(
    <>
    <NavBar bg={item?.color+90}/>
    <Column  onScroll={handleScroll} ref={scroll}  style={{overflowY: 'auto', overflowX: 'hidden', position: 'relative', background: `linear-gradient(-180deg, ${item.color} -20.91%, #202020 54.92%)`, }}> 
        <Row style={{justifyContent: 'space-between', }}>

        <Title style={{fontSize: 72, marginTop: 64, marginLeft: 44, marginBottom: 20,  fontFamily: 'Black',}}>{item?.name}</Title>
        </Row>
        {topView && <Column className='top' onClick={scrollToTop}><GoArrowUp /></Column> }

        <Column  style={{backgroundColor: "#26262690"}}>
          
            <Row style={{justifyContent: 'space-between', marginTop: 30, marginRight: 44, marginLeft: 44, marginBottom: 20,}}>
            <Title style={{fontSize: 32, fontFamily: 'Bold', }}>Mangás</Title> 

            <Row>
            <ButtonOff onClick={() => {  if(page > 1){ setPage(page - 1) }}} style={{width: 54, height: 54, justifyContent: 'center', opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowLeft style={{marginTop: 6,}}/>
            </ButtonOff>
            <ButtonOff onClick={() => { { setPage(page + 1) }}} style={{width: 54, height: 54, marginLeft: 10, cursor: 'pointer', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowRight style={{marginTop: 6,}}/>
            </ButtonOff>
            </Row>
        </Row>


            {loading ? 
            <Row style={{flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
              <Column style={{marginRight: 20, marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20, marginBottom: 30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,  marginBottom:30,}}>
              <Skeleton width={230} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            </Row> :
            <ListMangaWrap data={data?.mangas} /> }

        </Column>
    </Column>
    </>
)}

            //<ListManga data={}/>
            //<img className='imgcapa' width={200} height={300} src={item.img} alt={item.name + item.img} />
           // <span className='btall'>Ver todos</span> 