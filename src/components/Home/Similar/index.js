'use client';
import React, {useState,} from 'react';
import { Column, Row, Title, Label, ButtonOff, } from '../../../themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from '../../Loading';
import ListManga from '../../Cards/list';
import ListSimilar from '../../Cards/list_similar';

export default function SimilarComponent({data, name}) {
    const news = data;
    const [newsPage, setNewsPage] = useState(1);

    return(
    <Column className="fadeInUp">
        {news?.length === 0 ? 
        <Column style={{padding: '0px 44px', marginBottom: 20, marginTop: 50,}}>
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
        <Row style={{justifyContent: 'space-between', alignItems: 'center',  marginRight: 12, marginTop: 50,}}>
        <Column style={{marginBottom: 20,}}>
        <Title style={{fontSize: 42, fontFamily: 'Bold', }}>Mangás similares</Title>
        <Label>Parecidos com {name}</Label>
        </Column>
        <Row>
        <ButtonOff onClick={() => {  if(newsPage > 1){ setNewsPage(newsPage - 1) }}} style={{width: 54, height: 54, justifyContent: 'center', opacity: newsPage === 1 ? 0.4 : 1, cursor: newsPage === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
            <FiArrowLeft style={{marginTop: 6,}}/>
        </ButtonOff>
        <ButtonOff onClick={() => {  if(newsPage < 2){ setNewsPage(newsPage + 1) }}} style={{width: 54, height: 54, marginLeft: 10, opacity: newsPage === 2 ? 0.4 : 1, cursor: newsPage === 2 ? 'not-allowed' : 'pointer', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowRight style={{marginTop: 6,}}/>
        </ButtonOff>
            </Row>
        </Row>
        }

        <ListSimilar data={news} page={newsPage}/>
    </Column>
    )};