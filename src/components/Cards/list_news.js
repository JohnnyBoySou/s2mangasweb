/* eslint-disable @next/next/no-img-element */
import { Column, Label, Title, Row, } from "../../themes/global"
import { useRouter } from 'next/navigation'
import './list.css'
import Skeleton from "../Loading"

export default function ListMangaNews({ data, page }) {
  const router = useRouter()
  const handle = (id) => {
    router.push(`/manga/${id}`)
  }
  
  const startIndex = (page - 1) * 8;
  const endIndex = page * 8;

  const paginatedData = data?.slice(startIndex, endIndex);
  
    const Card = ({ item, index, handle }) => {
      const cl = item.type === 'Manga' ? "#ED274A" : item.type === 'Manhwa' ? "#366AD3" : item.type === 'Manhua' ? "#009688" : '#000';

        return(
          <Row style={{justifyContent: 'center', marginRight: 30, alignItems: 'center', marginBottom: 30, }} className="fadeInUp">
            <Column className="card" key={index}  style={{  justifyContent: 'center', zIndex: 2, padding:22, borderRadius: 6, }}>
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
             <Row style={{alignItems: 'center', flexWrap: 'wrap', color: "#cccccc", fontSize: 14, marginTop: 4,  marginBottom: 7, }}>• &nbsp;
              {item?.categories?.map((item, index) => <Label key={index} style={{fontSize: 14, }}>{item} •&nbsp;</Label>)}
             </Row>
              <Label style={{color: "#f6f6f6", fontSize: 24, fontFamily: 'Medium', }}>{item?.name.slice(0,28)}</Label>
              
              <Row style={{flexWrap: 'wrap', marginTop: 10,}}>
                {item?.newchapters?.slice(0, 4)?.map((c, index) => ( <Label className="new" key={index}>{c} </Label> ))} 
              </Row>
              <Label style={{fontSize: 14, marginTop: 4,}}>Atualizado à {item?.release_date} </Label>
              
            </Column>
          </Row>

        )
      }
    return(
        <>
         <Row style={{ overflow: 'hidden', paddingLeft: 44, flexWrap: 'wrap' }}>
          {paginatedData?.map((item, index) => (
            <Card item={item} key={index} className="fadeInUp" handle={() => handle(item.id)} />
          ))}

        {null === 0 && 
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



      //  </Draggable>//