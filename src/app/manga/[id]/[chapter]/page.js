'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Column, Row, Title, Label, BTIcon, } from '../../../../themes/global';
import Image from 'next/image';
import '../manga.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export default function ChapterDetails({ params }) {
    const {id, chapter } = params
    const [item, setItem] = useState();
    useEffect(() => {
      requestData()
    },[id])

    const requestData = async () => {
      try {
        const item_raw = await axios.get('https://www.s2mangas.com/api/manga/pages?chapter=' + chapter + '&id=' + id) 
        console.log(item_raw.data)
        setItem(item_raw?.data)
      } catch (error) {
        console.log(error)        
      }
    }
    
    const colors = ["#ED274A",'#6699ff', '#FF620A', '#27AE60', '#3454D1', '#F7F7F7', '#000000',]
    const ListColor = ({ c }) => {
      return(
      <Column className='clr' onClick={() => setFilterColor(c)} style={{width: 34, border: filterColor === c ? '2px solid #fff' : '´2x solid #00000000', height: 34, borderRadius: 100, backgroundColor: c,}} />
    )}

    const [filterOption, setFilterOption] = useState(false);
    const [flowOption, setFlowOption] = useState(false);
    
    const [flowDate, setFlowDate] = useState({
      img: '',
      name: id,
      chapter: chapter,
    });
    const [filterColor, setFilterColor] = useState("#f7f7f7");
    const [filterOpacity, setFilterOpacity] = useState(0.05);

    return (
        <Column style={{backgroundColor: "#262626", alignItems: 'center'}} className='bannerchapter' >
          <Row style={{justifyContent: 'space-between', }}>
        
           <Column style={{backgroundColor: '#404040', width: 400, marginLeft: 40, padding: 24, borderRadius: 12, marginBottom: 20,}}>
            <Title style={{fontSize: 32,}}>Opções</Title>

            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
              <Label style={{fontSize: 24, marginTop: 10,}}>Filtro</Label>
              <Title className='arrow' onClick={() => setFilterOption(!filterOption)}>
                {filterOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Title>
            </Row>
              {filterOption && <Column style={{marginTop: 10,}}>
              <Row style={{justifyContent: 'space-between', alignItems: 'center', }} className='hoverd'>
                <Label style={{fontSize: 18, marginLeft: 10,}}>Cor</Label>
                <Row>
                {colors.map((c, i) => <ListColor c={c} key={i}/>)}
                </Row>
              </Row>
              <Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 10, }} className='hoverd'>
                <Label style={{fontSize: 18, marginLeft: 10,}}>Opacidade</Label>
                <input value={filterOpacity} type="range"  min="0" max="1" onChange={(event) => setFilterOpacity(event.target.value)} step="0.2" />
              </Row>
              </Column>}

              <Row style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 10,}}>
                <Label style={{fontSize: 24, marginTop: 10,}}>Adicionar Flow</Label>
                <Title className='arrow' onClick={() => setFlowOption(!flowOption)}>
                  {flowOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </Title>
              </Row>
            {flowOption && 
              <Column>
              <Row style={{flexWrap: 'wrap',}}>
                {item?.images?.map((item, index) => <Image onClick={() => setFlowDate(prevState => ({  ...prevState, img: item}) )} alt="manga page" key={index} width={70} height={100} 
                style={{objectFit: 'contain', backgroundColor: filterColor, margin: 5, border: `2px solid ${item === flowDate.img ? '#ED274A' : "#00000000"}`}} 
                src={item}  />)}
                </Row>
              </Column>}

            <Column style={{width: 60, height: 10, marginTop: 10, marginBottom: -10, borderRadius: 100, backgroundColor: "#606060", alignSelf: 'center',}}/>
           </Column>
          </Row>
           
           
           {item?.images?.map((item, index) => 
           <Column key={index} style={{position: 'relative'}}>
            <Column style={{backgroundColor: filterColor, position: 'absolute', top: 0, opacity: filterOpacity, zIndex: 99, width: 500, height: 700, }}/>
              <Image alt="manga page" priority={true} width={500} height={700} 
              style={{objectFit: 'contain', backgroundColor: filterColor,}} 
              src={item}  />
            </Column>
           )}
        </Column>
    )
}


//{item?.imgs?.map((item, index) => <img alt="text" width='100%' height='100%' src={item} key={index} />)}
//  <Column style={{backgroundColor: '#404040',  padding: 24, borderRadius: 12, marginBottom: 20,}}>
//<Title style={{fontSize: 32,}}>Sobre</Title>
//<Label style={{fontSize: 24, marginTop: 10,}}>Descrição</Label>
//</Column>