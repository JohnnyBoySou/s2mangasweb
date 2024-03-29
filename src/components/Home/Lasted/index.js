'use client';
import React, { useState, useEffect } from 'react';
import { Column, Row, Title, Label, ButtonOff, } from '../../../themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from '../../Loading';
import ListManga from '../../Cards/list';
import Link from 'next/link';
import axios from "axios";
import { clearWeekend } from '../../../requests/manga/lasted';

export default function LastedComponent() {
    const [news, setnews] = useState([]);
    const [newsPage, setNewsPage] = useState(1);

    useEffect(() => {
        async function requestLasted(page = 1) {
            try {
                const response = await axios.get(`https://lermanga.org/mangas/page/${page}?orderby=date&order=desc`, { headers: { 'Accept': "text/html", 'Access-Control-Allow-Origin': '*' } });
                const mangaData = clearWeekend(response.data);
                console.log(mangaData)
                setnews(mangaData)
            } catch (error) {
                return error.message;
            }
        }
        requestLasted(newsPage)
    }, [newsPage])


    return (
        <Column className="fadeInUp">

            {news?.length === 0 ?
                <Column style={{ padding: '0px 44px', marginBottom: 20, marginTop: 50, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column>
                            <Skeleton width={300} height={50} radius={6} />
                            <Skeleton width={270} height={30} radius={8} top={10} />
                        </Column>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Skeleton width={60} height={60} radius={100} />
                            <Skeleton width={60} height={60} radius={100} left={10} />
                        </Row>
                    </Row>
                </Column>
                :
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 44, marginTop: 30, }}>
                    <Column style={{ marginLeft: 44, marginBottom: 20, }}>

                        <Link href="/s/lasted" className='link'>
                            <Title style={{ fontSize: 42, fontFamily: 'Bold', }}>Recém adicionados</Title>
                        </Link>
                        <Label>Acabaram de entrar no catálogo</Label>
                    </Column>
                    <Row>
                        <ButtonOff onClick={() => { if (newsPage > 1) { setNewsPage(newsPage - 1) } }} style={{ width: 54, height: 54, justifyContent: 'center', opacity: newsPage === 1 ? 0.4 : 1, cursor: newsPage === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
                            <FiArrowLeft style={{ marginTop: 6, }} />
                        </ButtonOff>
                        <ButtonOff onClick={() => { if (newsPage < 3) { setNewsPage(newsPage + 1) } }} style={{ width: 54, height: 54, marginLeft: 10, opacity: newsPage === 3 ? 0.4 : 1, cursor: newsPage === 3 ? 'not-allowed' : 'pointer', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
                            <FiArrowRight style={{ marginTop: 6, }} />
                        </ButtonOff>
                    </Row>
                </Row>
            }

            <ListManga data={news} page={newsPage} />
        </Column>
    )
};