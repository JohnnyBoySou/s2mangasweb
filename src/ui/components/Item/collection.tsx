import React from "react";
import { Column, Title, Image, Label, Row } from "@/ui";
import { Chapter } from "@/types/manga";
import "./styles.css";
import Link from "next/link";
import { Play } from "lucide-react";
import { FaPlay } from "react-icons/fa";

export default function ItemCollection({
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
