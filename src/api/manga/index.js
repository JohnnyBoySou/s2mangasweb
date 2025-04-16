import { fetchWithAuth, fetchWithAuthAndLang } from "../../hooks/api";
import { getLang,  } from "../../hooks/translations";

export const listMangasAll = async(page = 1) => {
  try {
    const res = await fetchWithAuth(`/manga?page=${page}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listMangasWeekend = async(page = 1) => {
  const language = await getLang();
  try {
    const res = await fetchWithAuth(`/manga/weekend?page=${page}&lg=${language}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listMangasTop = async(page = 1) => {
  const language = await getLang();
  try {
    const res = await fetchWithAuth(`/manga/top?page=${page}&lg=${language}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listMangasNew = async(page = 1) => {
  const language = await getLang();
  try {
    const res = await fetchWithAuth(`/manga/new?page=${page}&lg=${language}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listMangasFeed = async(page = 1) => {
  try {
    const res = await fetchWithAuth(`/manga/feed?page=${page}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const singleManga = async(id) => {
  const language = await getLang();
  try {
    const res = await fetchWithAuthAndLang(`/manga/${id}&lg=${language}`, { method: "GET" }, true);
    return res;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};
export const listChapters = async(id, order = "desc", page = 1, limit = 20) => {
  try {
    const res = await fetchWithAuthAndLang(`/manga/${id}/chapters?order=${order}&page=${page}&limit=${limit}`, { method: "GET" });
    return res;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};

export const searchManga = async(name, page) => {
  try {
    const res = await fetchWithAuth(`/manga/search?name=${name}&page=${page}`, { method: "GET" });
    return res.data.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};

export const listCategory = async(category, page) => {
  try {
    const res = await fetchWithAuth(`/manga/search?category=${category}&page=${page}`, { method: "GET"  });
    return res.data.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};

export const listPages = async(id) => {
  try {
    const res = await fetchWithAuth(`/manga/${id}/pages`, { method: "GET" });
    return res;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.message);
  }
};



//MOVE LIBRARY
export const toggleLike = async(params) => {
  try {
    const res = await fetchWithAuth("/likes", {
      method: "PUT",
      data: { name: params.name, capa: params.capa, manga_id: params.id }
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const toggleFollow = async(params) => {
  //SALVAR ULTIMO CAPITULO PARA VERIFICAR QUANDO ENTRAR NO APP
  try {
    const res = await fetchWithAuth("/follow", {
      method: "PUT",
      data: { name: params.name, capa: params.capa, manga_id: params.id }
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const toggleComplete = async(params) => {
  try {
    const res = await fetchWithAuth("/completes", {
      method: "PUT",
      data: { name: params.name, capa: params.capa, manga_id: params.id }
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const toggleProgress = async(params) => {
  try {
    const res = await fetchWithAuth("/progress", {
      method: "PUT",
      data: { name: params.name, capa: params.capa, manga_id: params.id }
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const verifyAll = async(id) => {
  try {
    const res = await fetchWithAuth(`/status/${id}`, { method: "GET" });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
