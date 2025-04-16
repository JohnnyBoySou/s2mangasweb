import { fetchWithAuth } from "../../hooks/api";
// Publicar uma review
export const publishReview = async(data) => {
  try {
    const res = await fetchWithAuth("/reviews", { method: "POST", data });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Atualizar uma review
export const updateReview = async(id, data) => {
  try {
    const res = await fetchWithAuth(`/reviews/${id}`, { method: "PUT", data });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Deletar uma review
export const deleteReview = async(id) => {
  try {
    const res = await fetchWithAuth(`/reviews/${id}`, { method: "DELETE" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Listar reviews do usuário
export const listUserReviews = async() => {
  try {
    const res = await fetchWithAuth("/user/reviews", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Listar reviews de um manga específico
export const listMangaReviews = async(mangaId, params) => {
  try {
    const res = await fetchWithAuth(`/manga/reviews/${mangaId}`, { method: "GET", params });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obter estatísticas de reviews de um manga
export const getMangaReviewStatistics = async(mangaId) => {
  try {
    const res = await fetchWithAuth(`/manga/reviews/statistics/${mangaId}`, { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Marcar uma review como útil
export const markHelpful = async(reviewId) => {
  try {
    const res = await fetchWithAuth(`/reviews/${reviewId}/feedback`, { method: "POST" });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
