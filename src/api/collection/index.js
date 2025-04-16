import { fetchWithAuth } from "../../hooks/api";

export const addCollection = async(data) => {
  try {
    const res = await fetchWithAuth("/collections", { method: "POST", data: data });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};   

export const listCollections = async(page) => { 
  try {
    const res = await fetchWithAuth(`/user/collections?page=${page}`, { method: "GET" });
    return res.collections.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const listIncludeCollections = async(id, page) => {
  try {
    const res = await fetchWithAuth(`/collections/includes?page=${page}`, { method: "POST", data: { manga_id: id } });
    return res.collections.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const singleColletion = async(id) => {
  try {
    const res = await fetchWithAuth(`/collections/${id}`, { method: "GET" });
    return res.collection;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCollection = async(data) => {
  try {
    const res = await fetchWithAuth(`/collections/${data.id}`, { method: "PUT", data: data });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCollection = async(id) => {
  try {
    const res = await fetchWithAuth(`/collections/${id}`, { method: "DELETE", data: {} });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const toggleFixed = async(id) => {
  try {
    const res = await fetchWithAuth(`/collections/${id}/fixed`, { method: "POST", data: {}  });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const toggleCollection = async(id, params) => {
  try {
    const res = await fetchWithAuth(`/collections/toggle/${id}`, { method: "PUT", data: params });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchCollections = async(term) => {
  try {
    const res = await fetchWithAuth(`/collections/search/${term}`, { method: "GET" });
    return res.data.collections.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const topCollections = async() => {
  try {
    const res = await fetchWithAuth("/collections/top", { method: "GET" });
    return res.data.collections.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
