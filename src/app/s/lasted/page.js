'use client'
import React, {useState, useRef, useEffect, memo } from 'react';
import { Column, Row, Title, Label, ButtonOff } from '../../../themes/global';
import { GoArrowUp } from "react-icons/go";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './list.css'
import NavBar from '../../../components/NavBar/index';
import Skeleton from '../../../components/Loading';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import requestLasted from '../../../requests/manga/lasted';

export default function Lasted({params}){
    //API
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    //ScrollBt
    const [topView, settopView] = useState(false);
    const scroll = useRef(null);
    const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({top: 0,behavior: 'smooth',}); } };
    const handleScroll = () => {  if (scroll.current) {  settopView(scroll.current.scrollTop > 200);  }  };
    const router = useRouter()
    const handle = (id) => {
        router.push(`/manga/${id}`)
    }
      useEffect(() => {
        async function requestData(){
            setLoading(true)
            try {
                const res = await requestLasted(page)
                setData(res.mangas)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
      }, [page]);


     

  const Card = ({ item }) => {
    return ( 
      <Column style={{ marginRight: 16, marginBottom: 16,  }} className='cd'  onClick={() => handle(item.id)} >
          <Column style={{position:'relative'}}>
            <img src={item?.capa} width={190} height={260} style={{ borderRadius: 8, objectFit: 'cover', margin: 10, alignSelf: 'center', width: 190, height: 260,}} alt='' />
            <Column className='pl'>
              <FaPlay/>
            </Column>
          </Column>
           
           <Column style={{padding: 12, paddingTop: 0, width: 200,}}>
            <Title style={{ fontSize: 20, marginBottom: 4,}}>{item?.name?.slice(0, 32)}</Title>
            <Label style={{fontSize: 16, marginTop: 4,}}>{item?.score} • {item?.type}</Label>
           </Column>
      </Column> 

    );
  };

return(
    <>
    <NavBar bg="#A93531"/>
    <Column  onScroll={handleScroll} ref={scroll}  style={{overflowY: 'auto', overflowX: 'hidden', position: 'relative', backgroundColor: "#A93531" }}> 
        <Row style={{justifyContent: 'space-between', }}>

        <Title style={{fontSize: 72, marginTop: 64, marginLeft: 44, marginBottom: 40,  fontFamily: 'Black',}}>Recém adicionados</Title>
        </Row>
        {topView && <Column className='top' onClick={scrollToTop}><GoArrowUp /></Column> }
        <Column style={{backgroundColor: "#171717", paddingTop: 40, paddingBottom: 40,}}>
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
            <Column>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', margin: '10px 44px', marginBottom: 20,}}>
              <Title style={{fontSize: 32,}}>Mangás ({page})</Title>
              <Row>
                <ButtonOff onClick={() => {  if(page > 1){ setPage(page - 1) }}} style={{width: 54, height: 54, justifyContent: 'center', opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}> 
                    <FiArrowLeft style={{marginTop: 6,}}/>
                </ButtonOff>
                <ButtonOff onClick={() => {  if(data.length === 24){ setPage(page + 1) }}} style={{width: 54, height: 54, marginLeft: 10, opacity: data.length != 24 ? 0.4 : 1, cursor: data.length === 24 ? 'pointer' : 'not-allowed', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                    <FiArrowRight style={{marginTop: 6,}}/>
                </ButtonOff>
              </Row>
            </Row>
  
            <Row style={{flexWrap: 'wrap', margin: '0px 44px'}}>
             {data?.map((item,index) => <Card key={index} item={item} /> )} 
            </Row>
            </Column>
             }

        </Column>
    </Column>
    </>
)}