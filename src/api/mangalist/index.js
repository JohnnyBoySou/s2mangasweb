import { fetchWithAuth } from "../../hooks/api";

export const listuSERMangalists = async(page = 1) => {
  try {
    const res = await fetchWithAuth(`/user/mangalists?page=${page}`, { method: "GET" });
    return res.data.mangalist.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const toggleLikeMangalist = async(id) => {
  try {
    const res = await fetchWithAuth(`/mangalist/${id}/like`, {
      method: "POST",
      data: {}
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};



export const listMangalists = async(page = 1) => {
  try {
    const res = await fetchWithAuth(`/mangalists?page=${page}`, { method: "GET" });
    return res.mangalist.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const singleMangalist = async(id) => {
  try {
    const res = await fetchWithAuth(`/mangalists/${id}`, { method: "GET" });
    return res?.mangalist;  
  } catch (error) {
    console.log(error);
  }
};

export const listLikeMangalists = async() => {
  try {
    const res = await fetchWithAuth("/user/mangalists", { method: "GET" });
    return res.data.mangalist.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const publishMangalist = async(data) => {
  // POST
  const res = await fetchWithAuth("/mangalist", { method: "POST", data: data });
  return res;
};
