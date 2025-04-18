import React from "react";
import { Column, Title, Image, Label, Row } from "@/ui";
import { Chapter } from "@/types/manga";
import "./styles.css";
import Link from "next/link";
import { Play } from "lucide-react";
import { FaPlay } from "react-icons/fa";

export default function ItemChapter({
  item,
  uuid,
}: {
  item: Chapter;
  uuid: string;
}) {
  const { id, title, chapter, volume, language, publish_date, pages } = item;
  return (
    <Link
      href={`${uuid}/${id}`}
      style={{ textDecoration: "none" }}
      className="item-chapter"
    >
      <Row justify="space-between" align="center">
        <Column ph={12} pv={12} className="item-chapter" key={id}>
          <Title size={16}>
            {title?.length > 12 ? title.slice(0, 12) + "..." : title}
          </Title>
          <Label>
            {chapter} capítulos • {pages} páginas • {publish_date}
          </Label>
        </Column>
        <Column
          style={{
            width: 42,
            height: 42,
            borderRadius: 100,
            backgroundColor: "#202020",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <FaPlay size={14} color="#fff" />
        </Column>
      </Row>
    </Link>
  );
}

/*
const Chapter = ({ item, chapter }) => {
    const router = useRouter()
    const handle = () => {
        router.push(`${id}/${it?.id}`)
    }

    const [hovered, setHovered] = useState(false);
    const [mark, setMark] = useState(false);
    const manga = { name: item?.name, id: item?.id, capa: item?.capa, }

    const addMarkBook = async () => {
        try {
            const res = addMark(manga, it.number);
            setMark(res);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <li>
            <Row onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ padding: 12, marginRight: 6, borderRadius: 6, marginTop: 5, alignItems: 'center', }} className='chapter'>
                {hovered ? <Label style={{ fontSize: 18, marginRight: 30, cursor: 'pointer', }} onClick={handle}> &#9658; </Label> : <Label style={{ fontSize: 18, marginRight: 20, }}>#{it?.chapter}</Label>}
                <Column style={{ flexGrow: 1, }}>
                    <Title style={{ fontSize: 18, }}>{it?.title?.length > 30 ? it?.title?.slice(0, 30) + '...' : it?.title}</Title>
                    <Label style={{ fontSize: 14, marginRight: 20, }}>{it?.publish_date}</Label>
                </Column>
                <Row>
                    {it?.language.map((it, i) =>
                        <Label key={i} style={{ fontSize: 12, textTransform: 'uppercase', marginRight: 20, backgroundColor: '#fff', borderRadius: 4, padding: 4, color: '#000', }}>{it}</Label>
                    )}
                    <CiBookmarkPlus onClick={addMarkBook} style={{ color: mark ? "#03a1fc" : '#f8f8f890', fontSize: 22, cursor: 'pointer' }} />
                </Row>
            </Row>
        </li>
    )
} */
