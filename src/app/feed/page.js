/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
'use client';
import React, {useContext, useState} from "react"
import { ThemeContext } from 'styled-components'
import Image from 'next/image'

import { Column, Row, BTIcon, BTColection, Label, Title} from '../../themes/global'

//icones
import { GoHome, GoSearch } from "react-icons/go";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import './feed.css';

import ForYou from "../../components/Cards/foryou";
import Rate from "../../components/Cards/rate";
import Similar from "../../components/Cards/similar";
import ListCollections from "../../components/Collections/listtab";

export default function Feed () {
  const { color, font } = useContext(ThemeContext)
  
  return(
    <Row>
        {/*MainBar */}
        <Column style={{padding: 12, }}>
            <Column style={{backgroundColor: color.off, borderRadius: 8,}}>
                <BTIcon><GoHome/></BTIcon>
                <BTIcon><GoSearch/></BTIcon>    
                <BTIcon><TbCards /></BTIcon>    
                <BTIcon><CgProfile /></BTIcon>    
            </Column>
            <ListCollections/>
                
        </Column>

        {/*Home Content */}
        <Column style={{height: '100vh',  overflow: 'auto'}}>
            <Column className="banner" >
                <Title style={{fontSize: 32, lineHeight: 1}}>Boa tarde, <br/>JohnnyBoy</Title>   
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
              <ForYou/>
              <Rate/>
              <Similar/>
            </Column>
        </Column>
        
        {/*RightBar*/}
        <Column className="rightbar">
          <Title>Sidebar</Title>
        </Column>                    
    </Row>
    )
}

