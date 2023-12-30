import React, { useState} from 'react'
import { Column, BTIcon, BTColection, Label } from "../../themes/global";
import { BsCollection } from "react-icons/bs";
import { collections } from "../../requests/collections/list";

export default function ListCollections({}) {
    return(
        <Column style={{ marginTop: 12,  backgroundColor: "#262626", borderRadius: 8,}}>
                <BTIcon><BsCollection/></BTIcon>    
                {collections.slice(0, 5).map((item, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [hovered, setHovered] = useState(false);
                return(
                // eslint-disable-next-line react/jsx-key
                <Column style={{ alignSelf: 'center', zIndex: 99, position: 'relative'}}>
                    <BTColection key={index} 
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)} 
                            style={{backgroundColor: item?.color,}}>{item?.icon}</BTColection> 
                    
                    {hovered && 
                    <Column style={{position: 'absolute', justifyContent: 'center', borderRadius: 6, transition: '.2s linear',  left: 60, backgroundColor: "#404040", width: 140, height: 50, }}>                     
                        <Label style={{fontSize: 15, paddingLeft: 10, }}>{item?.name}</Label> 
                        <Label style={{fontSize: 12, paddingLeft: 10,  }}>{item?.mangas_ids.length} • {item?.date}</Label> 
                    </Column>}
                    </Column>
                 )})}
        </Column>
    )
}