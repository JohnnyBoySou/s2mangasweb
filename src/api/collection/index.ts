import { fetchWithAuth } from "../../hooks/api";
import { Collection, ListCollectionsResponse, SingleCollectionResponse } from "../../types/collections";

export const addCollection = async (data: Partial<Collection>): Promise<Collection> => {
  const res = await fetchWithAuth("/collections", { method: "POST", data }) as Collection;
  return res;
};

export const listCollections = async (page: number): Promise<Collection[]> => {
  const res = await fetchWithAuth(`/user/collections?page=${page}`, { method: "GET" }) as ListCollectionsResponse;
  return res;
};

export const listIncludeCollections = async (id: string, page: number): Promise<Collection[]> => {
  const res: ListCollectionsResponse = await fetchWithAuth(`/collections/includes?page=${page}`, {
    method: "POST",
    data: { manga_id: id },
  });
  return res.collections.data;
};

export const singleColletion = async (id: number): Promise<Collection> => {
  const res: SingleCollectionResponse = await fetchWithAuth(`/collections/${id}`, { method: "GET" });
  return res.collection;
};

export const updateCollection = async (data: Partial<Collection> & { id: number }): Promise<Collection> => {
  const res = await fetchWithAuth(`/collections/${data.id}`, { method: "PUT", data });
  return res;
};

export const deleteCollection = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetchWithAuth(`/collections/${id}`, { method: "DELETE", data: {} });
  return res;
};

export const toggleFixed = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetchWithAuth(`/collections/${id}/fixed`, { method: "POST", data: {} });
  return res;
};

export const toggleCollection = async (id: number, params: any): Promise<any> => {
  const res = await fetchWithAuth(`/collections/toggle/${id}`, { method: "PUT", data: params });
  return res.data;
};

export const searchCollections = async (term: string): Promise<Collection[]> => {
  const res = await fetchWithAuth(`/collections/search/${term}`, { method: "GET" });
  return res.data.collections.data;
};

export const topCollections = async (): Promise<Collection[]> => {
  const res = await fetchWithAuth("/collections/top", { method: "GET" });
  return res.data.collections.data;
};
