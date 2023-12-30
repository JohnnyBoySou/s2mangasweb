/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import Draggable from "../draggable"
import { mangas } from "../../requests/mangas"


export default function ForYou({}) {
    const Card = ({ item, index }) => {
        return(
          <Column key={index} >
          <img 
              src={item?.capa}
              alt={item?.name}
              width={124}
              height={186}
              style={{borderRadius: 6, cursor: 'pointer', marginRight: 20, objectFit: 'cover',}}
              />
              <Label style={{width: 120, fontSize: 14, marginTop: 4,}}>{item.name.slice(0,28)}</Label>
          </Column>
        )
      }
    return(
        <>
        <Title style={{marginTop: 34, marginLeft: 44,}}>Feito para você</Title>
        <Draggable style={{width: '100%', overflow: 'hidden'}}>
        <Row style={{marginTop: 10, overflow: 'hidden', paddingLeft: 44,}}>
        {mangas.map((item, index) => (<Card item={item} key={index} /> ))}
        </Row>
        </Draggable>
        </>
    )
}