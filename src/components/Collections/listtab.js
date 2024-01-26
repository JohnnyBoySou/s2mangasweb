'use client';
import React, { useState} from 'react'
import { Column, BTIcon, BTColection, Label, Button, Row } from "../../themes/global";
import { collections } from "../../requests/collections/list";
import Link from 'next/link'

export default function ListCollections({ open }) {
    return(
        <Column style={{ marginTop: 12,  paddingTop: 12, backgroundColor: "#262626", borderRadius: 8,  }}>
                {collections.slice(0, 4).map((item, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [hovered, setHovered] = useState(false);
                return(
                    <Link key={index} href={`/collections/${item.id}`} style={{textDecoration: 'none'}}>
                        <Row key={index} style={{ alignSelf: 'center', zIndex: 99, position: 'relative'}}>
                            <BTColection key={index} 
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)} 
                                style={{backgroundColor: item?.color,}}>{item?.icon}</BTColection> 
                            {open && 
                            <Column style={{ justifyContent: 'center', marginTop: -10, borderRadius: 6, transition: '.2s linear', }}>                     
                            <Label style={{fontSize: 15, paddingLeft: 10, }}>{item?.name}</Label> 
                            <Label style={{fontSize: 12, paddingLeft: 10,  }}>{item?.mangas_ids.length} • {item?.date}</Label> 
                        </Column>
                            }
                        {hovered && !open && 
                        <Column style={{position: 'absolute', justifyContent: 'center', borderRadius: 6, transition: '.2s linear',  left: 60, backgroundColor: "#404040", width: 140, height: 50, }}>                     
                            <Label style={{fontSize: 15, paddingLeft: 10, }}>{item?.name}</Label> 
                            <Label style={{fontSize: 12, paddingLeft: 10,  }}>{item?.mangas_ids.length} • {item?.date}</Label> 
                        </Column>}
                        </Row>
                    </Link>
                 )})}
        </Column>
    )
}