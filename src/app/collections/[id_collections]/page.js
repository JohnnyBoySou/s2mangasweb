'use client';
import React from 'react';
import { Column, Row, Title, Label, } from '../../../themes/global';
import { collections } from '../../../requests/collections/list';
import './details.css' 
import ListMangaWrap from '../../../components/Cards/listwrap';

export default function CollectionsDetails({ params }) {
    const id = Number(params.id_collections);
    const item = collections.find((collection) => collection.id === id);
    return (
        <>
        <Column style={{padding: 44, background: `linear-gradient(145deg, ${item.color}50 -20.91%, #191919 54.92%)`,  }}>
            <Row>
                <Column className='scale-ani' style={{backgroundColor: item?.color, width: 150, height: 150, borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Title style={{fontSize: 58,}}>{item?.icon}</Title>
                </Column>
                <Column style={{justifyContent: 'center',}}>
                    <Label style={{marginLeft: 44, color: "#ffffff90"}}>Coleção</Label>
                    <Title style={{ marginLeft: 44, fontSize: 54,}}>{item?.name}</Title>
                    <Label style={{marginLeft: 44, color: "#ffffff90"}}>Criado {item?.date} • {item?.mangas_ids.length} mangás</Label>
                </Column>
            </Row>
        </Column>
    
        <Column style={{marginTop: 40,}}>
            <ListMangaWrap />
        </Column>
         </>
        
    )
}