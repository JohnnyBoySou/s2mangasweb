'use client';
import React, {useState} from 'react';
import { Column, Row, Title, Label, BTColection, BTColectionLarge, ButtonOff, ButtonPrimary} from '../../themes/global'; 
import { collections } from '../../requests/collections/list';
import './collections.css'
import Link from 'next/link'; 
import { IoClose } from "react-icons/io5";



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

      const [modal, setModal] = useState(false);
    
    const handleNew = () => {
       // CreateCollection(newCollection, 9).then(res => console.log(res))
    }
    return (
        <Column style={{padding: 44,}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Title>Suas Coleções</Title>
                <ButtonOff onClick={() => setModal(!modal)}>Nova Coleção</ButtonOff>
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

            {modal &&
            <Column className='fadeInUp' style={{width: '100%', borderRadius: 12, height: '100%', backgroundColor: "#00000090" , position: 'absolute', top: 0, left: 0, zIndex: 99,}}>
                <Column style={{width: 600, borderRadius: 12,  padding: 24, backgroundColor: "#262626" , position: 'absolute', top: 100, alignSelf: 'center', zIndex: 99,}}>
                    
                    
                    <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title>Criar coleção</Title>
                        <IoClose style={{fontSize: 32, color: "#fff", cursor: 'pointer', padding: 8, }} onClick={() => setModal(!modal)}/>
                    </Row>

                    <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                        <ButtonOff>Descartar</ButtonOff>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Label style={{marginRight: 10,}}>Existem alterações não salvas</Label>
                            <ButtonPrimary>Salvar</ButtonPrimary>
                        </Row>
                    </Row>
                    <Column style={{width: 120, height: 10, backgroundColor: '#606060', borderRadius: 100, alignSelf: 'center'}}/>

                </Column>
            </Column>
            }
        
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