/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { Column, Label,  Row, } from "../../themes/global"
import  mangas  from "../../requests/mangas"
import { useRouter } from 'next/navigation'
import './list.css'
import Skeleton from "../Loading"

export default function ListManga({ data = mangas }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const handle = (id) => {
    setLoading(true)
    router.push(`/manga/${id}`)
  }
    const Card = ({ item, index, handle }) => {
        return(
          <Column className="card" key={index}  style={{ marginBottom: 20, justifyContent: 'center', flexGrow: 1, padding:22, borderRadius: 6, marginRight: 16,}}>
          <img 
              onClick={handle}
              className="imagezoom"
              src={item?.capa}
              alt={item?.name}
              width={144}
              height={206}
              style={{borderRadius: 6, alignSelf: 'center', cursor: 'pointer', objectFit: 'cover', cursor: loading ? 'wait' : 'pointer', }}
              />
              <Label style={{color: "#f6f6f6", fontSize: 18, marginTop: 8,}}>{item?.name.slice(0,15)}</Label>
              <Label style={{fontSize: 16, marginTop: 4,}}>{item?.score} • {item?.type}</Label>
            
          </Column>
        )
      }
    return(
        <>
          <Row style={{ overflow: 'hidden', paddingLeft: 44, flexWrap: 'wrap', }}>
          {data?.map((item, index) => (<Card item={item} key={index} handle={() => handle(item.id)}/> ))}
          {data?.length === 0 && 
          <Row>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
            <Column style={{marginRight: 20,}}>
              <Skeleton width={200} height={270} radius={12}/>
              <Skeleton width={160} height={40} radius={12} top={16}/>
            </Column>
          </Row>
        }
          </Row> 
        </>
    )
}
//<Draggable style={{width: '100%', overflow: 'hidden', }}>
