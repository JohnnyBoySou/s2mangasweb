import React, { useState } from "react";
import { Column, Title, Image, Label, Row, Button } from "@/ui";
import { Chapter } from "@/types/manga";
import ItemChapter from "../Item/chapter";
import { singleManga, listChapters } from '@/api/manga';
import { useQuery } from '@tanstack/react-query';

export default function ListChapters({ uuid, title, limit = 20 }: { uuid: string, title: string, limit?: number }) {
  const { data, isLoading: loadingChapters, isError: errorChapters } = useQuery({
    queryKey: ['chapters' + uuid],
    queryFn: () => listChapters(uuid, "desc", page, limit),
  });

  const [page, setpage] = useState();
  return (
    <Column mh={12}>
      <Row justify="space-between" align="center" ph={12}>
        <Title>{title}</Title>
      </Row>
      <Column>
        {data?.chapters.map((item: Chapter) => <ItemChapter key={item.id} item={item} uuid={uuid} />)}
      </Column>
    </Column>
  );
}
