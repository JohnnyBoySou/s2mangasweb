import { fetchWithAuth } from "../../hooks/api";

export const listLibrary = async() => {
  try {
    const res = await fetchWithAuth("/library", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const singleLibrary = async(type, page) => {
  try {
    const res = await fetchWithAuth(`/library/${type}?page=${page}&limit=20`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const listLike = async() => {
  try {
    const res = await fetchWithAuth("/likes", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const listFollow = async() => {
  try {
    const res = await fetchWithAuth("/follow", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const listComplete = async() => {
  try {
    const res = await fetchWithAuth("/completes", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const listProgress = async() => {
  try {
    const res = await fetchWithAuth("/progress", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
  
