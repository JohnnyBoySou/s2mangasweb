export interface Manga {
  uuid: string;
  name: string;
  capa: string;
  views_count: number;
  id: number;
}

export interface Language {
  id: string;
  name: string;
}

export interface Cover {
  img: string;
  volume: string;
  id: string;
}

export interface MangaDetails {
  id: number;
  uuid: string;
  name: string;
  capa: string;
  description: string;
  release_date: string;
  status: string;
  type: string;
  year: string;
  create_date: string;
  categories: string[];
  languages: Language[];
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  user_id: number;
  likes_count: number;
  total_rate: number;
  views_count: number;
  covers: Cover[];
}

export interface Chapter {
  id: string;
  title: string;
  chapter: number;
  volume: string | null;
  language: string[];
  publish_date: string;
  pages: number;
}

export interface ChapterResponse {
  total: number;
  limit: string;
  page: string;
  offset: number;
  lg: string;
  chapters: Chapter[];
}

export interface ChapterPagesResponse {
  chapter_id: string;
  pages: string[];
  total: number;
}

export interface ToggleParams {
  id: number;
  name: string;
  capa: string;
}

export interface Page {
  id: string;
  url: string;
}
export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginatedMangaResponse {
  current_page: number
  data: Manga[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
