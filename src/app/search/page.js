'use client';
import React, {useState, useEffect} from 'react';
import { Column, Row, Title, Label, ButtonPrimaryLight} from '@themes/global';
import './search.css'
import { CiSearch } from "react-icons/ci";
import tags from '@data/tags'
import Link from 'next/link';
import Image from 'next/image';
import { excludeWords, listWords, saveWord } from '../../requests/search/request';
import ListSearch from '@components/Cards/list_search';
import NavBar from '../../components/NavBar';
import {getSearch} from '@api/getSearch';

export default function Search() {
    const [name, setName] = useState(); 
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const CategoryList = ({ item, index }) => {
      return(
        <Link href={`/search/category/${item.id}`} style={{textDecoration: 'none'}}>
        <Column  key={index} style={{width: 200, cursor: 'pointer', margin: 10, borderRadius: 12, height: 240, backgroundColor: item?.color, overflow: 'hidden', padding: 6, }}>
                <Title style={{fontSize: 24, margin: 10,}}>{item.name}</Title>
              </Column>
        </Link>
      )
    }

    //<img className='image_poster' width={100} height={160} alt={item.name} src={item?.img} />

    useEffect(() => {
        const requestHistory = async () => {
            try {
                const response = await listWords();
                setHistory(response)
            } catch (error) {
                console.log(error)
            }
        }
        requestHistory()
    }, [loading])
    

    const getData = async () => {
        if(name === '') {return;}
        setLoading(true);
        saveWord(name);
        getSearch(name).then(res => {
            console.log(res)
            setData(res)
            setLoading(false)
        })
        };

    const cleanHistory = () => {
        excludeWords()
        setHistory([])
    }
    

        const HistoryItem = ({item}) => {
          return(
            <Column className='h_item' onClick={() => { setName(item)}}>
                <span>{item}</span>
                </Column>
          )
        }


        const RelevantResult = ({item}) => {
          return(
            <Column style={{padding: 24, backgroundColor: "#303030", borderRadius: 12,}}>
                <Image src={item?.capa} width={150} height={220} alt={data[0]?.name} style={{objectFit: 'cover', borderRadius: 8,}} />
                <Title style={{color: "#f6f6f6", fontSize: 22, marginTop: 8,}}>{item?.name.slice(0,15)}</Title>
                <Label style={{fontSize: 16, marginTop: 4,}}>{item?.status} • {item?.type}</Label>
            </Column>
        
          )
        }
        

    return (
        
        <Column style={{background: `linear-gradient(45deg, #121212, #262626)`, overflow: 'auto', }}>
            <NavBar/>
            <Column style={{padding: 44,}}>
            <Title style={{fontSize: 32, marginTop: -20,}}>Pesquisar</Title>
            <Row style={{ alignSelf: 'flex-start', marginTop: 10,  borderRadius: 100,alignItems: 'center', }}>
                <Column>
                    <input
                        value={name}
                        className='search_input'
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                getData();
                            }
                        }}
                        type="text"
                        placeholder="O que você quer ler?"
                    />
                </Column>
                <Column className='btsearch' onClick={getData}>
                        <CiSearch/>
                </Column>
            </Row>
       

        {data.length > 0 ? <Column style={{marginTop: 20,}}>

        <Title style={{fontSize: 32, marginBottom: 10,}}>Melhor resultado</Title>
        <ListSearch data={data.slice(0, 1)} />
        
        <Row style={{justifyContent: 'space-between', alignItems: 'center',  marginTop:20,}}>
            <Title style={{marginBottom: 10, fontSize: 28,}}>Mangás</Title>
            <Label style={{marginRight: 15,}}>{data?.length} resultados</Label>
        </Row>
        <ListSearch data={data.slice(1)} />
        </Column> : 
        <Column>
            {history.length > 0 && <Column className='fadeInUp'>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{marginLeft: 10, fontSize: 32, marginTop:  30,}}>Buscas recentes</Title>
                <ButtonPrimaryLight onClick={cleanHistory} style={{marginTop: 20,}}>Limpar</ButtonPrimaryLight>
            </Row>
            <Row style={{flexWrap: 'wrap',}}>
            {history?.map((item, index) => <HistoryItem key={index} item={item} />)}
            </Row>
            </Column>}

            <Column style={{alignSelf: 'center', marginTop: 30, }}>
            <Title style={{marginLeft: 10,  fontSize: 32,}}>Navegar por todas as categorias</Title>
            <Row style={{flexWrap: 'wrap', marginTop: 10,}}>

            {tags.map((item, index) => <CategoryList  index={index} key={index} item={item} />)}
            </Row>
        </Column>
        </Column>}
        </Column>

        </Column>
    )
}