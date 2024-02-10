'use client';
import React, {useEffect, useState} from 'react';
import { Column, Row, Title, Label, ButtonOff} from '../../themes/global';
//import ListMangaWrap from '../../components/Cards/listwrap';
import { news } from '../../requests/update/news';
import './style.css';
export default function Novidades (){

    const [step, setStep] = useState(1);
    const UpadateItem = ({ item }) => {
      return(
        <Column  className='card_grd'>
              <Column className='select' style={{  height: 30, flexGrow: 1,
                background: `linear-gradient(45deg, ${item?.colors[0]} 20.91%, ${item?.colors[1]} 80.92%)`,
            }}/>
            <Column style={{padding: 16, borderTop: '3px solid #404040'}}>
            <Title style={{fontSize: 20, marginBottom: 6,}}>{item.title}</Title>
            <Label style={{fontSize: 15,}}>{item.description}</Label>
            <Column style={{width:60, height: 6, borderRadius: 100, alignSelf: 'center', backgroundColor: "#494949", marginTop: 10, marginBottom: -5,}}/>
            </Column>
        </Column>
      )
    }
    

    return(
    <Column style={{padding: 44,}}>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Column>
          
            <Title style={{fontSize: 42, marginBottom: 5,}}>Novidades</Title>
            <Label>Os últimos lançamentos dos mangás que você segue.</Label>
            </Column>
        </Row>
        <Row style={{margin: '20px 0px'}}>
            <ButtonOff style={{backgroundColor: step == 1 ? '#fff' : '#404040', color: step == 1 ? '#000' : '#f6f6f6', }} onClick={() => setStep(1)}>Mangás</ButtonOff>
            <ButtonOff style={{backgroundColor: step == 2 ? '#fff' : '#404040', color: step == 2 ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep(2)}>Atualizações</ButtonOff>
        </Row>

        {step == 1 &&
        <Column style={{marginTop: 10, marginLeft: -44,}}>
        </Column>
        }
        {step == 2 &&
        <Row style={{flexWrap: 'wrap'}}>
              {news.map((item, index) => <UpadateItem key={index} item={item}/>)}
        </Row>
        }
        
    </Column>
    )}
    //<ListMangaWrap/>    
