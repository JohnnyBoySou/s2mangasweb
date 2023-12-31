/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import Draggable from "../draggable"
import { mangas } from "../../requests/mangas"


export default function Rate({handle}) {
    const Card = ({ item, index, handle }) => {
        return(
          <Column key={index} >
          <img 
              src={item?.capa}
              onClick={handle}
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
        <Column>
        <Title style={{marginTop: 34, marginLeft: 44,}}>Melhores notas</Title>
        <Draggable>
        <Row style={{marginTop: 10, overflow: 'hidden', paddingLeft: 44,}}>
        {mangas.map((item, index) => (<Card item={item} key={index} handle={() => handle(item.id)}/> ))}
        </Row>
        </Draggable>  
        </Column>
    )
}