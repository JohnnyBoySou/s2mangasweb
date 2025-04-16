import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "./token";
import { baseURL, serverURL } from "./urls";
import { getLang, removeLang } from "./translations";
// Define a interface para opções da API
interface FetchApiOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  params?: Record<string, string | number | boolean | unknown> ;
}

// Define o tipo genérico para a resposta
type ApiResponse<T> = T | null;

// Criação do cliente Axios
const apiClient = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

const apiServer = axios.create({
  baseURL: serverURL,
  headers: { "Content-Type": "application/json" },
});


//CHAMADAS
export async function fetchApi<T = unknown>(
  url: string,
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const method = options.method?.toUpperCase() || "GET";

    // Valida que `data` é obrigatório para métodos diferentes de GET
    if (method !== "GET" && !options.data) {
      throw new Error(`Data is required for ${method} requests.`);
    }
    const response: AxiosResponse<T> = await apiClient.request({
      url,
      method,
      params: options.params,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

export async function fetchWithAuth<T = unknown>(
  url: string,
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const method = options.method?.toUpperCase() || "GET";

    // Valida que `data` é obrigatório para métodos diferentes de GET
    if (method !== "GET" && !options.data) {
      throw new Error(`Data is required for ${method} requests.`);
    }
    const response: AxiosResponse<T> = await apiServer.request({
      url,
      method,
      headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      },
      params: options.params,
      data: options.data,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching with auth at ${url}:`, error);
    throw error;
  }
}

export async function fetchWithAuthAndLang<T = unknown>(
  url: string,
  options: FetchApiOptions = {},
  single: boolean = false
): Promise<ApiResponse<T>> {
  try {
    const token = await getToken();
    const language = await getLang();
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const method = options.method?.toUpperCase() || "GET";

    // Valida que `data` é obrigatório para métodos diferentes de GET
    if (method !== "GET" && !options.data) {
      throw new Error(`Data is required for ${method} requests.`);
    }
    const response: AxiosResponse<T> = await apiServer.request({
      url: url + (single ? `?` : `&`) + `lang=${language}`,
      method,
      headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      },
      params: options.params,
      data: options.data,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching with auth at ${url}:`, error);
    throw error;
  }
}
export async function fetchWithNoAuth<T = unknown>(
  url: string,
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  try {
    

    const method = options.method?.toUpperCase() || "GET";

    // Valida que `data` é obrigatório para métodos diferentes de GET
    if (method !== "GET" && !options.data) {
      throw new Error(`Data is required for ${method} requests.`);
    }
    const response: AxiosResponse<T> = await apiServer.request({
      url,
      method,
      headers: {
      ...options.headers,
      },
      params: options.params,
      data: options.data,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching with auth at ${url}:`, error);
    throw error;
  }
}

// Exemplo de uso (sem autenticação):
// fetchApi('/search/mangalist', { method: 'GET' });

// Exemplo de uso (com autenticação):
// fetchWithAuth('/search/mangalist', {
//   method: 'POST',
//   data: {
//     name: "string",
//     capa: "string",
//     color: "string",
//     descricao: "string",
//     mangas_id: ["string"],
//     type: "post",
//   },
// });
