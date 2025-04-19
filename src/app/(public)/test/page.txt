'use client';
import React, {useState, useEffect} from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';
import requestChapters from '../../requests/manga/chapters';
import requestManga from '../../requests/manga/details';
import { IoIosArrowForward } from "react-icons/io"; 
import './style.css';
import requestLasted from '../../requests/manga/lasted';
import requestNews from '../../requests/manga/news';
import requestWeekend from '../../requests/manga/weekend';
import requestRate from '../../requests/manga/rate';
import requestSimilar from '../../requests/manga/similar';

export default function Test(){

    const mangaID = 'jujutsu-kaisen';
    const [chapters, setChapters] = useState();
    const [manga, setManga] = useState();
    const [lasted, setLasted] = useState();
    const [news, setNews] = useState();
    const [weekend, setWeekend] = useState();
    const [rate, setRate] = useState();
    const [similar, setSimilar] = useState();


    useEffect(() => {
        const fetchData = async () => {
            requestChapters(mangaID).then((res) => {
                setChapters(res);
            });
            requestSimilar(mangaID).then((res) => {
                setSimilar(res);
            });
            requestManga(mangaID).then((manga) => {
                setManga(manga);
            });
            requestLasted().then((res) => {
                setLasted(res);
            })
            requestNews().then((res) => {
                setNews(res);
            })
            requestWeekend().then((res) => {
                setWeekend(res);
            })
            requestRate().then((res) => {
                setRate(res)
            })
        }
        fetchData();
    }, []);

    const progress = [chapters, manga, lasted, news, weekend, rate, similar].filter((item) => item != undefined).length;
    const porcentage = (progress * 100) / 7;
    const porcentage_not = 100 - porcentage;
    return(
    <Column style={{padding: 44,}}>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
        <Column>
            <Title>Verificações API</Title>
            <Label>Requests com todas as APIs listadas, para verificar sua disponibilidade online.
            </Label>
        </Column>

        <Column>
        <Row style={{width: 300, marginTop: 20,}}>
                                    <Column style={{height: 20, borderRadius: 100, width: porcentage.toFixed() + '%', background: '#B5FFBC'}}/>
                                    <Column style={{height: 20, borderRadius: 100, flexGrow: 1,  background: '#505050', marginLeft: 8,}}/>
                                </Row>
                                <Row style={{width: 300, marginTop: 10, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{color: '#B5FFBC'}}>Online {porcentage.toFixed(0)}%</Label>
                                    <Label style={{color: '#808080'}}>Offline {porcentage_not.toFixed(0)}%</Label>
                                </Row>
        </Column>
        </Row>

        <Column>
        <Row className='context'>
            <Label>Contexto</Label>
            <IoIosArrowForward style={{color: "#f6f6f6", fontSize: 18, margin: '0px 6px',}}/>
            <span className='ctx1'  style={{backgroundColor: '#ff85ca'}}>Mangá</span>
            <IoIosArrowForward style={{color: "#f6f6f6", fontSize: 18, margin: '0px 6px',}}/>
            <span className='ctx1'>{mangaID}</span>
        </Row>
        <Row>
            <Column className='verify' style={{border: chapters != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}} > 
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Chapters</Title>
                    <span className='tag' style={{background:  chapters != 'Network Error' ? '#00ff73' : '#e63250'}}>
                        {chapters != 'Network Error' ? 'Online' : 'Offline'}
                    </span>
                </Row>
                <Label>
                    {chapters != 'Network Error' ? chapters?.length : chapters} capítulos
                </Label>
            </Column>

            <Column className='verify' style={{border: manga != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}}>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Manga</Title>
                    <span className='tag' style={{background:  manga != 'Network Error' ? '#00ff73' : '#e63250'}}>{manga != 'Network Error' ? 'Online' : 'Offline'}</span>
                </Row>
                <Label>
                    {manga != 'Network Error' ? manga?.manga?.name : manga}
                </Label>
            </Column>
            <Column className='verify' style={{border: similar != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}}>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Similar</Title>
                    <span className='tag' style={{background:  similar != 'Network Error' ? '#00ff73' : '#e63250'}}>{similar != 'Network Error' ? 'Online' : 'Offline'}</span>
                </Row>
                <Label>
                    {similar != 'Network Error' ? similar?.mangas.length : similar} itens
                </Label>
            </Column>
        </Row>
        </Column>

        <Column>
        <Row className='context'>
            <Label>Contexto</Label>
            <IoIosArrowForward style={{color: "#f6f6f6", fontSize: 18, margin: '0px 6px',}}/>
            <span className='ctx1'  style={{backgroundColor: '#ff85ca'}}>Home</span>
            <IoIosArrowForward style={{color: "#f6f6f6", fontSize: 18, margin: '0px 6px',}}/>
            <span className='ctx1'>Tudo</span>
        </Row>
        <Row>
            <Column className='verify' style={{border: news != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}} > 
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>News</Title>
                    <span className='tag' style={{background:  news != 'Network Error' ? '#00ff73' : '#e63250'}}>
                        {news != 'Network Error' ? 'Online' : 'Offline'}
                    </span>
                </Row>
                <Label>
                    {news != 'Network Error' ? news?.mangas.length : news} itens
                </Label>
            </Column>

            <Column className='verify' style={{border: lasted != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}}>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Lasted</Title>
                    <span className='tag' style={{background:  lasted != 'Network Error' ? '#00ff73' : '#e63250'}}>{lasted != 'Network Error' ? 'Online' : 'Offline'}</span>
                </Row>
                <Label>
                    {lasted != 'Network Error' ? lasted?.mangas.length : lasted} itens
                </Label>
            </Column>
            <Column className='verify' style={{border: weekend != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}}>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Weekend</Title>
                    <span className='tag' style={{background:  weekend != 'Network Error' ? '#00ff73' : '#e63250'}}>{weekend != 'Network Error' ? 'Online' : 'Offline'}</span>
                </Row>
                <Label>
                    {weekend != 'Network Error' ? weekend?.mangas.length : weekend} itens
                </Label>
            </Column>
            <Column className='verify' style={{border: rate != 'Network Error' ? '2px dashed #00ff73' : '2px dashed #e63250'}}>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title>Rate</Title>
                    <span className='tag' style={{background:  rate != 'Network Error' ? '#00ff73' : '#e63250'}}>{lasted != 'Network Error' ? 'Online' : 'Offline'}</span>
                </Row>
                <Label>
                    {rate != 'Network Error' ? rate?.mangas.length : rate} itens
                </Label>
            </Column>
        </Row>
        </Column>

    </Column>
)}