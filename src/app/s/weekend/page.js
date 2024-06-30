'use client'
import React, { useState, useRef, useEffect, } from 'react';
import { Column, Row, Title, ButtonOff } from '@themes/global';
import { GoArrowUp } from "react-icons/go";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './list.css'
import NavBar from '@components/NavBar/index';
import { getWeekend } from '@requests/api/gets';
import { Card, Load } from '@components/s/geral'


export default function Weekend() {
  //DATA API
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //SCROLL
  const [topView, settopView] = useState(false);
  const scroll = useRef(null);
  const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({ top: 0, behavior: 'smooth', }); } };
  const handleScroll = () => { if (scroll.current) { settopView(scroll.current.scrollTop > 200); } };

  //API
  useEffect(() => {
    async function fetchData(page = 1) {
      try {
        const res = await getWeekend(page)
        setData(res)
        setLoading(false)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData(page)
  }, [page])




  return (
    <>
      <NavBar bg="#29065F" />
      <Column onScroll={handleScroll} ref={scroll} style={{ overflowY: 'auto', overflowX: 'hidden', position: 'relative', backgroundColor: "#29065F" }}>
        <Row style={{ justifyContent: 'space-between', }}>

          <Title style={{ fontSize: 72, marginTop: 64, marginLeft: 44, marginBottom: 40, fontFamily: 'Black', }}>Em alta</Title>
        </Row>
        {topView && <Column className='top' onClick={scrollToTop}><GoArrowUp /></Column>}
        <Column style={{ backgroundColor: "#171717", paddingTop: 40, paddingBottom: 40, }}>

          {loading ?
            <Load /> :
            <List page={page} setPage={setPage} data={data} />
          }

        </Column>
      </Column>
    </>
  )
}


const List = ({page, setPage, data}) => {
  return(<></>)
  return (
    <Column>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center', margin: '10px 44px', marginBottom: 20, }}>
        <Title style={{ fontSize: 32, }}>Mangás ({page})</Title>
        <Row>
          <ButtonOff onClick={() => { if (page > 1) { setPage(page - 1) } }} style={{ width: 54, height: 54, justifyContent: 'center', opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
            <FiArrowLeft style={{ marginTop: 6, }} />
          </ButtonOff>
          <ButtonOff onClick={() => { if (data?.length === 24) { setPage(page + 1) } }} style={{ width: 54, height: 54, marginLeft: 10, opacity: data?.length != 24 ? 0.4 : 1, cursor: data?.length === 24 ? 'pointer' : 'not-allowed', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
            <FiArrowRight style={{ marginTop: 6, }} />
          </ButtonOff>
        </Row>
      </Row>

      {data?.length > 0 && <Row style={{ flexWrap: 'wrap', margin: '0px 44px' }}>
        {data?.map((item, index) => <Card key={index} item={item} />)}
      </Row>}
    </Column>
  )
}