'use client';
import React, {useContext, useEffect, useState} from "react"
import Image from 'next/image'
import axios from 'axios'
import { Column, Row, Label, Title, ButtonPrimary, ButtonOff} from '../../themes/global'
import './feed.css';
import ListManga from "../../components/Cards/list";
import ListMangaNews from "../../components/Cards/list_news";

export default function Feed () {
  const user = {name: 'Johnny', avatar: 'https://i.pinimg.com/564x/d8/e1/be/d8e1be5e6a784c40f7dc02734007c67e.jpg', }
  const [weekend, setWeekend] = useState([]);
  const [news, setNews] = useState([]);
  const [lasted, setLasted] = useState([]);
  const [rate, setRate] = useState([]);
  const [loading, setLoading] = useState();
  const API_URL = 'https://s2mangas.com/api/manga'

  useEffect(() => {
    requestData()
  }, [loading])

  const requestData = async () => {
      const [weekend_raw, lasted_raw, news_raw, rate_raw] = await Promise.all([
        axios.get(API_URL + '/weekend', {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },}),
        axios.get(API_URL + '/lasted', {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },}),
        axios.get(API_URL + '/news', {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },}),
        axios.get(API_URL + '/rate', {headers: { 'Content-Type': 'application/x-www-form-urlencoded' },}),
      ]);
      setWeekend(weekend_raw.data.mangas);
      setLasted(lasted_raw.data.mangas);
      setNews(news_raw.data.mangas);
      setRate(rate_raw.data.mangas);
    }
  

    

  return(
    <Row style={{overflowY: 'hidden'}}>
        <Column style={{height: '100vh', width: '100%',  overflow: 'auto', overflowX:'hidden'}}>
            <Column className="banner" >


              <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Column>
                  <Title style={{fontSize: 72, lineHeight: 1}}>Boa tarde,<br/>{user?.name}</Title>   
                  <Row style={{justifyContent: 'space-between', marginTop: 20, alignItems: 'center', }}>
                    <ButtonOff>Curtidos ❤️</ButtonOff>
                    <ButtonOff style={{margin: '0px 10px',}}>Comprar 🃏</ButtonOff>
                    <ButtonOff>Importar 🗂️</ButtonOff>
                  </Row>
                </Column>
                <Image src={user.avatar} alt="user avatar" width={200} height={200} style={{borderRadius: 100,}}/>
              </Row>
            </Column>
            <Column className="content">
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Recentes</Title>
              <ListManga data={lasted}/>
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Novos capítulos</Title>
              <ListMangaNews data={news} />
              <Title onClick={() => {setLoading(!loading)}} style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Populares</Title>
              <ListManga data={weekend}/>
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Melhores notas</Title>
              <ListManga data={rate}/>
            </Column>
        </Column>
    </Row>
    )
}

