'use client';
import { AiOutlineArrowRight } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { Column, Row, Title, Label, BTFlow, ButtonOff, ButtonPrimary, BTColection, ButtonPrimaryLight } from '../../../themes/global';
import { FaPlay } from "react-icons/fa";
import { FaUserAstronaut, FaCalendarDays, FaStar } from "react-icons/fa6"
import './manga.css'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '../../../components/Loading';
import { IoClose } from "react-icons/io5";
import Loader from '../../../components/Loader';
import { addMangaInCollectionByID, getCollections } from '../../../requests/collections/request';
import { CiBookmarkPlus, } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

import { useRouter } from 'next/navigation'
import NavBar from '../../../components/NavBar';
import { addFollow, addMark, dislikeManga, likeManga, removeFollow, verifyLiked, verifyFollow, addComplete, removeComplete, verifyComplete } from '../../../requests/user/requests';
import SimilarComponent from "../../../components/Home/Similar";
import CommentsComponent from "../../../components/Comments/main";

import { getManga } from '@api/getManga'
import { getChapters } from '@api/getChapters'
import { getCovers } from '@api/getCovers'


export default function DetailsManga({ params }) {
    const id = params.id
    const [loading, setLoading] = useState(true);
    const a = false;

    const [item, setItem] = useState();
    const [chapters, setChapters] = useState([]);
    const [similar, setSimilar] = useState();
    const [covers, setcovers] = useState();
    const [onSearch, setonSearch] = useState();
    const [search, setSearch] = useState();
    const [modal, setModal] = useState(false);

    const cl = item?.type === 'MANGA' ? "#FFA8B7" : item?.type === 'MANHWA' ? "#BBD2FF" : item?.type === 'MANHUA' ? "#BFFFC6" : '#FFF'; const rl = item?.status === 'Finalizado' ? '#BFFFC6' : '#FFC7A8'

    const [liked, setLiked] = useState(false);
    const [collections, setCollections] = useState([]);
    const [follow, setFollow] = useState(false);
    const [complete, setComplete] = useState(false);

    const cp = [
        { date: '22 de Jun, 2024', number: 12, },
        { date: '12 de Jun, 2024', number: 11, },
        { date: '2 de Jun, 2024', number: 10, },
        { date: '25 de Abr, 2024', number: 9, },
        { date: '13 de Abr, 2024', number: 8, },
        { date: '2 de Abr, 2024', number: 7, },
        { date: '24 de Mai, 2024', number: 6, },
        { date: '12 de Mai, 2024', number: 5, },
        { date: '1 de Mai, 2024', number: 4, },
        { date: '24 de Mar, 2024', number: 3, },
        { date: '17 de Mar, 2024', number: 2, },
        { date: '5 de Mar, 2024', number: 1, },
    ]

    useEffect(() => {
        setLoading(true)
        const requestData = async () => {
            getManga(id).then((response) => {
                setItem(response)
                setLoading(false);
            })

            getChapters(id).then((response) => {
                console.log(response)
                setChapters(response)
            })

            getCovers(id).then((response) => {
                setcovers(response)
            })

            //requestSimilar(id).then((response) => {
            //  setSimilar(response.mangas)
            // })
        };
        const verifyColl = async () => {
            const collections = await getCollections();
            setCollections(collections);
        };
        const verifyLike = () => {
            const response = verifyLiked(id);
            if (response) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        const verifyFoll = () => {
            const response = verifyFollow(id);
            if (response) {
                setFollow(true)
            } else {
                setFollow(false)
            }
        }
        const verifyComp = () => {
            const response = verifyComplete(id);
            if (response) {
                setComplete(true)
            } else {
                setComplete(false)
            }
        }
        verifyComp()
        requestData()
        verifyLike()
        verifyFoll()
        verifyColl();
    }, [id])


    const Chapter = ({ it }) => {
        const router = useRouter()
        const handle = () => {
            router.push(`${id}/${it?.id}`)
        }

        const [hovered, setHovered] = useState(false);
        const [mark, setMark] = useState(false);
        const manga = { name: item?.name, id: item?.id, capa: item?.capa, }

        const addMarkBook = async () => {
            try {
                const res = addMark(manga, it.number);
                setMark(res);
            } catch (error) {
                console.error(error);
            }
        };
        return (
            <li>
                <Row onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ padding: 12, marginRight: 6, borderRadius: 6, marginTop: 5, alignItems: 'center', }} className='chapter'>
                    {hovered ? <Label style={{ fontSize: 18, marginRight: 30, cursor: 'pointer', }} onClick={handle}> &#9658; </Label> : <Label style={{ fontSize: 18, marginRight: 20, }}>#{it?.chapter}</Label>}
                    <Column style={{ flexGrow: 1, }}>
                        <Title style={{ fontSize: 18, }}>{it?.title?.length > 30 ? it?.title?.slice(0, 30) + '...' : it?.title}</Title>
                        <Label style={{ fontSize: 14, marginRight: 20, }}>{it?.publish_date}</Label>
                    </Column>
                    <Row>
                        {it?.language.map((it, i) =>
                            <Label key={i} style={{ fontSize: 12, textTransform: 'uppercase', marginRight: 20, backgroundColor: '#fff', borderRadius: 4, padding: 4, color: '#000', }}>{it}</Label>
                        )}
                        <CiBookmarkPlus onClick={addMarkBook} style={{ color: mark ? "#03a1fc" : '#f8f8f890', fontSize: 22, cursor: 'pointer' }} />
                    </Row>
                </Row>
            </li>
        )
    }

    const [selectCollection, setSelectCollection] = useState();
    const [message, setMessage] = useState('');

    const addCollection = async () => {
        const mangaadd = {
            id: item.id,
            name: item.name,
            capa: item.capa,
        }
        try {
            const response = addMangaInCollectionByID(selectCollection, mangaadd);
            if (response) {
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
            <Column style={{ zIndex: 99, flexGrow: 1, }} onClick={() => setSelectCollection(item.id)}>
                <BTColection
                    style={{ backgroundColor: item?.color, alignSelf: 'center', width: 100, height: 100, fontSize: 42, border: `4px solid ${selectCollection == item.id ? '#fff' : '#30303010'}`, }}
                >
                    {item?.icon}
                </BTColection>
                <Column style={{ justifyContent: 'center', borderRadius: 6, transition: '.2s linear', marginBottom: 20, }}>
                    <Label style={{ fontSize: 15, textAlign: 'center', }}>{item?.name}</Label>
                    <Label style={{ fontSize: 12, textAlign: 'center', }}>{item?.mangas_ids.length} mangás</Label>
                </Column>
            </Column>
        );
    }

    const ListChapters = ({search, onSearch}) => {
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 15;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = chapters.slice(indexOfFirstItem, indexOfLastItem);


        const searchResult = currentItems.filter(item => item.chapter === parseInt(search));

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
                pageNumbers.push(i);
            }
            return (
                <Row style={{ justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
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
        const [show, setShow] = useState(true);

        return (
            <Column style={{ height: 500, overflowY: 'auto' }}>
                {show ?
                    <ul style={{ listStyle: 'none', marginLeft: -35, }}>
                        {onSearch ? 
                        <>
                        {searchResult.map((it, i) => <Chapter key={i} it={it} />)}
                        </>
                      :
                      <>
                        {currentItems.map((item, index) => (
                            <Chapter key={index} it={item} />
                            ))}
                        </>
                        }


                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={chapters.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </ul>
                    :
                    <Column>
                        <Image src="https://i.pinimg.com/564x/5e/be/4e/5ebe4ef85cec42f739d417e7b10f2347.jpg" alt='show chapters' width={200} height={300} style={{ alignSelf: 'center', objectFit: 'cover', borderRadius: 12, transform: 'rotate(16deg)', marginTop: 30, marginBottom: 20, }} />
                        <Title style={{ textAlign: 'center', marginTop: 10, marginBottom: 20, }}>Preparado novato?</Title>
                        <ButtonPrimaryLight style={{ width: 200, alignSelf: 'center', }} onClick={() => setShow(!show)}>Mostar capítulos</ButtonPrimaryLight>
                    </Column>
                }
            </Column>
        );
    };

    const toggleLike = () => {
        const manga = {
            id: id,
            name: item?.name,
            capa: item?.capa,
        }
        if (liked) {
            const response = dislikeManga(id);
            if (response) {
                setLiked(false)
            }
        }
        else {
            const response = likeManga(manga);
            if (response) {
                setLiked(true)
            }
        }
    }

    const toggleFollow = () => {
        const manga = {
            id: id,
            name: item?.name,
            capa: item?.capa,
            chapter: item?.chapters,
        }
        if (follow) {
            const res = removeFollow(id);
            if (res) {
                setFollow(false)
            }
        }
        else {
            const res = addFollow(manga)
            if (res) {
                setFollow(true)
            }
        }
    }
    const toggleComplete = () => {
        const manga = {
            id: id,
            name: item?.name,
            capa: item?.capa,
            chapter: item?.chapters,
        }
        if (complete) {
            const res = removeComplete(id);
            if (res) {
                setComplete(false)
            }
        }
        else {
            const res = addComplete(manga)
            if (res) {
                setComplete(true)
            }
        }
    }

    const reaction = item?.rate >= 4 ? 'Ótimo' : item?.rate >= 3 ? 'Bom' : item?.rate <= 2 ? 'Ruim' : 'Regular';
    const reaction_color = reaction === 'Ótimo' ? '#FFC4A3' : reaction === 'Bom' ? '#B5FFBC' : reaction === 'Ruim' ? '#1D1A39' : '#FFFFCA';
    const reaction_image = reaction === 'Ótimo' ? 'https://em-content.zobj.net/source/samsung/380/smiling-face-with-heart-eyes_1f60d.png' : reaction === 'Bom' ? 'https://em-content.zobj.net/source/microsoft/379/smiling-face-with-smiling-eyes_1f60a.png' : reaction === 'Ruim' ? 'https://em-content.zobj.net/source/microsoft/379/skull_1f480.png' : 'https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png';
    const reaction_desc = reaction === 'Ótimo' ? 'Um mangá fantástico, pode ler sem medo!' : reaction === 'Bom' ? 'A galera está gostando dsse mangá!' : reaction === 'Ruim' ? 'Não está agradando a maioria das pessoas' : 'Não podemos opinar no momento'

    if (!loading) {
        return (
            <Column style={{ background: `linear-gradient(-145deg, #282828 10%, #171717 50%)`, overflowX: 'hidden', position: 'relative', overflowY: 'auto', borderRadius: 12, }}>
                <NavBar />
                <Column style={{ padding: '44px', paddingTop: 10, }}>
                    <Column className='circle' style={{ backgroundColor: cl, }} />
                    <Column className='circle2' style={{ backgroundColor: rl, }} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Row>
                            <Column>
                                <img src={item?.capa} className='coverimg' width={260} height={370} alt={item?.name} style={{ objectFit: 'cover', zIndex: 99, backgroundColor: "#404040", marginTop: 20, marginBottom: 20, alignSelf: 'center', borderRadius: 6, }} />
                            </Column>

                            <Column style={{ justifyContent: 'center', marginLeft: 34, marginRight: 34, }}>
                                <Row>
                                    <Label style={{ backgroundColor: cl, color: "#000" }} className='type'>&#10038; {item?.type} &#10022;	</Label>
                                    <Label style={{ backgroundColor: "#FF94A7", color: "#000", marginLeft: 20, }} className='ongoing'>{item?.status}</Label>
                                </Row>

                                <Title style={{ fontSize: '2.6em', fontFamily: 'Black', width: 500, }}>{item?.name?.slice(0, 40)}</Title>
                                <Label style={{ marginTop: 5, lineHeight: 1.5, fontSize: 16, width: 500, }}>{item?.desc?.slice(0, 270)}...</Label>

                                <Row style={{ alignItems: 'center', marginTop: 20, }}>


                                    <Row className='btrow'>
                                        <Column className='icb'>
                                            <FaCalendarDays />
                                        </Column>
                                        <Label>{item?.year}</Label>
                                    </Row>


                                    {item?.rate != 'Rate this mangas' && <Row className='btrow'>
                                        <Column className='icb'>
                                            <FaStar />
                                        </Column>
                                        <Label>{item?.rate}</Label>
                                    </Row>}

                                    {item?.author?.length > 1 && <Row className='btrow'>
                                        <Column className='icb'>
                                            <FaUserAstronaut />
                                        </Column>
                                        <Label>{item?.author}</Label>
                                    </Row>}
                                </Row>
                            </Column>
                        </Row>
                        <Column style={{ width: 450, overflow: 'hidden', borderRadius: 12, backgroundColor: "#303030", zIndex: 9, }}>
                            <Column style={{ justifyContent: 'center', padding: 24, }}>

                                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Column style={{ padding: 22, marginBottom: 10, borderRadius: 32, background: reaction_color, marginRight: 15, }}>
                                        <Image src={reaction_image} alt='reaction manga' width={64} height={64} className='emoji' />
                                    </Column>
                                    <Column >
                                        <Title style={{ color: reaction_color, }}>{reaction}</Title>
                                        <Label style={{ color: reaction_color }}>{reaction_desc}</Label>
                                    </Column>
                                </Row>


                                <Row className='add_collection' style={{ alignItems: 'center', margin: 6, cursor: 'pointer', borderRadius: 5, color: '#fff', padding: 12, flexGrow: 1, }} onClick={() => setModal(!modal)}>
                                    <Column style={{ width: 44, height: 44, marginRight: 15, borderRadius: 4, backgroundColor: "#505050", justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 32, }}>
                                        <FiPlus />
                                    </Column>
                                    <Title style={{}}>Adicionar a coleção </Title>
                                </Row>

                                <Row style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'space-between', marginLeft: 10, marginRight: 10, }}>
                                    <ButtonPrimaryLight onClick={toggleLike} style={{ background: liked ? '#ED274A' : "#fff", color: liked ? "#fff" : '#000', }}>{liked ? 'Curtiu' : 'Curtir'}</ButtonPrimaryLight>
                                    <ButtonOff onClick={toggleFollow} style={{ background: follow ? '#fff' : "#404040", color: follow ? "#000" : '#fff', }}>{follow ? 'Seguindo' : 'Seguir'}</ButtonOff>
                                    <ButtonOff>Compartilhar</ButtonOff>
                                </Row>
                                <Row style={{ alignItems: 'center', }}>
                                    <Link href={`${id}/${item?.chapters}`}><Column className="play"><FaPlay /></Column></Link>
                                    <Column style={{ marginLeft: 10, }}>
                                        <Label>Começe a ler agora mesmo</Label>
                                        <Row style={{ flexGrow: 1, marginTop: 12, }}>
                                            <Column style={{ height: 10, borderRadius: 100, width: '20%', background: '#B5FFBC' }} />
                                            <Column style={{ height: 10, borderRadius: 100, flexGrow: 1, background: '#505050', marginLeft: 8, }} />
                                        </Row>
                                    </Column>

                                </Row>
                            </Column>
                        </Column>
                    </Row>

                    <Row style={{ justifyContent: 'spacee-between', marginTop: 30, }}>
                        <Column style={{ width: 500, marginRight: 30, backgroundColor: "#303030", padding: '20px 20px', borderRadius: 8, }}>
                            <Title>Recentes</Title>
                            <ul style={{ listStyle: 'none', marginLeft: -35, marginTop: 10, }}>
                                {chapters?.slice(0, 8).map((item, index) => <Chapter key={index} index={index} it={item} />)}
                            </ul>
                            <ButtonOff onClick={toggleComplete} style={{ background: complete ? '#b5ffc0' : "#404040", color: complete ? "#000" : '#fff', alignSelf: 'center', }}>{complete ? 'Mangá Completo' : 'Marcar como completo'}</ButtonOff>

                        </Column>


                        <Column style={{ width: 800, backgroundColor: "#303030", borderRadius: 8, padding: 20, paddingRight: 6, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10, }}>
                                <Title>Todos (15 de {item?.chapters})</Title>
                                {a &&
                                    <Row style={{ marginRight: 30, }}>
                                        <Link href={`${id}/${item?.chapters}`}>
                                            <ButtonOff style={{ marginRight: 14, }}>Último</ButtonOff>
                                        </Link>
                                        <Link href={`${id}/1`}>
                                            <ButtonPrimaryLight>Primeiro</ButtonPrimaryLight>
                                        </Link>
                                    </Row>
                                }
                            </Row>
                            <Row style={{ paddingRight: 30, marginTop: -10, }}>
                                <input type="number" onChange={e => setSearch(e.target.value)} onFocus={() => setonSearch(true)} onBlur={() => setonSearch(false)} value={search} placeholder="Buscar capítulo" min="1" max={item?.chapters} style={{ padding: 12, flexGrow: 1, borderRadius: 6, fontFamily: 'Book', backgroundColor: "#404040", color: "#fff", border: 'none', fontSize: 18, }} />
                                
                            </Row>
                            <ListChapters search={search} onSearch={onSearch} />
                        </Column>

                    </Row>

                    <SimilarComponent data={similar} name={item?.name} />
                    <CommentsComponent name={item?.name} id={item?.id} />
                </Column>

                {modal &&
                    <Column className='fadeInUp' style={{ width: '100%', borderRadius: 12, height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 99, }}>
                        <Column style={{ width: 600, borderRadius: 12, padding: 24, backgroundColor: "#262626", position: 'absolute', top: 100, alignSelf: 'center', zIndex: 99, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title style={{ fontSize: 32, }}>Adicionar a coleção</Title>
                                <IoClose style={{ fontSize: 32, color: "#fff", cursor: 'pointer', padding: 8, }} onClick={() => setModal(!modal)} />
                            </Row>
                            <Column style={{ marginTop: 24, }}>

                                {collections.length > 0 && <Row style={{ paddingTop: 12, backgroundColor: "#303030", borderRadius: 8, flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', }}>
                                    {collections?.map((item, index) => (
                                        <CollectionItemRow key={item.id} item={item} open={open} />
                                    ))}
                                </Row>}
                                {collections.length === 0 && <Column style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image src="https://i.pinimg.com/564x/9e/66/8b/9e668bfd56fc3aa8067e8ee1727f1921.jpg" alt="Nenhuma coleção foi criada ainda..." width={200} height={200} style={{ objectFit: 'cover', borderRadius: 12, marginBottom: 20, }} />
                                    <Title>Nenhuma coleção foi criada ainda...</Title>
                                    <Label style={{ marginBottom: 10, }}>Aproveite para criar uma agora mesmo</Label>
                                    <ButtonPrimaryLight>Criar coleção</ButtonPrimaryLight>
                                </Column>}


                            </Column>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                                <ButtonOff>Descartar</ButtonOff>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{ marginRight: 10, }}>{message}</Label>
                                    <ButtonPrimary onClick={addCollection}>
                                        {loading ? <Loader /> : 'Salvar'}
                                    </ButtonPrimary>
                                </Row>
                            </Row>
                            <Column style={{ width: 80, height: 10, backgroundColor: '#606060', borderRadius: 100, alignSelf: 'center', marginTop: 20, }} />
                        </Column>
                    </Column>
                }
            </Column>
        )
    }
    else if (loading) {
        return (
            <Column style={{ padding: 44, }}>
                <Row>
                    <Skeleton width={240} height={360} />
                    <Column>
                        <Skeleton width={600} height={100} left={30} top={30} />
                        <Skeleton width={470} height={80} left={30} top={20} bottom={20} />
                        <Skeleton width={400} height={40} left={30} />
                    </Column>

                    <Skeleton width={400} height={400} left={100} />
                </Row>
                <Column>
                    <Skeleton width={'100%'} height={160} top={50} />

                    <Skeleton width={300} height={70} top={50} />
                    <Skeleton width={'100%'} height={60} top={40} />
                    <Skeleton width={'100%'} height={60} top={10} />
                    <Skeleton width={'100%'} height={60} top={10} />
                    <Skeleton width={'100%'} height={60} top={10} />
                    <Skeleton width={'100%'} height={60} top={10} />
                    <Skeleton width={'100%'} height={60} top={10} />
                </Column>
            </Column>
        )
    }
}
