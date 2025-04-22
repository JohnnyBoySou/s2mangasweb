'use client';
import React, { useRef, useEffect, useState } from "react"
import { Column, Row, Label, Title, Button, Skeleton, Image, Main } from '@/ui'
import './feed.css';
import { useQueries } from '@tanstack/react-query'
import { listMangasTop, listMangasNew, listMangasFeed, listMangasWeekend } from '../../../api/manga/index';
import ListManga from "@/ui/components/List/manga";

export default function Feed() {
  const saudacao = new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite';
  
  const results = useQueries({
    queries: [
      {
        queryKey: ['top'],
        queryFn: listMangasTop,
      },
      {
        queryKey: ['news'],
        queryFn: listMangasNew,
      },
      {
        queryKey: ['weekend'],
        queryFn: listMangasWeekend,
      },
      {
        queryKey: ['feed'],
        queryFn: listMangasFeed,
      },
    ],
  });
  
  const [top, news, weekend, feed] = results;
  if (top.isLoading || news.isLoading || weekend.isLoading || feed.isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (top.isError || news.isError || weekend.isError || feed.isError) {
    return <div>Erro ao carregar dados</div>;
  }

  return (
    <Main>
      <ListManga data={top.data.slice(0, 10)} title='Top 10' />
      <ListManga data={news.data.slice(0, 10)} title='Novos lançamentos' />
      <ListManga data={weekend.data.slice(0, 10)} title='Melhores da semana' />
      <ListManga data={feed.data.slice(0, 10)} title='Seu feed' />
    </Main>
  )
}
