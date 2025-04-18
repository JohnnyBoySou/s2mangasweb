export interface MangaSummary {
    id: string;
    name: string;
    capa: string;
  }
  
  export interface Collection {
    id: number;
    name: string;
    capa: string;
    status: string | null;
    fixed: boolean | null;
    total_mangas?: number;
    date?: string;
    user_id?: number;
    mangas_id?: MangaSummary[];
    genres?: string[] | null;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  export interface ListCollectionsResponse {
    status: boolean;
    collections: PaginatedResponse<Collection>;
  }
  
  export interface SingleCollectionResponse {
    status: boolean;
    collection: Collection;
  }
  