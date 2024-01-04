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
        <Column className='banner' style={{paddingBottom: 44,
            background: `linear-gradient(145deg, ${item.color} -20.91%, #191919 54.92%)`,
        }}>
            <Title style={{marginTop: 44, marginLeft: 44, fontSize: 54,}}>{item?.name} {item?.icon}</Title>
            <Label style={{marginLeft: 44, color: "#ffffff90"}}>Criado {item?.date}  </Label>

        </Column>
    
        <Column className='content'>
            <ListMangaWrap />
        </Column>
         </>
        
    )
}