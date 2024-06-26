'use client';
import React, { useEffect,  useState} from 'react';
import { Column, Row, Title, Label, } from '@themes/global';
import './details.css' 
import stories from '@data/mangalists';
import Image from 'next/image';
import ListMangalist from '@components/Cards/list_mangalist';
import NavBar from '@components/NavBar';

export default function MangaListDetails({ params }) {
    const id = Number(params.id);
    const item = stories.find((item) => item.id === id);

    return (
        <Column style={{ overflow: 'auto',}}>
        <Column style={{ background: `linear-gradient(145deg, ${item?.color}50 -20.91%, #191919 54.92%)`, }}>
            <NavBar />
            <Column style={{paddingLeft: 44, paddingRight: 44, paddingBottom: 74, paddingTop: 24, }}>
            <Row>
                <Column className='scale-ani' style={{ width: 200, height: 200, borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Image src={item?.capa} alt="capa da mangalist" width={200} height={200} style={{borderRadius: 8, objectFit: 'cover'}}/>
                </Column>
                <Column style={{justifyContent: 'center', marginLeft: 44,}}>
                        <Label style={{ color: "#ffffff90"}}>Mangálist • {item?.date} • {item?.mangas_ids?.length} mangás</Label>
                        <Title   style={{  fontSize: 54, background: "#30303000", border: 'none', fontFamily: 'Bold', color: "#fff",}}> {item?.name}</Title>
                        <Label style={{fontSize: 24,}}>{item?.desc} </Label>
                </Column>
            </Row>
            </Column>

        </Column>
    
        <Column style={{paddingTop: 40, borderRadius: 24, backgroundColor: '#202020', marginTop: -30,}}>
            <Title style={{marginLeft: 44, fontSize: 42, marginBottom: 20,}}>Mangás</Title>
            {item?.mangas_ids?.length === 0 && <NotFound />}
            <ListMangalist data={item?.mangas_ids} />
        </Column>
         </Column>
        
    )
}


const NotFound = () => {
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 100, }}>
            <Row style={{ margin: '20px 0px' }}>
                <Column style={{ width: 120, height: 200, border: '2px dashed #606060', borderRadius: 12,   transform: 'rotate(-12deg)',  marginTop: 12,  }}/>
                <Column style={{ width: 120, height: 200, border: '2px solid #606060', background: '#202020', zIndex: 8, borderRadius: 12, margin: '0px -20px',     }}/>
                <Column style={{ width: 120, height: 200, border: '2px dashed #606060', borderRadius: 12,    transform: 'rotate(12deg)', marginTop: 12,   }}/>
            </Row>
            <Title>Nada aqui por enquanto!</Title>
            <Label>Não encontramos nenhum mangá por aqui.</Label>
        </Column>
    )
}
