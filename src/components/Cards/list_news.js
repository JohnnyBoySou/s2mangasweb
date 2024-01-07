/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import Draggable from "../draggable"
import  mangas  from "../../requests/mangas"
import { useRouter } from 'next/navigation'
import './list.css'

export default function ListMangaNews({ data }) {
  console.log(data)
  const router = useRouter()
  const handle = (id) => {
    router.push(`/manga/${id}`)
  }
  
    const Card = ({ item, index, handle }) => {
      const cl = item.type === 'Manga' ? "#ED274A" : item.type === 'Manhwa' ? "#366AD3" : item.type === 'Manhua' ? "#009688" : '#000';

        return(
          <Row style={{justifyContent: 'center', marginRight: 30, alignItems: 'center', }}>
            <Column className="card" key={index}  style={{  justifyContent: 'center', zIndex: 99, padding:22, borderRadius: 6, }}>
              <img 
                onClick={handle}
                className="imagezoom"
                src={item?.capa}
                alt={item?.name}
                width={144}
                height={206}
                style={{borderRadius: 6, alignSelf: 'center', cursor: 'pointer', objectFit: 'cover',}}
                />
            </Column>

            <Column style={{width:200, borderRadius: 8, marginLeft: -20, backgroundColor: '#262626', padding: 12, paddingLeft: 40, }}>
             <Row style={{alignItems: 'center', flexWrap: 'wrap', }}>
              {item.categories.map((item, index) => <Label key={index} style={{fontSize: 16, marginTop: 4,}}>{item} • </Label>)}
             </Row>
              <Label style={{color: "#f6f6f6", fontSize: 20, }}>{item?.name.slice(0,28)}</Label>
              
              <Row style={{flexWrap: 'wrap', marginTop: 10,}}>
                {item?.newchapters.map((c, index) => ( <Label className="new" key={index}>{c}</Label> ))} 
              </Row>
              <Label style={{fontSize: 14, marginTop: 4,}}>Atualizado à {item?.release_date} </Label>
              
            </Column>
          </Row>

        )
      }
    return(
        <>
        <Draggable style={{width: '100%', overflow: 'hidden', }}>
          <Row style={{ overflow: 'hidden', paddingLeft: 44, }}>
          {data?.map((item, index) => (<Card item={item} key={index} handle={() => handle(item.id)}/> ))}
          </Row>
        </Draggable>
        </>
    )
}