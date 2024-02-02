'use client';
import React, { useEffect, useState  } from 'react';
import { Column, Row, Title, Label, BTFlow, ButtonOff, ButtonPrimary, BTColection, ButtonPrimaryLight} from '../../../themes/global';
import axios from 'axios'
import { FaPlay } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FaUserAstronaut , FaCalendarDays } from "react-icons/fa6"
import './manga.css'
import Link from 'next/link';
import ColorThief from 'colorthief';
import Image from 'next/image';
import Skeleton from '../../../components/Loading';
import { IoClose } from "react-icons/io5";
import Loader from '../../../components/Loader';
import { addMangaInCollectionByID, getCollections } from '../../../requests/collections/request';
import { CiBookmarkPlus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";


export default function DetailsManga({ params }) {
    const id = params.id
    const [item, setItem] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [chapters, setChapters] = useState([]);
    const [images, setImages] = useState();
    const [modal, setModal] = useState(false);
    const cl = item?.type === 'MANGA' ? "#FFA8B7" : item?.type === 'MANHWA' ? "#BBD2FF" : item?.type === 'MANHUA' ? "#BFFFC6" : '#FFF';
    const rl = item?.status === 'Finalizado' ? '#BFFFC6' : '#FFC7A8'
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
        <Row style={{ padding: 12, marginRight: 6, borderRadius: 6, marginTop: 5, justifyContent: 'space-between', alignItems: 'center', }} className='chapter'>
            {hovered ?  <Label style={{fontSize: 18, marginRight: 30,}}> &#9658; </Label> :  <Label style={{fontSize: 18, marginRight: 20,}}>#{item.number}</Label>}
            <Label style={{fontSize: 18, marginRight: 20,}}>{item.date}</Label>
            <Title style={{marginTop: 4,}}>
                <CiBookmarkPlus  />
            </Title>
        </Row>
        </Link>
      )
    }

    const [collections, setCollections] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          const collections = await getCollections();
          setCollections(collections);
      };
      fetchData();
  }, []);

    const [selectCollection, setSelectCollection] = useState();
    const [message, setMessage] = useState('');

    const addCollection = async () => {
        const mangaadd = {
            id: item.id,
            name: item.name,
            capa: item.capa,
        }
        try {
            const response = await addMangaInCollectionByID(selectCollection, mangaadd);
            if(response){
                setMessage('Mangá adicionado com sucesso');
                setTimeout(() => {
                    setModal(!modal);
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    function CollectionItemRow({ item, open }) {
        return (
            <Column style={{ zIndex: 99, flexGrow: 1,}} onClick={() => setSelectCollection(item.id)}>
            <BTColection
                style={{ backgroundColor: item?.color, alignSelf: 'center', width: 100, height: 100, fontSize: 42, border: `4px solid ${selectCollection == item.id ? '#fff' : '#30303010'}`, }}
            >
                {item?.icon}
            </BTColection>
                <Column style={{ justifyContent: 'center', borderRadius: 6, transition: '.2s linear' , marginBottom: 20,}}>
                <Label style={{ fontSize: 15, textAlign: 'center', }}>{item?.name}</Label>
                <Label style={{ fontSize: 12, textAlign: 'center', }}>{item?.mangas_ids.length} mangás</Label>
                </Column>
            </Column>
        );
    }


    const ListChapters = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 30;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = chapters.slice(indexOfFirstItem, indexOfLastItem);
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        

        const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <Row style={{ justifyContent: 'center', marginTop: 20 }}>
                {pageNumbers.map((number) => (
                    <ButtonOff
                        key={number}
                        onClick={() => paginate(number)}
                        style={{ margin: 5 }}
                    >
                        {number}
                    </ButtonOff>
                ))}
            </Row>
        );
    };
    const [show, setShow] = useState(false);

        return (
            <Column style={{ height: 500, overflowY: 'auto' }}>
                {show ? 
                <>
                {currentItems.map((item, index) => (
                    <Chapter key={index} item={item} />
                ))}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={chapters.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
                </>
                : 
                <Column>
                <Image src="https://i.pinimg.com/564x/5e/be/4e/5ebe4ef85cec42f739d417e7b10f2347.jpg" alt='show chapters' width={200} height={300} style={{alignSelf: 'center', objectFit: 'cover', borderRadius: 12, transform: 'rotate(16deg)', marginTop: 30, marginBottom: 20, }}/>
                <Title style={{textAlign: 'center', marginTop: 10, marginBottom: 20,}}>Preparado novato?</Title>
                <ButtonPrimaryLight style={{width: 200, alignSelf: 'center', }} onClick={() => setShow(!show)}>Mostar capítulos</ButtonPrimaryLight>
                </Column>
                }
            </Column>
        );
    };


    const reaction = item?.rate >= 4 ? 'Ótimo' : item?.rate >= 3 ? 'Bom' : item?.rate <= 2 ? 'Ruim' : 'Regular';
    const reaction_color = reaction === 'Ótimo' ? '#FFC4A3' : reaction === 'Bom' ? '#B5FFBC' :  reaction === 'Ruim' ? '#1D1A39' : '#FFFFCA';
    const reaction_image =  reaction === 'Ótimo' ? 'https://em-content.zobj.net/source/samsung/380/smiling-face-with-heart-eyes_1f60d.png' : reaction === 'Bom'? 'https://em-content.zobj.net/source/microsoft/379/smiling-face-with-smiling-eyes_1f60a.png' : reaction === 'Ruim' ? 'https://em-content.zobj.net/source/microsoft/379/skull_1f480.png' : 'https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png';
    const reaction_desc = reaction === 'Ótimo' ? 'Um mangá fantástico, pode ler sem medo!' : reaction === 'Bom' ? 'A galera está gostando dsse mangá!' : reaction === 'Ruim' ? 'Não está agradando a maioria das pessoas' : 'Não podemos opinar no momento'

    if(!loading){
    return (
        <Column    style={{background: `linear-gradient(-145deg, #282828 10%, #171717 50%)`, overflowX: 'hidden', position: 'relative',  padding: '44px', overflowY:'auto', borderRadius: 12, }}>
            <Column>
                <Column className='circle' style={{backgroundColor: cl,}}/>
                <Column className='circle2' style={{backgroundColor: rl,}}/>
                <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>

                    <Row>

                    <Column>
                        <Image src={item?.capa} className='coverimg' width={260} height={370}  alt={item?.name} style={{objectFit: 'cover', zIndex: 99, backgroundColor: "#404040", marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                    </Column>
                   
                    <Column style={{justifyContent: 'center', marginLeft: 34, marginRight:34, }}>
                        <Row>
                            <Label style={{backgroundColor: cl, color: "#000"}} className='type'>&#10038; {item?.type} &#10022;	</Label>
                            <Label style={{backgroundColor: rl, color: "#000", marginLeft: 20,}} className='ongoing'>&#9900; {item?.status}</Label>
                            <Label style={{backgroundColor: "#FF94A7", color: "#000", marginLeft: 20,}} className='ongoing'>&#10004; Verificado</Label>
                        </Row>
                        
                        <Title style={{fontSize: '2.6em',  fontFamily: 'Black', width: 500,}}>{item?.name?.slice(0, 40)}</Title>
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

                        
                        <Row className='btrow'>
                            <Column className='icb'>
                                <FaCalendarDays />
                            </Column>
                            <Label>{item?.rate}</Label>
                        </Row>
                       
                       {item?.author?.length > 1 && <Row className='btrow'>
                            <Column className='icb'>
                                <FaUserAstronaut/>
                            </Column>
                            <Label>{item?.author}</Label>
                        </Row>}
                     </Row>
                    </Column>



                    </Row>

                    <Column style={{width: 500,   overflow: 'hidden',  borderRadius: 12, backgroundColor: "#303030", zIndex: 9,}}>
                        <Column style={{justifyContent: 'center',  padding: 24,}}>
                            
                            <Row style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Column style={{padding: 22, marginBottom: 10, borderRadius: 32, background: reaction_color, marginRight: 15,}}>
                                        <Image src={reaction_image} alt='reaction manga' width={64} height={64} className='emoji'/>
                                    </Column>
                                    <Column >
                                        <Title style={{color: reaction_color, }}>{reaction}</Title>
                                        <Label style={{color: reaction_color }}>{reaction_desc}</Label>
                                    </Column>
                                </Row> 
                            
                            
                            <Row className='add_collection' style={{backgroundColor: '#404040', alignItems: 'center', margin: 6, cursor: 'pointer', borderRadius: 5, color: '#fff', padding: 12, flexGrow: 1, }} onClick={() => setModal(!modal)}>
                                <Column style={{width: 44, height: 44, marginRight: 15, borderRadius: 4, backgroundColor: "#505050", justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 32, }}>
                                    <FiPlus />
                                </Column>
                                <Title style={{}}>Adicionar a coleção </Title>
                            </Row>

                            <Row style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'space-between', marginLeft: 10, marginRight: 10,}}>
                                <ButtonPrimaryLight>Curtir</ButtonPrimaryLight>
                                <ButtonOff>Seguir</ButtonOff>
                                <ButtonOff>Compartilhar</ButtonOff>
                            </Row>
                            <Row style={{ alignItems: 'center', }}>
                                <Link href={`${id}/${item?.chapters}`}><Column className="play"><FaPlay/></Column></Link>
                                <Column style={{marginLeft: 10,}}>
                                <Label>Começe a ler agora mesmo</Label>
                                <Row style={{flexGrow: 1, marginTop: 12,}}>
                                    <Column style={{height: 10, borderRadius: 100, width: '20%', background: '#B5FFBC'}}/>
                                    <Column style={{height: 10, borderRadius: 100, flexGrow: 1,  background: '#505050', marginLeft: 8,}}/>
                                </Row>
                                </Column>
                          
                            </Row>
                        </Column>
                    </Column>




                </Row>
                

                        <Row style={{justifyContent: 'spacee-between', marginTop: 30,}}>

                        <Column style={{  flexGrow: 1, marginRight: 30, backgroundColor: "#303030", padding: '20px 20px',  borderRadius: 8,}}>
                            <Title style={{marginBottom: 10, marginTop: 10,}}>Recentes</Title>
                            {chapters?.slice(0, 8).map((item, index) => <Chapter key={index} index={index} item={item}/>)}
                        </Column>
                        <Column style={{ marginBottom: 20, flexGrow: 1, backgroundColor: "#303030", borderRadius: 8, padding: 20, paddingRight: 6,}}>
                            <Row style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10, }}>

                                <Title style={{}}>Todos (30 de {item?.chapters})</Title>
                                <Row style={{marginRight: 30,}}>
                                    <Link href={`${id}/${item?.chapters}`}>
                                    <ButtonOff style={{marginRight: 14,}}>Último capítulo</ButtonOff>
                                    </Link>
                                    <Link href={`${id}/1`}>
                                    <ButtonPrimaryLight>Primeiro capítulo</ButtonPrimaryLight>
                                    </Link>
                                </Row>
                            </Row>
                            <ListChapters/>
                        </Column>

                        </Row>

            </Column>


            {modal &&
            <Column className='fadeInUp' style={{width: '100%', borderRadius: 12, height: '100%', backgroundColor: "#00000090" , position: 'absolute', top: 0, left: 0, zIndex: 99,}}>
                <Column style={{width: 600, borderRadius: 12,  padding: 24, backgroundColor: "#262626" , position: 'absolute', top: 100, alignSelf: 'center', zIndex: 99,}}>
                    <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title style={{fontSize: 32,}}>Adicionar a coleção</Title>
                        <IoClose style={{fontSize: 32, color: "#fff", cursor: 'pointer', padding: 8, }} onClick={() => setModal(!modal)}/>
                    </Row>
                    <Column style={{marginTop: 24,}}>
                    <Row style={{ paddingTop: 12, backgroundColor: "#303030", borderRadius: 8, flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', }}>
                    {collections?.map((item, index) => (
                        <CollectionItemRow key={item.id} item={item} open={open} />
                        ))}
                    </Row>
                    </Column>
                    <Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                        <ButtonOff>Descartar</ButtonOff>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Label style={{marginRight: 10,}}>{message}</Label>
                            <ButtonPrimary onClick={addCollection}>
                                {loading ? <Loader/> : 'Salvar' }
                                </ButtonPrimary>
                        </Row>
                    </Row>
                    <Column style={{width: 80, height: 10, backgroundColor: '#606060', borderRadius: 100, alignSelf: 'center', marginTop: 20,}}/>
                </Column>
            </Column>
            }
        </Column>
    )
}
    else if(loading){
        return(
        <Column style={{padding: 44,}}>
            <Row>
            <Skeleton width={240} height={360}/>
            <Column>
                <Skeleton width={600} height={100} left={30} top={30}/>
                <Skeleton width={470} height={80} left={30} top={20} bottom={20}/>
                <Skeleton width={400} height={40} />
            </Column>
            
            <Skeleton width={400} height={400} left={100}/>
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

/**
 * 
 * 
 * 

                    {images?.length > 0 &&
                    <Column style={{width: 400, height: 400,  overflow: 'hidden',  borderRadius: 12, backgroundColor: "#ED274A"}}>
                        <Row style={{ zIndex: 2, transform: 'rotate(-25deg)', flexWrap: 'wrap', width:570,}}>
                        {images?.map((img, index) => 
                        <Image src={img} key={index}width={120} height={200}  alt={item?.name} style={{objectFit: 'cover', backgroundColor: "#404040", marginTop: 20, marginRight: 20, alignSelf: 'center',  borderRadius: 6,}}/>
                        )}
                        </Row>
                        </Column>
                    }

 */