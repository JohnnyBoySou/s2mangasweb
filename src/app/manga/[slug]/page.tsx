'use client';
import React, { useState } from 'react';
import { Column, Row, Title, Label, Image, Button, Skeleton } from '@/ui';
import './manga.css'
import { useParams } from 'next/navigation'

import { addFollow, dislikeManga, likeManga, removeFollow, addComplete, removeComplete, } from '../../../../old/requests/user/requests';

import { singleManga, } from '@/api/manga';
import { useQuery } from '@tanstack/react-query';
import ListChapters from '@/ui/components/List/chapters';

export default function DetailsManga({ params }) {
    const { slug } = useParams() as { slug: string };
    const [id, uuid] = slug.split('__');

    const { data: item, isLoading, isError } = useQuery({
        queryKey: ['single' + id],
        queryFn: () => singleManga(id),
    });

    /*
    const [liked, setLiked] = useState(false);
    const [follow, setFollow] = useState(false);
    const [complete, setComplete] = useState(false);
    useEffect(() => {
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
    }, [id])

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
    */

    if (isLoading) { return (<DetailsSkeleton />) }

    return (
        <Column style={{ background: `linear-gradient(-145deg, #282828 10%, #171717 50%)`, overflowX: 'hidden', position: 'relative', overflowY: 'auto', borderRadius: 12, }}>
            <Row ph={24} gh={24}>
                <Image src={item?.capa} w={200} h={300} alt={item?.name} style={{ objectFit: 'cover', zIndex: 99, backgroundColor: "#404040", marginTop: 20, marginBottom: 20, alignSelf: 'center', borderRadius: 6, }} />
                <Column>
                    <Label>{item?.type} &#10022; {item?.status}</Label>
                    <Title style={{ fontSize: '2.6em', fontFamily: 'Black', width: 500, }}>{item?.name?.slice(0, 40)}</Title>
                    <Label style={{ marginTop: 5, lineHeight: 1.5, fontSize: 16, width: 500, }}>{item?.description?.slice(0, 270)}...</Label>
                    <Row gh={12} mv={16}>
                        <Button label="Curtir" variant='ghost'/>
                        <Button label="Seguir" variant='outline'/>
                    </Row>
                </Column>
            </Row>
            <ListChapters title="Recentes" uuid={uuid} limit={5} />
            <ListChapters title="Todos os capítulos" uuid={uuid} limit={20} />
        </Column>
    )
};



/*
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

funconst ListChapters = ({ search, onSearch, chapters }) => {
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
                    <Button
                        key={number}
                        onPress={() => paginate(number)}
                        style={{ margin: 5 }}
                        label={number}
                    />
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
                </Column>
            }
        </Column>
    );
};ction CollectionItemRow({ item, open }) {
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
*/


const DetailsSkeleton = () => {
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

/*

 const reaction = item?.rate >= 4 ? 'Ótimo' : item?.rate >= 3 ? 'Bom' : item?.rate <= 2 ? 'Ruim' : 'Regular';
    const reaction_color = reaction === 'Ótimo' ? '#FFC4A3' : reaction === 'Bom' ? '#B5FFBC' : reaction === 'Ruim' ? '#1D1A39' : '#FFFFCA';
    const reaction_image = reaction === 'Ótimo' ? 'https://em-content.zobj.net/source/samsung/380/smiling-face-with-heart-eyes_1f60d.png' : reaction === 'Bom' ? 'https://em-content.zobj.net/source/microsoft/379/smiling-face-with-smiling-eyes_1f60a.png' : reaction === 'Ruim' ? 'https://em-content.zobj.net/source/microsoft/379/skull_1f480.png' : 'https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png';
    const reaction_desc = reaction === 'Ótimo' ? 'Um mangá fantástico, pode ler sem medo!' : reaction === 'Bom' ? 'A galera está gostando dsse mangá!' : reaction === 'Ruim' ? 'Não está agradando a maioria das pessoas' : 'Não podemos opinar no momento'

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
            } */