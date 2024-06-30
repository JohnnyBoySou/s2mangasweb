'use client'
import React, { useState, useRef, } from 'react';
import { Column, Row, Title } from '@themes/global';
import { GoArrowUp } from "react-icons/go";
import './list.css'
import NavBar from '@components/NavBar/index';
import { Load, List } from '@components/S/geral'

import weekend from "@data/weekend";

export default function Weekend() {
  //DATA API
  const [data, setData] = useState(weekend);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //SCROLL
  const [topView, settopView] = useState(false);
  const scroll = useRef(null);
  const scrollToTop = () => { if (scroll.current) { scroll.current.scrollTo({ top: 0, behavior: 'smooth', }); } };
  const handleScroll = () => { if (scroll.current) { settopView(scroll.current.scrollTop > 200); } };

  //API

  /*
  useEffect(() => {
    async function fetchData(page = 1) {
      try {
        getWeekend(page).then((res) => {
          setLoading(false);
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData(page)
  }, [page])
  */
  
  
  

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

