"use client";
import React, { useMemo, useEffect, useState } from "react";
import { Column, Row, Label, Button, Skeleton, Image, Main, Title } from "@/ui";
import ListPaginatedManga from "@/ui/components/Paginated/manga";
import {
  listMangasTop,
  listMangasNew,
  listMangasFeed,
  listMangasWeekend,
} from "@/api/manga";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { PaginatedMangaResponse } from "@/types/manga";

export default function Paginated() {
  const searchParams = useSearchParams();
  const params = useParams();
  const query = params?.id as string;
  const page = Number(searchParams.get("page") ?? "1");

  const title = useMemo(() => {
    switch (query) {
      case "top":
        return "Top Mangás";
      case "new":
        return "Novos Mangas";
      case "weekend":
        return "Mais vistos da Semana";
      default:
        return "Feed";
    }
  }, [query]);

  const description = useMemo(() => {
    switch (query) {
      case "top":
        return "Os mangás mais populares do momento.";
      case "new":
        return "Os mangás mais novos do momento.";
      case "weekend":
        return "Os mangás mais vistos da semana.";
      default:
        return "Os mangás mais populares do momento.";
    }
  }, [query]);

  const queryFunction = useMemo(() => {
    switch (query) {
      case "top":
        return listMangasTop;
      case "new":
        return listMangasNew;
      case "weekend":
        return listMangasWeekend;
      default:
        return listMangasFeed;
    }
  }, [query]);

  const { data, isLoading } = useQuery<PaginatedMangaResponse>({
    queryKey: ["feed", query, page],
    queryFn: () => queryFunction(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return null;

  return (
    <Main>
      <Column>
        <Row style={{ background: "#303030" }} pv={24} ph={24}>
          <Column>
            <Title size={64} style={{ fontWeight: "900", letterSpacing: -2 }}>
              {title}
            </Title>
            <Label size={18}>{description}</Label>
          </Column>
        </Row>

        <Column ph={24} mv={24}>
          <ListPaginatedManga
            isLoading={isLoading}
            page={data?.current_page || 1}
            pages={data?.last_page || 1}
            items={data?.data || []}
            totalItems={data?.total || 0}
          />
        </Column>
      </Column>
    </Main>
  );
}
