import { Column, Row, Title, Label } from '@themes/global';
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

export { Card, Load }