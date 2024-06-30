import { Column, Row, Title, Label, ButtonOff } from '@themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaPlay } from 'react-icons/fa';
import Skeleton from '@components/Loading';
import { useRouter } from 'next/navigation'

const Card = ({ item }) => {
  const router = useRouter()
  const handle = (id) => {
    router.push(`/manga/${id}`)
  }
  return (
    <Column style={{ marginRight: 16, marginBottom: 16, }} className='cd' onClick={() => handle(item.id)} >
      <Column style={{ position: 'relative' }}>
        <img src={item?.capa} width={200} height={200} style={{ borderRadius: 8, objectFit: 'cover', margin: 10, width: 190, height: 260, }} alt='' />
        <Column className='pl'>
          <FaPlay />
        </Column>
      </Column>

      <Column style={{ padding: 12, paddingTop: 0, width: 200, }}>
        <Title style={{ fontSize: 20, marginBottom: 4, }}>{item?.name}</Title>
        <Label style={{ fontSize: 16, marginTop: 4, }}>{item?.score} • {item?.type}</Label>
      </Column>
    </Column>

  );
};

const Load = () => {
  return (
    <Row style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
      <Column style={{ marginRight: 20, marginBottom: 30, }}>
        <Skeleton width={230} height={270} radius={12} />
        <Skeleton width={160} height={40} radius={12} top={16} />
      </Column>
    </Row>
  )
}

const List = ({page, setPage, data}) => {
  return (
    <Column>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center', margin: '10px 44px', marginBottom: 20, }}>
        <Title style={{ fontSize: 32, }}>Mangás ({page})</Title>
        <Row>
          <ButtonOff onClick={() => { if (page > 1) { setPage(page - 1) } }} style={{ width: 54, height: 54, justifyContent: 'center', opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
            <FiArrowLeft style={{ marginTop: 6, }} />
          </ButtonOff>
          <ButtonOff onClick={() => { if (data?.length === 24) { setPage(page + 1) } }} style={{ width: 54, height: 54, marginLeft: 10, opacity: data?.length != 24 ? 0.4 : 1, cursor: data?.length === 24 ? 'pointer' : 'not-allowed', justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090', padding: 0, }}>
            <FiArrowRight style={{ marginTop: 6, }} />
          </ButtonOff>
        </Row>
      </Row>

      {data?.length >= 1 && <Row style={{ flexWrap: 'wrap', margin: '0px 44px' }}>
        {data?.map((item, index) => <Card key={index} item={item} />)}
      </Row>}
    </Column>
  )
}

export { List, Load }