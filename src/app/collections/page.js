'use client';
import React, {useState} from 'react';
import { Column, Row, Title, Label, BTColection, BTColectionLarge} from '../../themes/global';
import { CiEdit, CiCreditCard1 } from "react-icons/ci";
import { collections } from '../../requests/collections/list';
import './collections.css'
import Link from 'next/link';
import addCollectionToUser from '../../pages/api/collections/edit';
import { CreateCollection } from '../../requests/collections/request';

export default function Collections() {
    function formatarData(data) {
        const meses = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
      
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
        return `${dia} de ${mes}, ${ano}`;
      }
      
    const newCollection = {
        name: 'Meus Favoritos',
        icon: '✨',
        color: '#32a852',
        mangas_ids: [1253, 4413],
        date: formatarData(new Date()),
      };

    
    const handleNew = () => {
        CreateCollection(newCollection, 9).then(res => console.log(res))
    }
    
    return (
        <Column className='banner'>
            <Row>
                <Title>Suas Coleções</Title>
                <Column onClick={handleNew}>Nova Coleção</Column>
            </Row>
            <Row style={{flexWrap: 'wrap', marginTop: 12,}}>
            {collections.map((item, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [hovered, setHovered] = useState(false);
                return(
                    <Link key={index} href={`/collections/${item.id}`} style={{textDecoration: 'none'}}>
                <Column key={index} style={{ alignSelf: 'center', margin: 10, zIndex: 99, position: 'relative'}}>
                    <BTColectionLarge key={index} 
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)} 
                            style={{backgroundColor: item?.color,}}>{item?.icon}</BTColectionLarge> 
                    <Label style={{width: 124, textAlign: 'center', color: '#fff',}}>{item?.name}</Label>
                   
                    </Column>
                    </Link>
                 )})}
            </Row>

        </Column>
    )
}

/**
 * 
 *  {hovered && 
                    <Column style={{position: 'absolute', cursor: 'pointer', justifyContent: 'center', borderRadius: 4, transition: '.2s linear',  left: 0, backgroundColor: "#404040", width: 124, height: 120, }}>                     
                        <Label style={{fontSize: 32, textAlign: 'center', }}>{item?.icon}</Label> 
                        <Label style={{fontSize: 15, paddingLeft: 10, }}>{item?.mangas_ids.length} mangás</Label> 
                        <Label style={{fontSize: 12, paddingLeft: 10,  }}>Criado em {item?.date}</Label> 
                    </Column>}
 * 
 */