import React from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';
import './flow.css'
import Image from 'next/image';
import Flows from '../../requests/flow';

export default function Flow (){

    const ListCard = ({ item }) => {
      return(
        <Column style={{backgroundColor: "#262626", padding: 12, borderRadius: 12,}}>
            <Row style={{alignItems: 'center', justifyContent: 'space-between',}}>
               <Row style={{alignItems: 'center',}}>
                <Image src={item?.manga?.capa} style={{borderRadius: 6, marginRight: 20,}} alt={item.manga.name} width={64} height={88}/>
                <Column>
                    <Title>{item?.manga.name}</Title>
                    <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{borderRadius: 100, marginRight: 10, backgroundColor: "#303030"}} src={item?.author?.avatar} alt={item.author.name} width={32} height={32}/>
                        <Label>{item?.author.name}</Label>
                    </Row>
                </Column>
                </Row>

                <Column className='btlike'>
                    Curtir
                </Column>
            </Row>
            <Column style={{padding: 20, backgroundColor: item.color,  margin: '14px 0px', borderRadius: 8,}}>
                <Image className='imgmain' src={item.capa} alt={item.name} width={160} height={220}/>
            </Column>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>

                <Label>{item?.likes} curtidas</Label>
                <Label>{item?.date}</Label>
            </Row>
        </Column>
      )
    }
    
return(
<Column className='page'>
    <Title>A sua rede social com mangás</Title>
    {Flows.map((item, index) => <ListCard item={item} key={index}/>)}
</Column>
)}