'use client';
import React, { useEffect,  useState} from 'react';
import { Column, Row, Title, Label, } from '../../../themes/global';
import './details.css' 
import stories from '../../../requests/mangalist';
import Image from 'next/image';
import ListMangalist from '../../../components/Cards/list_mangalist';
import NavBar from '../../../components/NavBar';

export default function MangaListDetails({ params }) {
    const id = Number(params.id);
    const item = stories.find((item) => item.id === id);

    return (
        <Column style={{ overflow: 'auto',}}>
        <Column style={{ background: `linear-gradient(145deg, ${item?.color}50 -20.91%, #191919 54.92%)`, }}>
            <NavBar />
            <Column style={{paddingLeft: 44, paddingRight: 44, paddingBottom: 74, paddingTop: 24, }}>
            <Row>
                <Column className='scale-ani' style={{ width: 150, height: 150, borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Image src={item?.capa} alt="capa da mangalist" width={150} height={150} style={{borderRadius: 8, objectFit: 'cover'}}/>
                </Column>
                <Column style={{justifyContent: 'center',}}>
                        <Label style={{marginLeft: 44, color: "#ffffff90"}}>Mangálist</Label>
                    <Row style={{alignItems: 'center', }}>
                        <Title   style={{ marginLeft: 44, fontSize: 54, background: "#30303000", border: 'none', fontFamily: 'Bold', color: "#fff",}}> {item?.name}</Title>
                    </Row>
                    <Label style={{marginLeft: 44, color: "#ffffff90"}}>Criado {item?.date} • {item?.mangas_ids.length} mangás</Label>
                </Column>
            </Row>
            </Column>

        </Column>
    
        <Column style={{paddingTop: 40, borderRadius: 24, backgroundColor: '#202020', marginTop: -30,}}>
            <Title style={{marginLeft: 44, fontSize: 42, marginBottom: 20,}}>Mangás</Title>
            <ListMangalist data={item.mangas_ids} />
        </Column>
         </Column>
        
    )
}