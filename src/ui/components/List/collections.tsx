import React, { useState } from "react";
import { Column, Title, Image, Label, Row, Button } from "@/ui";
import { Chapter } from "@/types/manga";
import ItemChapter from "../Item/chapter";
import { useQuery } from '@tanstack/react-query';
import { listCollections } from '@/api/collection';
import { Collection, ListCollectionsResponse } from "@/types/collections";
import ItemCollection from "../Item/collection";

export default function ListCollections({ uuid, title, limit = 20 }: { uuid: string, title: string, limit?: number }) {
    const [page, setpage] = useState(1);
    const { data, isLoading, isError } = useQuery<ListCollectionsResponse>({
    queryKey: ['collections'],
    queryFn: () => listCollections(page),
  });

  return (
    <Column mh={12}>
      <Row justify="space-between" align="center" ph={12}>
        <Title>{title}</Title>
      </Row>
      <Column>
        {data?.map((item: Collection) => <ItemCollection key={item.id} item={item} />)}
      </Column>
    </Column>
  );
}
