'use client';
import React, { useEffect,  useState} from 'react';
import { Column, Row, Title, Label, } from '../../../themes/global';
import './details.css' 
import { BiShareAlt } from "react-icons/bi"; 
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import ListMangaWrap from '../../../components/Cards/listwrap';
import { editCollectionByID, getCollectionByID, excludeCollectionByID } from '../../../requests/collections/request';
import Toast from '../../../components/Toast';
import ListCollection from '../../../components/Cards/list_collection';
import axios from 'axios';

export default function CollectionsDetails({ params }) {
    const id = Number(params.id_collections);
    const [mangas, setMangas ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState();
    const [name, setName] = useState();
    const [share, setShare] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getCollectionByID(id);
            setItem(collection)
              
        };
        fetchData();
    }, [id]);

    const editCollection = async ()  => {
        let collectionnew = {
            name: name ? name : item.name,
            icon: item.icon,
            color: item.color,
            mangas_ids: item.mangas_ids,
            date: item.date,   
        }
        try {
            const response = await editCollectionByID(id, collectionnew);
            if(response){
                Toast('success', 'Coleção editada!');
            }
        } catch (error) {
            console.error('Error editing collection:', error);            
        }
    }

    const excludeCollection = async ( ) => {
        try {
            let response = await excludeCollectionByID(id);
            if(response){
                Toast('success', 'Coleção excluída!');
            }
        } catch (error) {
            console.error('Error excluding collection:', error);
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(JSON.stringify(item.mangas_ids));
        Toast('success', 'Link da coleção copiado!');
    }
    
    return (
        <>
        <Column style={{padding: 44, background: `linear-gradient(145deg, ${item?.color}50 -20.91%, #191919 54.92%)`,  }}>
            <Row>
                <Column className='scale-ani' style={{backgroundColor: item?.color, width: 150, height: 150, borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Title style={{fontSize: 58,}}>{item?.icon}</Title>
                </Column>
                <Column style={{justifyContent: 'center',}}>
                        <Label style={{marginLeft: 44, color: "#ffffff90"}}>Coleção</Label>
                    <Row style={{alignItems: 'center', }}>
                        <input  onChange={(e) => setName(e.target.value)} style={{ marginLeft: 44, fontSize: 54, background: "#30303000", border: 'none', fontFamily: 'Bold', color: "#fff",}} defaultValue={item?.name}/>
                        <LuPencilLine className='edit' onClick={editCollection}/>
                        <LuTrash2 className='edit' onClick={excludeCollection}/>
                        <BiShareAlt className='edit' onClick={handleShare}/>
                    </Row>
                    <Label style={{marginLeft: 44, color: "#ffffff90"}}>Criado {item?.date} • {item?.mangas_ids.length} mangás</Label>
                </Column>
            </Row>
        </Column>
    
        <Column style={{marginTop: 40,}}>
            <ListCollection data={item?.mangas_ids} />
        </Column>
         </>
        
    )
}