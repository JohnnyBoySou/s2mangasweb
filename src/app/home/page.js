'use client';
import React, {useRef, useEffect, useState} from "react"
import Image from 'next/image'
import axios from 'axios'
import { Column, Row, Label, Title, ButtonPrimary, ButtonOff, ButtonPrimaryLight} from '../../themes/global'
import './feed.css';
import ListManga from "../../components/Cards/list";
import ListMangaNews from "../../components/Cards/list_news";
import { IoIosArrowBack } from "react-icons/io";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { LuBell } from "react-icons/lu";

import Contents from "../../components/Mangalist";


export default function Feed () {
  const user = {name: 'Johnny', avatar: 'https://i.pinimg.com/564x/d8/e1/be/d8e1be5e6a784c40f7dc02734007c67e.jpg', }
  const [weekend, setWeekend] = useState([]);
  const [news, setNews] = useState([]);
  const [lasted, setLasted] = useState([]);
  const [rate, setRate] = useState([]);
  const [loading, setLoading] = useState();
  const API_URL = 'https://www.s2mangas.com/api/manga'

  useEffect(() => {
    requestData()
  }, [loading])

  const requestData = async () => {
      const [weekend_raw, lasted_raw, news_raw, rate_raw] = await Promise.all([
        axios.get(`${API_URL}/weekend`, ),
        axios.get(`${API_URL}/lasted`, ),
        axios.get(`${API_URL}/news`, ),
        axios.get(`${API_URL}/rate`, ),
      ])

      setWeekend(weekend_raw.data.mangas);
      setLasted(lasted_raw.data.mangas);
      setNews(news_raw.data.mangas);
      setRate(rate_raw.data.mangas);
    }
  
 

  return(
        <Column style={{height: '100vh', width: '100%',  overflow: 'auto', overflowX:'hidden'}} >
            <Column style={{padding: 44, borderRadius: 8, flexGrow: 1,  }} >
              <Column style={{ background: `linear-gradient(184deg, #ED274A -20.91%, #262626 60.92% , #262626 30.92%)`, width: '120%', height: 400, margin: '-44px -44px -400px -44px' }}/>
              <Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 50, }}>
                
                <Column style={{position: 'relative', }}>
                
                  <Row className="nav"  style={{marginBottom: 20, position: 'fixed', marginTop: -58, width: '92.4%', borderRadius: '12px 12px 4px 4px', padding: 20, marginLeft: -44, zIndex: 9999, paddingLeft: 44,}} >
                  
                    <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                      <ButtonOff style={{width: 34, height: 34, justifyContent: 'center', alignItems: 'center', fontSize: 22, textAlign: 'center', backgroundColor: '#30303090' , padding: 0,}}>
                        <FiArrowLeft style={{marginTop: 6,}}/>
                      </ButtonOff>
                      <ButtonOff style={{width: 34, height: 34, marginLeft: 10, justifyContent: 'center', alignItems: 'center', fontSize: 22, textAlign: 'center', backgroundColor: '#30303090' , padding: 0,}}>
                        <FiArrowRight style={{marginTop: 6,}}/>
                      </ButtonOff>




                    <ButtonPrimaryLight style={{marginLeft: 20,}}>Instalar aplicativo</ButtonPrimaryLight>

                    <ButtonOff style={{background: "#40404090", marginLeft: 20, width: 44, height: 44, borderRadius: 100, padding: 0, justifyContent: 'center', alignItems: 'center', }}>
                      <LuBell/>
                    </ButtonOff>
                    </Row>


                  </Row>
                
                  <Title style={{fontSize: 72, marginTop: 100, lineHeight: 1}}>Boa tarde</Title>   
                  <Row style={{justifyContent: 'space-between', marginTop: 20, alignItems: 'center', }}>
                    <ButtonOff>Curtidos ❤️</ButtonOff>
                    <ButtonOff style={{margin: '0px 10px',}}>Comprar 🃏</ButtonOff>
                    <ButtonOff>Importar 🗂️</ButtonOff>
                  </Row>
                </Column>
              
              </Row>
              
            </Column>


            <Column >
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Continue lendo</Title>


              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Novos capítulos</Title>
              <ListMangaNews data={news} />
              <Title onClick={() => {setLoading(!loading)}} style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Populares</Title>
              <ListManga data={weekend}/>
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Melhores notas</Title>
              <ListManga data={rate}/>
            </Column>

            <Contents />
        </Column>
    )
}

