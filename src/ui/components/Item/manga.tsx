import React from "react";
import { Column, Title, Image, Label, Row } from "@/ui";
import { Manga } from "@/types/manga";
import "./styles.css";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
export default function ItemManga({
  item,
  grid = "full",
}: {
  item: Manga;
  grid: string;
}) {
  const { uuid, name, capa, views_count, id } = item;

  const isFull = grid === "full";
  const isList = grid === "list";

  if (isFull) {
    return (
      <Link href={`/manga/${id}__${uuid}`} style={{ textDecoration: "none" }}>
        <Column
          ph={14}
          pv={14}
          style={{ borderRadius: 6 }}
          className="item-manga"
          key={uuid}
        >
          <Image w={120} h={170} alt={name} src={capa} r={8} />
          <Column gv={4} pv={12}>
            <Title size={16}>
              {name?.length > 12 ? name.slice(0, 12) + "..." : name}
            </Title>
            <Label>{views_count} visualizações</Label>
          </Column>
        </Column>
      </Link>
    );
  }

  if (isList) {
    return (
      <Link href={`/manga/${id}__${uuid}`} style={{ textDecoration: "none", borderRadius: 6, }} 
      className="item-manga-list">
        <Row
          ph={10}
          pv={4}
          gh={12}
          justify="space-between"
          key={uuid}
        >
          <Row gh={12}>
            <Image w={46} h={46} alt={name} src={capa} r={4} />
            <Column gv={4} pv={12}>
              <Title size={16}>
                {name?.length > 120 ? name.slice(0, 120) + "..." : name}
              </Title>
              <Label>{views_count} visualizações</Label>
            </Column>
          </Row>

          <Column style={{width: 42, height: 42, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: "#202020", }}>
            <FaPlay color="#fff" />
          </Column>
        </Row>
      </Link>
    );
  }
}
