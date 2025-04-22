import React, { useState } from "react";
import { Column, Title, Image, Label, Row, Button, IconButton } from "@/ui";
import ItemManga from "../Item/manga";

import { Manga } from "@/types/manga";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  List,
  ChevronRight,
  ChevronLast,
  ChevronLeft,
  ChevronFirst,
  LayoutGrid,
} from "lucide-react";

export default function ListPaginatedManga({
  page,
  pages,
  items,
  isLoading,
  totalItems,
}: {
  isLoading: boolean;
  page: number;
  pages: number;
  items: Manga[];
  totalItems: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [grid, setGrid] = useState("list");

  function firstPage() {
    if (page - 1 <= 0) return;
    const params = new URLSearchParams(String(searchParams));
    params.set("page", String(1));
    router.push(`?${params.toString()}`);
  }

  function previusPage() {
    if (page - 1 <= 0) return;

    const params = new URLSearchParams(String(searchParams));
    params.set("page", String(page - 1));
    router.push(`?${params.toString()}`);
  }

  function nextPage() {
    if (page + 1 > pages) return;

    const params = new URLSearchParams(String(searchParams));
    params.set("page", String(page + 1));
    router.push(`?${params.toString()}`);
  }

  function lastPage() {
    if (page + 1 > pages) return;

    const params = new URLSearchParams(String(searchParams));
    params.set("page", String(pages));
    router.push(`?${params.toString()}`);
  }

  function renderItens() {
    return items?.map((item: Manga) => (
      <ItemManga key={item.uuid} item={item} grid={grid} />
    ));
  }

  function handleGrid() {
    if (grid === "list") {
      setGrid("full");
    } else if (grid === "full") {
      setGrid("list");
    }
  }

  return (
    <Column>

      <Row justify="space-between" align="center">
      <Label size={16}>
          Resultados
        </Label>
      <IconButton
            icon={grid == "list" ? <List size={20} /> : <LayoutGrid size={20} />}
            variant="ghost"
            onPress={handleGrid}
          />
      </Row>

      {grid === "list" && <Column>{renderItens()}</Column>}
      {grid === "full" && (
        <Row style={{ flexWrap: "wrap" }}>{renderItens()}</Row>
      )}
      <Row style={{ paddingBottom: 50 }} justify="space-between">
        <Label size={16}>
          Mostrando {items.length} de {totalItems}
        </Label>

        <Row gh={12}>
          <Label size={16}>
            Página {page} de {pages}
          </Label>
          <IconButton
            icon={<ChevronFirst size={18} />}
            variant="ghost"
            onPress={firstPage}
            loading={isLoading}
          />
          <IconButton
            icon={<ChevronLeft size={20} />}
            variant="ghost"
            onPress={previusPage}
          />
          <IconButton
            icon={<ChevronRight size={20} />}
            variant="ghost"
            onPress={nextPage}
          />
          <IconButton
            icon={<ChevronLast size={20} />}
            variant="ghost"
            onPress={lastPage}
          />
        </Row>
      </Row>
    </Column>
  );
}
