'use client';
import React, {useState, useRef, useEffect} from 'react';
import { Column, Row, Title, Label, B, TextInput, BTIcon, SubInput} from '../../themes/global';
import './search.css'
import { CiEdit, CiCreditCard1, CiSearch } from "react-icons/ci";

import tags from '../../requests/categories/tags'

export default function Search() {
    const [query, setQuery] = useState();
    const [name, setName] = useState();
    const [year, setYear] = useState(2020);
    const [rate, setRate] = useState(4);
    const [category, setCategory] = useState();

    const CategoryList = ({ item, index }) => {
      return(
        <Column onClick={() => setCategory(item?.name)} key={index} style={{width: 200, cursor: 'pointer', margin: 8, borderRadius: 12, height: 130, backgroundColor: item?.color, overflow: 'hidden', 
                border: category === item.name ? '6px solid #fff' : '6px solid #ffffff00'}}>
                <Title style={{fontSize: 24, margin: 10,}}>{item.name}</Title>
                  <img className='image_poster' width={100} height={160} alt={item.name} src={item?.img} />
              </Column>
      )
    }
    

    return (
        <Column className='banner'>
            <Title style={{fontSize: 62, textAlign: 'center', marginBottom: 30,}}>Pesquisar Mangás</Title>
            <Row style={{backgroundColor: "#262626", height: 100, paddingRight: 20, alignSelf: 'center', borderRadius: 100,justifyContent: 'center', alignItems: 'center', }}>
                <Column>
                    <input  value={name} className="effect-1"  style={{width: 200,}} onChange={e => setName(e.target.value)} type="text" placeholder="Nome"/>
                    <SubInput className="focus-border">Ex.: Jujutso Kaisen</SubInput>
                </Column>
                <Column>
                    <input  value={year} className="effect-1"  style={{width: 100, textAlign: 'center', marginLeft:0, marginRight: 0}}  onChange={e => setYear(e.target.value)} type="number" placeholder="Ano"/>
                    <SubInput className="focus-border">Ex.: 2021</SubInput>
                </Column>
                <Column>
                    <input style={{width: 100, textAlign: 'center',}} value={rate} className="effect-1"  onChange={e => setRate(e.target.value)} type="number" placeholder="Nota (1 a 5)"/>
                    <SubInput className="focus-border">Ex.: 4</SubInput>
                </Column>
                <div className='btsearch'>
                    <Title style={{textAlign: 'center',}}>
                        <CiSearch/>
                    </Title>
                </div>
            </Row>
       
            <Column style={{alignSelf: 'center', marginTop: 20,}}>
            <Title style={{marginLeft: 10,}}>Categorias: {category}</Title>
            <Row style={{flexWrap: 'wrap', marginTop: 10,}}>

            {tags.map((item, index) => <CategoryList index={index} key={index} item={item} />)}
            </Row>
        </Column>
        </Column>
    )
}