import { Column, Row, Title } from "../../themes/global"

import { mangas } from "../../requests/mangas"

export default function Fixed(){
   const item = mangas[2];
  return(
    <Column>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <Title>Fixado</Title>
        </Row>
    </Column>
  )
}
