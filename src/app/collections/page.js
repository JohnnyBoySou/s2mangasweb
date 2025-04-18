'use client';
import React, {useEffect, useState} from 'react';
import { Column, Row, Title, Label, BTColection, BTColectionLarge, ButtonOff, ButtonPrimary, ButtonPrimaryLight} from '../../../old/themes/global'; 
import './collections.css'
import Link from 'next/link'; 
import { IoClose } from "react-icons/io5";
import { createCollection, excludeAllCollections, getCollections } from '../../../old/requests/collections/request';
import Loader from '../../components/Loader';
import Image from 'next/image';
import { listCollections } from '@/api/collection';
import { useQuery } from '@tanstack/react-query';
import { addCollection } from '../../api/collection/index';

export default function Collections() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["collections"],
    queryFn: listCollections,
  });

  console.log(data)

//  if (isLoading) return <Loading />;
//  if (isError) return <Error />;


    const [collections, setCollections] = useState([]);
    const [name, setName] = useState();
    const [icon, setIcon] = useState();
    const [color, setColor] = useState();
    const [loading, setLoading] = useState(false);

    const listColors = [
        '#adffef', '#32a852',
        '#ff878f', '#171213',
        '#c0d7fc', '#ffe2b8',
        '#DDF093', '#CE4760',
         '#90E39A',
        '#FFC0CB', '#00FFFF',
        '#FFD700', '#800080',
        '#FFA500', 
    ];
    const icones = [
        '😁', 
        '😅', '😂', '🤣', '😊', '😇',
        '😍', '🥰', '😎',  '😜','🏍️','⛩️',
        '😏',  '😬',  '😕', '🎖️',
        '👍',  '👌','🐈','✨',
         '👊', '👏', '🎅', '🦇','🏎️',
        '🤲', '🤝', '🙏', '✍️', '💪'
    ];


   

    const [modal, setModal] = useState(false);
    
    const excludeAll = () => {
      try {
        const response = excludeAllCollections();
        if(response){
            setLoading(false)
            console.log('Excluido')
        }
      }
        catch (error) {
            console.error(error);
        }
    }
    
    
    return (
        <Column style={{padding: 44,}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Title>Suas Coleções</Title>
                <Row>
                    <ButtonPrimary onClick={() => setModal(!modal)}>Nova Coleção</ButtonPrimary>
                    <ButtonOff onClick={excludeAll} style={{marginLeft: 10,}}>Excluir todas</ButtonOff>
                </Row>
            </Row>



           {collections.length === 0 && 
           <Column style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, }}>
                <Image src='https://i.pinimg.com/564x/7e/72/0e/7e720ea1e4cca83e0118f28d824509a7.jpg' width={200} height={200} alt='empety collection' style={{ objectFit: 'cover', borderRadius: 24, transform: 'rotate(18deg)',  }}/>
                <Title style={{textAlign: 'center', marginBottom: 10, marginTop: 30, fontSize: 32,}}>Nenhuma coleção encontrada</Title>
                <Label style={{textAlign: 'center', marginBottom: 15,}}>Crie uma nova coleção para começar <br/>a adicionar mangás e organizar-lós.</Label>
                <ButtonPrimaryLight>Criar coleção</ButtonPrimaryLight>
              </Column>
           }
           
            <Row style={{flexWrap: 'wrap', marginTop: 12,}}>
            {collections.map((item, index) => {
                return(
                    <Link key={index} href={`/collections/${item.id}`} style={{textDecoration: 'none'}}>
                <Column key={index} style={{ alignSelf: 'center', margin: 10, zIndex: 99, position: 'relative'}}>
                    <BTColectionLarge key={index} style={{backgroundColor: item?.color,}}>{item?.icon}</BTColectionLarge> 
                    <Label style={{width: 124, textAlign: 'center', color: '#fff',}}>{item?.name}</Label>
                    </Column>
                    </Link>
                 )})}
            </Row>



            
        </Column>
    )
}


const AddCollection = (params) => {

    const handleNew = async () => {
        setLoading(true)
        try {
            const response = await createCollection();
            if(response){
                setLoading(false)
                setModal(!modal);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
            <Column className='fadeInUp' style={{width: '100%', borderRadius: 12, height: '100%', backgroundColor: "#00000090" , position: 'absolute', top: 0, left: 0, zIndex: 99,}}>
                <Column style={{width: 600, borderRadius: 12,  padding: 24, backgroundColor: "#262626" , position: 'absolute', top: 100, alignSelf: 'center', zIndex: 99,}}>
                    <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title style={{fontSize: 32,}}>Criar coleção</Title>
                        <IoClose style={{fontSize: 32, color: "#fff", cursor: 'pointer', padding: 8, }} onClick={() => setModal(!modal)}/>
                    </Row>
                    <Column style={{marginTop: 24,}}>
                        <Label>Nome ou apelido</Label>
                        <input className='focus' type="text" style={{}} onChange={(e) => setName(e.target.value)}/>
                        <Label>Icone</Label>
                        <Row style={{flexWrap: 'wrap', marginBottom: 10,}}>
                        {icones.map((item, index) => <Column key={item} style={{backgroundColor: '#303030', cursor: 'pointer', border: `3px solid ${icon === item ? "#fff" : "#303030"}` , margin: 6, width: 54, height: 54, borderRadius: 12, justifyContent: 'center', alignItems: 'center', fontSize: 32,}} onClick={() => setIcon(item)}>{item}</Column>)}
                        </Row>
                        <Label>Cor</Label>
                        <Row style={{flexWrap: 'wrap',}}>
                        {listColors.map((item, index) => <Column key={item} style={{backgroundColor: item, cursor: 'pointer', border: `3px solid ${color === item ? "#fff" : "#303030"}` , margin: 6, width: 54, height: 54, borderRadius: 100,}} onClick={() => setColor(item)}/>)}
                        </Row>
                    </Column>
                    <Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                        <ButtonOff>Descartar</ButtonOff>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Label style={{marginRight: 10,}}>Existem alterações não salvas</Label>
                            <ButtonPrimary onClick={handleNew}>
                                {loading ? <Loader/> : 'Salvar' }
                                </ButtonPrimary>
                        </Row>
                    </Row>
                    <Column style={{width: 80, height: 10, backgroundColor: '#606060', borderRadius: 100, alignSelf: 'center', marginTop: 20,}}/>
                </Column>
            </Column>
    )
}