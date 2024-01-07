/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import  mangas  from "../../requests/mangas"
import { useRouter } from 'next/navigation'
import './list.css'

export default function ListMangaWrap({ data }) {
  const router = useRouter()
  const handle = (id) => {
    router.push(`/manga/${id}`)
  }
  
    const Card = ({ item, index, handle }) => {
        return(
          <Column className="card" key={index}  style={{ marginBottom: 20, flexGrow: 1, justifyContent: 'center', padding:22, borderRadius: 6, marginRight: 16,}}>
          <img 
              onClick={handle}
              className="imagezoom"
              src={item?.capa}
              alt={item?.name}
              width={144}
              height={206}
              style={{borderRadius: 6, alignSelf: 'center', cursor: 'pointer', objectFit: 'cover',}}
              />
              <Label style={{color: "#f6f6f6", width: 144, fontSize: 18, marginTop: 12,}}>{item?.name.slice(0,28)}</Label>
              <Label style={{fontSize: 16, width: 144, marginTop: 4,}}>{item?.score} • {item?.chapters} capítulos</Label>
          </Column>
        )
      }
    return(
        <>
          <Row style={{ overflow: 'hidden', flexWrap: 'wrap', paddingLeft: 44, paddingRight: 24, }}>
          {mangas.map((item, index) => (<Card item={item} key={index} handle={() => handle(item.id)}/> ))}
          </Row>
        </>
    )
}