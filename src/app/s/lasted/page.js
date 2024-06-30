'use client'
import React, { useState, useRef } from 'react';
import { Column, Row, Title } from '@themes/global';
import { GoArrowUp } from "react-icons/go";
import './list.css'
import NavBar from '@components/NavBar/index';

import { Load, List } from '@components/S/geral'
import lasted from '@data/lasted'

export default function Lasted({ params }) {
  //API
  const [data, setData] = useState(lasted);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //ScrollBt
  const [topView, settopView] = useState(false);
  const scroll = useRef(null);
  const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({ top: 0, behavior: 'smooth', }); } };
  const handleScroll = () => { if (scroll.current) { settopView(scroll.current.scrollTop > 200); } };

  //API
  /*
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

   */


  return (
    <>
      <NavBar bg="#A93531" />
      <Column onScroll={handleScroll} ref={scroll} style={{ overflowY: 'auto', overflowX: 'hidden', position: 'relative', backgroundColor: "#A93531" }}>
        <Row style={{ justifyContent: 'space-between', }}>

          <Title style={{ fontSize: 72, marginTop: 64, marginLeft: 44, marginBottom: 40, fontFamily: 'Black', }}>Recém adicionados</Title>
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