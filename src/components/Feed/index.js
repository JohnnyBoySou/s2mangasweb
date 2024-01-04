'use client';
import React, {useContext} from "react"
import { ThemeContext } from 'styled-components'
import Image from 'next/image'

import { Column, Row, Label, Title} from '../../themes/global'

//icones
import './feed.css';

import ForYou from "../../components/Cards/foryou";
import Rate from "../../components/Cards/rate";
import Similar from "../../components/Cards/similar";
import ListManga from "../Cards/list";
import popular from "../../requests/mangas/popular";
import recentes from "../../requests/mangas/recentes";

export default function Feed () {
  const { color, font } = useContext(ThemeContext)

  return(
    <Row style={{overflowY: 'hidden'}}>
        <Column style={{height: '100vh', width: '100%',  overflow: 'auto', overflowX:'hidden'}}>
            <Column className="banner" >
                <Title style={{fontSize: 72, lineHeight: 1}}>Boa tarde</Title>   
                <Row>
                <Column>
                    <Row className="blur" >
                        <Image 
                            src={'https://i.pinimg.com/564x/cb/7b/99/cb7b9901ab0cfc5f04cc77c785453828.jpg'}
                            alt="quick_1"
                            width={64}
                            height={64}
                            style={{borderRadius: 6,}}
                        />
                        <Label style={{width: 120, marginLeft: 12,}}>Mix de Jujutsu Kaisen</Label>
                    </Row>
                    <Row className="blur">
                        <Image 
                            src={'https://i.pinimg.com/736x/49/bf/ef/49bfef01bf812b818a875de68363708c.jpg'}
                            alt="quick_1"
                            width={64}
                            height={64}
                            style={{borderRadius: 6,}}
                        />
                        <Label style={{width: 120, marginLeft: 12,}}>Lojinha de Coins</Label>
                    </Row>
                </Column>    
                
                <Column>
                    <Row className="blur" >
                        <Image 
                            src={'https://i.pinimg.com/564x/37/22/73/3722738f379e4d3be38b8dbd3943e44d.jpg'}
                            alt="quick_1"
                            width={64}
                            height={64}
                            style={{borderRadius: 6,}}
                        />
                        <Label style={{width: 120, marginLeft: 12,}}>Mangás Curtidos</Label>
                    </Row>
                    <Row className="blur">
                        <Image 
                            src={'https://i.pinimg.com/564x/18/39/e3/1839e3812bcfcd74805374910ef0db57.jpg'}
                            alt="quick_1"
                            width={64}
                            height={64}
                            style={{borderRadius: 6,}}
                        />
                        <Label style={{width: 120, marginLeft: 12,}}>Novos Capítulos</Label>
                    </Row>
                </Column> 
                
                </Row>
            </Column>
            <Column className="content">
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Para você</Title>
              <ListManga />
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Novos capítulos</Title>
              <ListManga />
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Recentes</Title>
              <ListManga data={recentes}/>
              <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 44, marginBottom: 20, marginLeft: 44,}}>Populares</Title>
              <ListManga data={popular}/>
            </Column>
        </Column>
    </Row>
    )
}

