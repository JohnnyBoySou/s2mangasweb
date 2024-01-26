'use client';
import React, { useEffect, useState  } from 'react';
import { Column, Row, Title, Label, BTFlow, ButtonOff} from '../../../themes/global';
import axios from 'axios'
import { FaPlay } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FaUserAstronaut , FaCalendarDays } from "react-icons/fa6"
import './manga.css'
import Link from 'next/link';
import ColorThief from 'colorthief';
import Image from 'next/image';
import Skeleton from '../../../components/Loading';

export default function DetailsManga({ params }) {
    const id = params.id
    const [item, setItem] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [chapters, setChapters] = useState([]);
    const [images, setImages] = useState();
    const cl = item?.type === 'Manga' ? "#ED274A" : item?.type === 'Manhwa' ? "#366AD3" : item?.type === 'Manhua' ? "#009688" : '#000';
    const [liked, setLiked] = useState(false);
    const formatNumber = (number) => { if (number >= 1000) { return (number / 1000).toFixed(1) + 'k'; } else { return number?.toString()}   }
    
    useEffect(() => {
        setLoading(true)
        const requestData = async () => {
            try {
                if (id !== undefined) {
                    const item_raw = await axios.get('https://www.s2mangas.com/api/manga/details?id=' + id);
                    const chapters_raw = await axios.get('https://www.s2mangas.com/api/manga/chapters?id=' + id);
                    const chapter_last = await axios.get('https://www.s2mangas.com/api/manga/pages?chapter=3' + '&id=' + id);
    
                    setItem(item_raw?.data.manga);
                    setChapters(chapters_raw?.data);
                    setImages(chapter_last?.data.images);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 504) {
                    setError("Erro 504: Gateway Timeout");
                } else {
                    setError("Erro na requisição:", error.message);
                }
                setLoading(false); 
            }
        };
        requestData()
    }, [id])
   

    const Chapter = ({item, index}) => {
        const [hovered, setHovered] = useState(false);
        return(
        <Link href={`${id}/${item?.number}`} style={{textDecoration: 'none'}}  
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)} >
        <Row style={{ padding: 12, marginRight: 34, borderRadius: 6, marginTop: 5, justifyContent: 'space-between', alignItems: 'center', }} className='chapter'>
            {hovered ?  <Label style={{fontSize: 18, marginRight: 30,}}> &#9658; </Label> :  <Label style={{fontSize: 18, marginRight: 20,}}>#{item.number}</Label>}
            <Label style={{fontSize: 18, marginRight: 20,}}>{item.date}</Label>
            <Title style={{marginTop: 4,}}>
                <GoHeart />
            </Title>
        </Row>
        </Link>
      )
    }


 if(!loading){
    return (
        <Column style={{background: `linear-gradient(-145deg, #282828 21%, #161616 99.92%)`, padding: '44px',}}>
            <Column>
                <Row>
                    <Column>
                    <Image src={item?.capa} className='coverimg' width={220} height={340}  alt={item?.name} style={{objectFit: 'cover', backgroundColor: "#404040", marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                    <Label style={{backgroundColor: cl, color: "#fff"}} className='type'>&#10038; {item?.type} &#10022;	</Label>
                    </Column>
                   
                    <Column style={{justifyContent: 'center', marginLeft: 34, marginRight:34, overflow: 'hidden',}}>
                        <Title style={{fontSize: '2.6em',  fontFamily: 'Black',}}>{item?.name?.slice(0, 40)}</Title>
                        <Label style={{ marginTop: 5, lineHeight: 1.5, fontSize: 16, width: 500,}}>{item?.description?.slice(0, 270)}...</Label>
                       

                    <Row style={{alignItems: 'center', marginTop: 20,}}>
                       
                       
                       {item?.like?.length > 1 && <Row className={liked ? 'btcheck' : 'btlike'} onClick={() => setLiked(!liked)}>
                            <Column className={liked ? 'icblc' : 'icbl'}>
                                <GoHeart/>
                            </Column>   
                            <span>{formatNumber(item?.likes)}</span>
                        </Row>}
                      
                        <Row className='btrow'>
                            <Column className='icb'>
                                <FaCalendarDays />
                            </Column>
                            <Label>{item?.date}</Label>
                        </Row>
                       
                       {item?.author?.length > 1 && <Row className='btrow'>
                            <Column className='icb'>
                                <FaUserAstronaut/>
                            </Column>
                            <Label>{item?.author}</Label>
                        </Row>}
                     </Row>
                    </Column>
                    {images?.length > 0 &&
                    <Column style={{width: 400, height: 400,  overflow: 'hidden',  borderRadius: 12, backgroundColor: "#ED274A"}}>
                        <Row style={{ zIndex: 2, transform: 'rotate(-25deg)', flexWrap: 'wrap', width:570,}}>
                        {images?.map((img, index) => 
                        <Image src={img} key={index}width={120} height={200}  alt={item?.name} style={{objectFit: 'cover', backgroundColor: "#404040", marginTop: 20, marginRight: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                        )}
                        </Row>
                        </Column>
                    }
                </Row>
                
                <Column>
                    <Row style={{justifyContent: 'space-between', marginTop: 20, alignItems: 'center', backgroundColor: "#303030", marginRight: 30, padding: 10, borderRadius: 8,}}>
                       
                       <Column style={{marginLeft: 10,}}>
                        <Title style={{fontSize: 32, marginBottom: 10,}}>{item?.chapters} Capítulos</Title>
                        <Row style={{marginBottom: 10,}}>
                            <Link href={`${id}/${item?.chapters}`}>
                                <ButtonOff style={{marginRight: 14,}}>Último capítulo</ButtonOff>
                            </Link>
                            <Link href={`${id}/1`}>
                                <ButtonOff>Primeiro capítulo</ButtonOff>
                            </Link>
                        </Row>
                       </Column>
                        

                        <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                            <BTFlow>Seguir</BTFlow>
                            <BTFlow style={{marginLeft: 12,}} >Salvar</BTFlow>
                            <Link href={`${id}/${item?.chapters}`}><Column className="play"><FaPlay/></Column></Link>
                        </Row>
                    </Row>


                    <Column style={{width: '96%', height: 2, marginTop: 15, backgroundColor: "#303030"}}/>
                    <Title style={{marginBottom: 10, marginTop: 10,}}>Recentes</Title>
                    {chapters?.slice(0, 5).map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>

                <Column style={{width: '96%', height: 2, marginTop: 30, marginBottom: 20, backgroundColor: "#303030",}}/>
                
                <Title style={{marginBottom: 10, marginTop: 10,}}>Todos ({item?.chapters})</Title>
                <Column style={{height: 500, overflowY: 'auto', }}>
                    {chapters?.map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                </Column>
            </Column>

        </Column>
    )
}
    else if(loading){
        return(
        <Column style={{padding: 44,}}>
            <Row>
            <Skeleton width={240} height={360}/>
            <Column>
                <Skeleton width={400} height={100} left={30} top={30}/>
                <Skeleton width={370} height={80} left={30} top={20} bottom={20}/>
                <Skeleton width={300} height={40} left={30}/>
            </Column>
            </Row>
            <Column>
                <Skeleton width={'100%'} height={160} top={50}/>
                
                <Skeleton width={300} height={70} top={50}/>
                <Skeleton width={'100%'} height={60} top={40}/>
                <Skeleton width={'100%'} height={60} top={10}/>
                <Skeleton width={'100%'} height={60} top={10}/>
                <Skeleton width={'100%'} height={60} top={10}/>
                <Skeleton width={'100%'} height={60} top={10}/>
                <Skeleton width={'100%'} height={60} top={10}/>
            </Column>
        </Column>
    )
    }
}