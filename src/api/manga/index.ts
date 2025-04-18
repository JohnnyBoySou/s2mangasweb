import { fetchWithAuth, fetchWithAuthAndLang } from "../../hooks/api";
import { getLang,  } from "../../hooks/translations";
import { Manga, MangaDetails, ChapterResponse, ToggleParams, ChapterPagesResponse } from "@/types/manga";

export const listMangasAll = async (page = 1): Promise<Manga[]> => {
  const res = await fetchWithAuth(`/manga?page=${page}`, { method: "GET" }) as { data: Manga[] };
  return (res as { data: Manga[] }).data;
};

export const listMangasWeekend = async (page = 1): Promise<Manga[]> => {
  const language = await getLang();
  const res = await fetchWithAuth(`/manga/weekend?page=${page}&lg=${language}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const listMangasTop = async (page = 1): Promise<Manga[]> => {
  const language = await getLang();
  const res = await fetchWithAuth(`/manga/top?page=${page}&lg=${language}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const listMangasNew = async (page = 1): Promise<Manga[]> => {
  const language = await getLang();
  const res = await fetchWithAuth(`/manga/new?page=${page}&lg=${language}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const listMangasFeed = async (page = 1): Promise<Manga[]> => {
  const res = await fetchWithAuth(`/manga/feed?page=${page}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const singleManga = async (id: string): Promise<MangaDetails> => {
  const language = await getLang();
  const res = await fetchWithAuthAndLang(`/manga/${id}&lg=${language}`, { method: "GET" }, true);
  return res as MangaDetails;
};

export const listChapters = async (
  id: string,
  order: "asc" | "desc" = "desc",
  page = 1,
  limit = 20
): Promise<ChapterResponse> => {
  const res = await fetchWithAuthAndLang(
    `/manga/${id}/chapters?order=${order}&page=${page}&limit=${limit}`,
    { method: "GET" }
  );
  return res as ChapterResponse;
};

export const searchManga = async (name: string, page: number): Promise<Manga[]> => {
  const res = await fetchWithAuth(`/manga/search?name=${name}&page=${page}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const listCategory = async (category: string, page: number): Promise<Manga[]> => {
  const res = await fetchWithAuth(`/manga/search?category=${category}&page=${page}`, { method: "GET" });
  return (res as { data: Manga[] }).data;
};

export const listPages = async (id: string): Promise<ChapterPagesResponse> => {
  const res = await fetchWithAuth(`/manga/${id}/pages`, { method: "GET" });
  return res as ChapterPagesResponse;
};


export const toggleLike = async (params: ToggleParams): Promise<any> => {
  const res = await fetchWithAuth("/likes", {
    method: "PUT",
    data: {
      name: params.name,
      capa: params.capa,
      manga_id: params.id,
    },
  });
  return res;
};

export const toggleFollow = async (params: ToggleParams): Promise<any> => {
  const res = await fetchWithAuth("/follow", {
    method: "PUT",
    data: {
      name: params.name,
      capa: params.capa,
      manga_id: params.id,
    },
  });
  return res;
};

export const toggleComplete = async (params: ToggleParams): Promise<any> => {
  const res = await fetchWithAuth("/completes", {
    method: "PUT",
    data: {
      name: params.name,
      capa: params.capa,
      manga_id: params.id,
    },
  });
  return res;
};

export const toggleProgress = async (params: ToggleParams): Promise<any> => {
  const res = await fetchWithAuth("/progress", {
    method: "PUT",
    data: {
      name: params.name,
      capa: params.capa,
      manga_id: params.id,
    },
  });
  return res;
};

export const verifyAll = async (id: number): Promise<any> => {
  const res = await fetchWithAuth(`/status/${id}`, { method: "GET" });
  return res;
};