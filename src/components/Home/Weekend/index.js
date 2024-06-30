'use client';
import React, { useState, useEffect } from 'react';
import { Column, Row, Title, Label, ButtonOff, } from '@themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from '@components/Loading';
import ListManga from '@components/Cards/list';
import Link from 'next/link';
import weekend from "@data/weekend";

function WeekendComponent() {
    const [news, setnews] = useState(weekend);
    const [newsPage, setNewsPage] = useState(1);

    /*Code review 
    useEffect(() => {
        async function requestWeekend(page = 1) {
            try {
                const response = await axios.get(`https://s2mangas.com/api/publish/weekend?page=${page}`);
                console.log(response)
                setnews(response.data.mangas)
            } catch (error) {
                return error.message;
            }
        }
        requestWeekend(newsPage)
    }, [newsPage])

    */

    return (
        <Column className="fadeInUp">
            {news?.length === 0 ?
                <Load />
                :
                <List  newsPage={newsPage} setNewsPage={setNewsPage} data={news} />
            }
            <ListManga data={news} page={newsPage} />
        </Column>
    )
};

export default React.memo(WeekendComponent);

const List = ({ newsPage, setNewsPage }) => {
    return (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 44, marginTop: 30, }}>
            <Column style={{ marginLeft: 44, marginBottom: 20, }}>
                <Link href="/s/weekend" className='link'>
                    <Title style={{ fontSize: 42, fontFamily: 'Bold', }}>Em alta</Title>
                </Link>
                <Label>Mais lidos da semana</Label>
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
    )
}

const Load = () => <Column style={{ padding: '0px 44px', marginBottom: 20, marginTop: 50, }}>
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