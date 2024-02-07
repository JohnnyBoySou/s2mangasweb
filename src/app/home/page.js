'use client';
import React, {useRef, useEffect, useState} from "react"
import Image from 'next/image'
import axios from 'axios'
import { Column, Row, Label, Title, ButtonPrimary, ButtonOff, Button} from '../../themes/global'
import './feed.css';
import ListManga from "../../components/Cards/list";
import ListMangaNews from "../../components/Cards/list_news";
import { FiArrowLeft, FiArrowRight, FiArrowUp } from "react-icons/fi";
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Contents from "../../components/Mangalist";
import { createPreferences, getPreferences } from "../../requests/user/requests";
import ContinueReading from "../../components/Continue";


export default function Feed () {
  const [weekend, setWeekend] = useState([]);
  const [news, setNews] = useState([]);
  const [lasted, setLasted] = useState([]);
  const [rate, setRate] = useState([]);
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const API_URL = 'https://www.s2mangas.com/api/manga'

  const [newsPage, setNewsPage] = useState(1);

  const router = useRouter();

  const usera = {
    name: 'JohnnyBoy',
    genres: [{name: 'Ação', id: 'acao'}, {name: 'Artes Marciais', id: 'artes-marciais'}, {name: 'Adulto', id: 'adulto'}],
    email: '***',
    premium: true,
    avatar: 'https://i.pinimg.com/564x/d8/e1/be/d8e1be5e6a784c40f7dc02734007c67e.jpg',
    capa: 'https://i.pinimg.com/736x/7d/de/81/7dde81dbac1e8cf0883cee9cac615452.jpg',
    coins: 3200,
    diamonds: 20, 
    date: '20 de Jan, 2024',
  }

  useEffect(() => {
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

   

    const getUser = () => {
      try {
        const response = getPreferences()
        if(response){
          setUser(response)
        }else{
          router.push('/start');
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    getUser()
    requestData()
  }, [loading])

  //background: `linear-gradient(184deg, #ED274A -20.91%, #262626 60.92% , #262626 30.92%)`,
  
  const [announced, setAnnouced] = useState(undefined);
  const [step, setStep] = useState('news');
  return(
        <Column style={{ width: '100%',  overflowY: 'visible', overflowX:'hidden', background: `radial-gradient(circle, #202020, #171717)`,}} >
           
          

            <Column style={{ borderRadius: 12,  flexGrow: 1, margin: 20, marginTop: 0,paddingBottom: 40, }} >
            
            <Row style={{justifyContent: 'space-between', alignItems: 'center', marginLeft: -50, marginRight: -50,}}>
              <Column className='circle' />
              <Column className='circle2' />
            </Row>

            <Row style={{justifyContent: 'center', alignItems: 'center', margin: '0px 60px'}}>
                    <Column>
                    <Image src={user?.avatar} alt="avatar" className="fadeInUp" width={200} height={200} style={{borderRadius: 100, objectFit: 'cover', alignSelf: 'center', border: '4px solid #fff', marginBottom: 20,  marginTop: 60,}}/>
                      <Title style={{ fontSize: 72, lineHeight: 1, textAlign: 'center' }}>Boa tarde,</Title>
                      <Row>
                        <Image src="/star.png" alt="start" width={42} height={42} className='star' style={{marginRight: -20, marginTop: -10,}}/>
                        <span className="gradient">{user?.name}</span>
                        <Image src="/north.png" alt="north"  className='star' width={42} height={42} style={{marginLeft: -10, marginTop: 60,}}/>
                      </Row>
                    </Column>
                  </Row>



              <Column style={{padding: 80, paddingTop: 0,  }}/>
                  <Column style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center',  marginBottom: 10, border: '2px solid #f9f9f990',  padding: '12px 24px', borderRadius: 100,}}>
                    <Title style={{fontSize: 18, fontFamily: 'Book',}}>Escolha um para começar</Title>
                  </Column>

                  <Row style={{justifyContent: 'center', marginTop: 20,  }}>
                  <Column className="novos" style={{overflow: 'hidden', position: 'relative'}}  onClick={() => setStep('continue')}>
                          <Label style={{fontSize: 28, color: '#fff', textAlign: 'left', }}>Continue</Label>
                          <Column >
                            <Image src="https://img.lermanga.org/Z/zomgan/capa.jpg" alt="continue" width={105} height={150} style={{ objectFit: 'cover', position: 'absolute', bottom: -20, left: 30, borderRadius: 8, zIndex: 99,}} />
                            <Image src="/continue.svg" alt="continue" width={100} height={170} style={{ objectFit: 'cover', transform: 'rotate(50deg)', position: 'absolute', bottom: -20, right: -20,}} />
                          </Column>
                    </Column>
                    <Column className="novos" style={{overflow: 'hidden', position: 'relative'}} onClick={() => setStep('news')}>
                          <Label style={{fontSize: 28, color: '#fff', textAlign: 'left', }}>Novos <br/>Capítulos</Label>
                          <Image src="/capitulos.svg" alt="continue" width={100} height={170} style={{ objectFit: 'cover', transform: 'rotate(50deg)', position: 'absolute', bottom: -20, right: -20,}} />
                          
                    </Column>
                    <Column className="novos" style={{overflow: 'hidden', position: 'relative'}} onClick={() => setStep('alta')}>
                          <Label style={{fontSize: 28, color: '#fff', textAlign: 'left', }}>Em <br/>Alta</Label>
                          <Image src="/em_alta.svg" alt="continue" width={100} height={170} style={{ objectFit: 'cover', transform: 'rotate(50deg)', position: 'absolute', bottom: -20, right: -20,}} />
                          
                    </Column>
                    <Column className="novos" style={{overflow: 'hidden', position: 'relative'}} onClick={() => setStep('notas')}>
                          <Label style={{fontSize: 28, color: '#fff', textAlign: 'left', }}>Melhores <br/>Notas</Label>
                          <Image src="/notas.svg" alt="continue" width={100} height={170} style={{ objectFit: 'cover', transform: 'rotate(50deg)', position: 'absolute', bottom: -20, right: -20,}} />
                          
                    </Column>
                  
                  </Row>
              
            </Column>


            <Column>
              
              {step === 'news' && <Column className="fadeInUp">
                <Row style={{justifyContent: 'space-between', alignItems: 'center',  marginRight: 44,}}>
                  <Column style={{marginLeft: 44,  marginTop: 44, marginBottom: 20,}}>
                  <Title style={{fontSize: 42, fontFamily: 'Bold', }}>Novos capítulos</Title>
                  <Label>Última atualização há {news[0]?.release_date}.</Label>
                  </Column>
                  <Row>
                  <ButtonOff onClick={() => {  if(newsPage > 1){ setNewsPage(newsPage - 1) }}} style={{width: 44, height: 44, justifyContent: 'center', opacity: newsPage === 1 ? 0.4 : 1, alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                    <FiArrowLeft style={{marginTop: 6,}}/>
                </ButtonOff>
                <ButtonOff onClick={() => {  if(newsPage < 3){ setNewsPage(newsPage + 1) }}} style={{width: 44, height: 44, marginLeft: 10, opacity: newsPage === 3 ? 0.4 : 1, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                          <FiArrowRight style={{marginTop: 6,}}/>
                </ButtonOff>
                    </Row>
                </Row>
              <ListMangaNews data={news} page={newsPage}/>
              </Column>}

              {step === 'alta' && <Column className="fadeInUp">
              <Title onClick={() => {setLoading(!loading)}} style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Em alta</Title>
              <ListManga data={weekend}/>
              </Column>}

              {step === 'notas' && <Column className="fadeInUp">
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Melhores notas</Title>
              <ListManga data={rate}/>
              </Column>}

              {step === 'continue' && <Column className="fadeInUp">
                <ContinueReading />
                </Column>}
            </Column>

            
        </Column>
    )
}
/**
 *   {announced ? <Column className="fadeInUp" style={{position: 'relative', backgroundColor: "#303030", borderRadius: '12px', padding: '10px 0px' }}>
                  <Row style={{padding: '0px 10px 10px 10px', alignItems: 'center', }}>
                    <Image src='/icon_colorido.png'  alt="temporada 1" width={24} height={24} style={{ objectFit: 'cover', marginRight: 6,}}/>
                    <Label>S2Mangás</Label>
                  </Row>
                  <Image src='/t1.png'  alt="temporada 1" width={260} height={280} style={{borderRadius: 0, objectFit: 'cover'}}/>
                  
                  <Label style={{width: 240, margin: 10, fontSize: 16,}}>Temporada 1 anunciada! Traremos novidades em breve...</Label>
                  <Column style={{width: 70, height: 10, borderRadius: 100, background: '#505050', alignSelf: 'center', cursor: 'pointer'}} onClick={() => setAnnouced(!announced)}/>
                  </Column> :
                  <Row onClick={() => setAnnouced(!announced)} style={{ backgroundColor: "#f7f7f790", cursor: 'pointer', justifyContent: 'space-between', borderRadius: '12px', padding: '10px 12px', width: 180, alignSelf: 'flex-end'}}>
                    <Title style={{fontSize: 18, color: '#000', }}>Vem aí</Title>
                    <FiArrowUp  style={{fontSize: 24, color: '#000', }}/>
                  </Row>
                  }
 * 
 * 
 * <Contents />
 */
