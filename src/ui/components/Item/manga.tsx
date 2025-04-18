import React from "react";
import { Column, Title, Image, Label } from "@/ui";
import { Manga } from "@/types/manga";
import "./styles.css";
import Link from "next/link";
export default function ItemManga({ item }: { item: Manga }) {
  const { uuid, name, capa, views_count, id } = item;

  return (
    <Link href={`/manga/${id}__${uuid}`} style={{ textDecoration: "none" }}>
    <Column
      ph={16}
      pv={10}
      
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
