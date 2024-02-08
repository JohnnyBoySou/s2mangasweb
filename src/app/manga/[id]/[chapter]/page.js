'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Column, Row, Title, Label, BTIcon, } from '../../../../themes/global';
import Image from 'next/image';
import '../manga.css'
import '../../../../themes/ani.css'
import { IoIosArrowDown, IoIosArrowUp , IoIosClose, IoIosSettings,   } from "react-icons/io";
import Link from 'next/link'

export default function ChapterDetails({ params }) {
    const {id, chapter } = params
    const cpt = Number(chapter)
    const [item, setItem] = useState();
    useEffect(() => {
      const requestData = async () => {
        try {
          const item_raw = await axios.get('https://www.s2mangas.com/api/manga/pages?chapter=' + chapter + '&id=' + id) 
          setItem(item_raw?.data)
        } catch (error) {
          console.log(error)        
        }
      }
    
      requestData()
    },[ id, chapter])

   
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

    const [optionShow, setOptionShow] = useState(false);
    const [searchChapter, setSearchChapter] = useState();

    return (
        <Column style={{backgroundColor: "#262626", alignItems: 'center'}} className='bannerchapter' >

        <IoIosSettings  onClick={() => setOptionShow(!optionShow)} 
            style={{fontSize: 42, color: '#f7f7f790', backgroundColor: "#303030", borderRadius: 8, marginBottom: 20, cursor: 'pointer', }}/>
         {optionShow &&
        
          <Row style={{justifyContent: 'space-between', }}>
      
           <Column className='slideInDown' style={{backgroundColor: '#404040', width: 400, marginLeft: 40, padding: 24, borderRadius: 12, marginBottom: 20,}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
              <Title style={{fontSize: 32, marginBottom: 20,}}>Opções</Title>
              <IoIosClose onClick={() => setOptionShow(!optionShow)} style={{fontSize: 42, color: '#f7f7f790', backgroundColor: "#303030", borderRadius: 8, marginBottom: 20, cursor: 'pointer', }}/>
            </Row>

            <Row className='btoption'  onClick={() => setFilterOption(!filterOption)} style={{justifyContent: 'space-between', alignItems: 'center', }}>
              <Label style={{fontSize: 24,}}>Filtro</Label>
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

              <Row className='btoption' onClick={() => setFlowOption(!flowOption)} style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 10,}}>
                <Label style={{fontSize: 24,}}>Adicionar Flow</Label>
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

              <Row className='btoption' onClick={() => setFlowOption(!flowOption)} style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 10,}}>
                <Label style={{fontSize: 24,}}>Colocar Marcador</Label>
                <Title className='arrow' onClick={() => setFlowOption(!flowOption)}>
                  {flowOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </Title>
              </Row>



            <Column style={{width: 60, height: 10, marginTop: 10, marginBottom: -10, borderRadius: 100, backgroundColor: "#606060", alignSelf: 'center',}}/>
           </Column>
           <Column className='slideInDown' style={{backgroundColor: '#404040', width: 400, marginLeft: 40, padding: 24, borderRadius: 12, marginBottom: 20,}}>
              <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{fontSize: 32, marginBottom: 20,}}>Capítulos</Title>
                <IoIosClose onClick={() => setOptionShow(!optionShow)} style={{fontSize: 42, color: '#f7f7f790', backgroundColor: "#303030", borderRadius: 8, marginBottom: 20, cursor: 'pointer', }}/>
              </Row>
              
              <Row style={{marginBottom: 10,}}>
                <input style={{fontSize: 24, fontFamily: 'Book', backgroundColor: "#606060", border: 'none', outline: 'none', padding: 12, borderRadius: 8, color: "#fff", }} className="input" min="1"  value={searchChapter}  onChange={e => setSearchChapter(e.target.value)} type="number" placeholder="Capítulo. Ex.: 132"/>
                <Row className='btnext'  style={{ marginLeft: 20, fontSize: 32, backgroundColor: "#ED274A", color: "#fff", }}>
                </Row>
              </Row>
            
            <Row>
              
             <Link href={`${parseInt(cpt - 1)}`} style={{textDecoration: 'none'}}>
              <Row className='btnext'>
                <Label style={{fontSize: 24, }}>Anterior</Label>
              </Row>
             </Link>
              <Column style={{width: 20, height: 20,}}/>
             <Link href={`${parseInt(cpt + 1)}`} style={{textDecoration: 'none'}}>
              <Row className='btnext'>
                <Label style={{fontSize: 24,}}>Próximo</Label>
              </Row>
             </Link>

            </Row>
            
            <Column style={{width: 60, height: 10, marginTop: 10, marginBottom: -10, borderRadius: 100, backgroundColor: "#606060", alignSelf: 'center',}}/>
          </Column>
        </Row>
}
           



           {item?.images?.map((item, index) => 
           <Column key={index} style={{position: 'relative'}}>
            <Column style={{backgroundColor: filterColor, position: 'absolute', top: 0, opacity: filterOpacity, zIndex: 99, width:'100%', height: '100%' }}/>
              <img alt="manga page" priority={true} width={500} height={700}  className='page fadeInDown'
              style={{objectFit: 'contain', backgroundColor: filterColor, width: '100%', height: '100%'}} 
              src={item}  />
            </Column>
           )}
        </Column>
    )
}

