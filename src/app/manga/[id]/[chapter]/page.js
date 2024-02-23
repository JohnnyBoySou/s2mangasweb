'use client';
import React, { useEffect, useState } from 'react';
import { Column, Row, Title, Label, BTIcon, } from '../../../../themes/global';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp , IoIosClose, IoIosSettings,    } from "react-icons/io";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Link from 'next/link'
import './chapter.css'
import requestPages from '../../../../requests/manga/pages';

export default function ChapterDetails({ params }) {
    const {id, chapter } = params
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState();
    useEffect(() => {
      const requestData = async () => {
        try {
          const response = await requestPages(chapter, id) 
          setItem(response)
          setLoading(false)
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
    const nextChapter = parseInt(chapter) + 1;
    const previousChapter = parseInt(chapter) - 1;


    return (
        <Column style={{background: `linear-gradient(-145deg, #282828 10%, #171717 50%)`, position: 'relative', alignItems: 'center', overflowX: 'hidden', overflowY:'auto', borderRadius: 12, }} >
            {!loading ? <>
           {item?.images?.map((item, index) => 
           <Column key={index} style={{position: 'relative'}}>
            <Column style={{backgroundColor: filterColor, position: 'absolute', top: 0, opacity: filterOpacity, zIndex: 99, width:'100%', height: '100%' }}/>
              <Image alt="manga page" priority={true} width={500} height={700}  className='page fadeInDown'
              style={{objectFit: 'contain', backgroundColor: filterColor, width: '100%', height: '100%'}} 
              src={item}  />
            </Column>
           )}

           <Row style={{position: 'fixed', alignItems: 'center', justifyContent: 'center', bottom: 40, left: 150, zIndex: 999, backgroundColor: "#303030", padding: 10, borderRadius: 100,}}>
              
            <Row>
              
            <Link href={`${previousChapter}`} style={{textDecoration: 'none', color: "#fff"}}>
              <Row className='btnext'>
                <GoArrowLeft/>
              </Row>
             </Link>
              <Column style={{width: 10, height: 20,}}/>
            <Link href={`${nextChapter}`} style={{textDecoration: 'none', color: "#fff"}}>
              <Row className='btnext'>
              <GoArrowRight/>
              </Row>
             </Link>

            </Row>
            
            </Row>
           </>
          : 
          <Column style={{alignSelf: 'center', height: '100vh', paddingTop: 100,  borderRadius: 12, alignItems: 'center',}}>
            <Image alt="manga page" width={300} height={450} style={{objectFit: 'cover', backgroundColor: filterColor, transform: 'rotate(12deg)', borderRadius: 12, }} src="https://i.pinimg.com/564x/1e/9b/bc/1e9bbcd802874129776a08f548b39b65.jpg" />
            <Title style={{fontSize: 52, color: '#f7f7f7', marginTop: 50,}}>Gerando páginas..</Title>
            <Label style={{width: 400, textAlign: 'center'}}>Aguarde um momento, estamos gerando as páginas do capítulo. Isso leva em torno de 15seg, dependendo da velocidade de sua internet.</Label>
            <Column className='loader'/>
          </Column> 
          }
        </Column>
    )
}

/**
           <IoIosSettings  onClick={() => setOptionShow(!optionShow)} style={{color: '#fff', fontSize: 32,}}/>
 * 
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
        </Row>}
 * 
 * 
 */