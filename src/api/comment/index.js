import { fetchWithAuth, fetchWithAuthAndLang } from "@/hooks/api";

export const createComment = async(message, id, parent_id) => {
  const data = {
    message: message,
    manga_id: id,
    parent_id: parent_id
  };
  try {
    const res = await fetchWithAuth(`/comments/${id}`, { method: "POST", body: data });
    return res.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message);
  }
};

export const toggleLikeComment = async(id) => {
  try {
    const res = await fetchWithAuth(`/comments/${id}/like`, { method: "POST" });
    return res.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message);
  }
};

export const listComments = async(id, page = 1) => {
  try {
    const res = await fetchWithAuth(`/comments/${id}`, { method: "GET" });
    return res;
  } catch (error) {
    console.log(error.request);
    throw new Error(err.message);
  }
};

export const updateComment = async(message, id) => {
  try {
    const res = await fetchWithAuthAndLang(`/comments/${id}?page=${page}`, { method: "PUT", body: { "message": message } });
    return res.data;
  } catch (error) {
    console.log(error.request);
    throw new Error(err.message);
  }
};

export const deleteComment = async(id) => {
  try {
    const res = await fetchWithAuth(`/comments/${id}`, { method: "DELETE" });
    return res.data;
  } catch (error) {
    console.log(error.request);
    throw new Error(err.message);
  }
};
