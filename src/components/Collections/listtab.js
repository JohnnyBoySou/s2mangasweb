'use client';
import React, { useState, useEffect} from 'react'
import { Column, BTIcon, BTColection, Label, Button, Row } from "../../themes/global";
import { collections } from "../../requests/collections/list";
import Link from 'next/link'
import { getCollections } from '../../requests/collections/request';


function CollectionItem({ item, open }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link href={`/collections/${item.id}`} style={{ textDecoration: 'none' }}>
        <Row style={{ alignSelf: 'center', zIndex: 99, position: 'relative' }}>
          <BTColection
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ backgroundColor: item?.color }}
          >
            {item?.icon}
          </BTColection>
          {open && (
            <Column style={{ justifyContent: 'center', marginTop: -10, borderRadius: 6, transition: '.2s linear' }}>
              <Label style={{ fontSize: 15 }}>{item?.name}</Label>
              <Label style={{ fontSize: 12 }}>{item?.mangas_ids.length} • {item?.date}</Label>
            </Column>
          )}
          {hovered && !open && (
            <Column style={{ position: 'absolute', justifyContent: 'center', borderRadius: 6, transition: '.2s linear', left: 60, backgroundColor: "#404040", width: 140, height: 50 }}>
              <Label style={{ fontSize: 15, paddingLeft: 10 }}>{item?.name}</Label>
              <Label style={{ fontSize: 12, paddingLeft: 10 }}>{item?.mangas_ids.length} • {item?.date}</Label>
            </Column>
          )}
        </Row>
      </Link>
    );
  }

  
function CollectionItemRow({ item, open }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link href={`/collections/${item.id}`} style={{ textDecoration: 'none' }}>
        <Column style={{ zIndex: 99, flexGrow: 1,  width: '100%', }}>
          <BTColection
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ backgroundColor: item?.color, alignSelf: 'center', width: 100, height: 100, fontSize: 42, }}
          >
            {item?.icon}
          </BTColection>
          {open && (
            <Column style={{ justifyContent: 'center', borderRadius: 6, transition: '.2s linear' , marginBottom: 20,}}>
              <Label style={{ fontSize: 15, textAlign: 'center', }}>{item?.name}</Label>
              <Label style={{ fontSize: 12, textAlign: 'center', }}>{item?.mangas_ids.length} • {item?.date}</Label>
            </Column>
          )}
          {hovered && !open && (
            <Column style={{ position: 'absolute', justifyContent: 'center', borderRadius: 6, transition: '.2s linear', left: 60, backgroundColor: "#404040", width: 140, height: 50 }}>
              <Label style={{ fontSize: 15, paddingLeft: 10 }}>{item?.name}</Label>
              <Label style={{ fontSize: 12, paddingLeft: 10 }}>{item?.mangas_ids.length} • {item?.date}</Label>
            </Column>
          )}
        </Column>
      </Link>
    );
  }
  
  export default function ListCollections({ open, grid}) {

    const [collections, setCollections] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          const collections = await getCollections();
          setCollections(collections);
      };
      fetchData();
  }, []);


    if(grid ){
        return (
            <Column style={{ paddingTop: 12, backgroundColor: "#262626", borderRadius: 8 }}>
        {collections?.map((item, index) => (
            <CollectionItem key={item.id} item={item} open={open} />
            ))}
      </Column>
    );
}
  else if(!grid ){
    return(
        <Row style={{ paddingTop: 12, backgroundColor: "#303030", borderRadius: 8, flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', }}>
        {collections?.map((item, index) => (
            <CollectionItemRow key={item.id} item={item} open={open} />
            ))}
      </Row>
    )
}
}