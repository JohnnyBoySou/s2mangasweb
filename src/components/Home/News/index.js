'use client';
import React, {useState, useEffect} from 'react';
import { Column, Row, Title, Label, ButtonOff, } from '@themes/global';
import ListMangaNews from '@components/Cards/list_news';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from '@components/Loading';
import news from '@data/news';

export default function NewsComponent() {
    const [data, setnews] = useState(news);
    const [newsPage, setNewsPage] = useState(1);

    /*Code review 
    useEffect(() => {
        async function requestNews(page = 1) {
            try {
                const response = await axios.get(`https://s2mangas.com/api/publish/news?page=${page}`, { headers: { 'Accept': "text/html", 'Access-Control-Allow-Origin': '*' } });
                setnews(response.mangas)
            } catch (error) {
                return error.message;
            }
        }
       requestNews(newsPage)
    }, [newsPage])
    */

    const release = '2 horas atrás';

    return(
    <Column className="fadeInUp">

        {data?.length === 0 ? 
        <Column style={{padding: '0px 44px', marginBottom: 20, marginTop: 30,}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Column>
            <Skeleton width={300} height={50} radius={6}/> 
            <Skeleton width={270} height={30} radius={8} top={10}/> 
            </Column>
            <Row style={{justifyContent: 'center', alignItems: 'center', }}>
            <Skeleton width={60} height={60} radius={100}/> 
            <Skeleton width={60} height={60} radius={100} left={10}/> 
            </Row>
            </Row>
        </Column>
        : 
        <Row style={{justifyContent: 'space-between', alignItems: 'center',  marginRight: 44, marginTop: 30,}}>
        <Column style={{marginLeft: 44,  marginBottom: 20,}}>
        <Title style={{fontSize: 42, fontFamily: 'Bold', }}>Novos capítulos</Title>
        <Label>Última atualização há {release}.</Label>
        </Column>
        <Row>
        <ButtonOff onClick={() => {  if(newsPage > 1){ setNewsPage(newsPage - 1) }}} style={{width: 54, height: 54, justifyContent: 'center', opacity: newsPage === 1 ? 0.4 : 1, cursor: newsPage === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
            <FiArrowLeft style={{marginTop: 6,}}/>
        </ButtonOff>
        <ButtonOff onClick={() => {  if(newsPage < 4){ setNewsPage(newsPage + 1) }}} style={{width: 54, height: 54, marginLeft: 10, opacity: newsPage === 4 ? 0.4 : 1, cursor: newsPage === 4 ? 'not-allowed' : 'pointer', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowRight style={{marginTop: 6,}}/>
        </ButtonOff>
            </Row>
        </Row>
        }

        <ListMangaNews data={data} page={newsPage}/>
    </Column>
    )};