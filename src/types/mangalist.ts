interface MangaItem {
    id: number;
    name: string;
    capa: string;
  }
  
  interface MangaListData {
    id: number;
    name: string;
    color: string;
    descricao: string;
    capa: string;
    mangas_id: MangaItem[] | null;
    type: "post" | "stories";
    created_at: string;
    updated_at: string;
    user_id: number;
    likes_count: number;
    date: string;
  }
  
  interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  
  interface Mangalist {
    current_page: number;
    data: MangaListData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  interface MangalistResponse {
    status: boolean;
    mangalist: Mangalist;
  }
  