import { fetchApi } from "../../hooks/api";
import { transformDataArray } from "../../hooks/dataTransform";

// Tipo genérico para uma resposta da API
interface ApiResponse<T> {
  data: T[];
  meta?: Record<string, unknown>;
}

// Tipo base para parâmetros de pesquisa
interface SearchFilters {
  name?: string;
  publicationDemographic?: string;
  status?: string;
  contentRating?: string;
  sortby?: string;
}

// Tipo base para dados transformados
interface TransformedManga {
  id: string;
  name: string;
  capa: string;
  type: string;
  description: string;
  status: string;
  adult: boolean;
  year: number | null;
  categories: string[];
  create_date: string;
  release_date: string;
  languages: string[];
}

// Função para buscar mangás com ou sem autenticação
export async function getSearch(
  name = "Arpeggio of Blue",
  page = 1,
  type?: string
): Promise<TransformedManga[] | unknown> {
  const offset = 20 * (page - 1);
  const baseParams = { includes: ["cover_art"], offset };
  const response = await fetchApi<ApiResponse<any>>("/manga", { method: 'GET', data: undefined, params: { title: name, ...baseParams }, });
  return transformDataArray(response?.data || []); // Aplica a transformação
}

// Função para buscar com filtros avançados
export async function getSearchFilters(
  params: SearchFilters,
  page = 1
): Promise<TransformedManga[]> {
  const offset = 20 * (page - 1);
  const { name, publicationDemographic, status, contentRating, sortby } = params;

  // Simula mapeamento de filtros para o tipo esperado pela API
  const sortbyfilter = [
    { value: "asc", param: "ascending" },
    { value: "desc", param: "descending" },
  ];
  const order = sortbyfilter.find((item) => item.value === sortby)?.param || "asc";

  const response = await fetchApi<ApiResponse<any>>("/manga", {
    params: {
      title: name,
      publicationDemographic: [publicationDemographic],
      status: [status],
      contentRating: [contentRating],
      includes: ["cover_art"],
      offset,
      order,
    },
  });

  return transformDataArray(response?.data || []); // Aplica a transformação
}

export async function getMangadex() {
  
}