/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import Draggable from "../draggable"
import { mangas } from "../../requests/mangas"


export default function Similar({}) {
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
        <Row style={{marginLeft: 44, marginTop: 20, marginBottom: 15,}}>
          <img 
              src={mangas[0]?.capa}
              alt={mangas[0]?.name}
              width={54}
              height={68}
              style={{borderRadius: 6, cursor: 'pointer', marginRight: 20, objectFit: 'cover',}}
              />
          <Column style={{justifyContent: 'center',}}>
            <Label>EXPLORE</Label>
            <Title style={{}}>{mangas[0]?.name}</Title>
          </Column>
        
        </Row>
        
        <Draggable>
        <Row style={{marginTop: 10, overflow: 'hidden', paddingLeft: 44,}}>
        {mangas.map((item, index) => (<Card item={item} key={index} /> ))}
        </Row>
        </Draggable>
        </>
    )
}