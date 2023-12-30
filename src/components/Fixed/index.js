/* eslint-disable @next/next/no-img-element */
import { Column, Row, Title, Label } from "../../themes/global"
import { IoMdClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { mangas } from "../../requests/mangas"

export default function Fixed(){
   const item = mangas[2];
  return(
    <Column>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Title>
              <IoMdClose onClick={() => {}}/>
            </Title>
            <Title>Fixado</Title>
            <Title>
              <BsThreeDots onClick={() => {}} />
            </Title>
        </Row>
        <Column>
            <img src={item?.capa} width={200} height={340} alt="fixed_manga" style={{objectFit: 'cover', marginTop: 20, marginBottom: 20, alignSelf: 'center',  borderRadius: 6,}}/>
            <Title>{item?.name}</Title>
            <Label style={{textAlign: 'center',}}>{item?.chapters} • {item?.score}</Label>
        </Column>

    </Column>
  )
}
