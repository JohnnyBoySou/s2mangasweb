import React from "react";
import { Column, Title, Image, Label, Row, Button } from "@/ui";
import ItemManga from "../Item/manga";
import { Manga } from "@/types/manga";

export default function ListManga({ data, title, more }: { data: Manga[], title: string, more: () => void }) {
  return (
    <Column mh={12}>
        <Row justify="space-between" align="center" ph={12}>
            <Title>{title}</Title>
            <Button variant="ghost" label="Ver mais" onPress={more} />
        </Row>
        <Row>
            {data?.map((item: Manga) => <ItemManga  key={item.uuid} item={item} />)}
        </Row>
    </Column>
  );
}
