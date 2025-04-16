import { fetchWithAuth } from "../../hooks/api";

export const listWallpapers = async(page = 1) => {
  try {
    const res = await fetchWithAuth(`/wallpapers?page=${page}`, { method: "GET" });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signleWallpaper = async(id) => {
  try {
    const res = await fetchWithAuth(`/wallpapers/${id}`, { method: "GET" });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const toggleLikeWallpaper = async(id) => {
  try {
    const res = await fetchWithAuth(`/wallpaper/${id}/like`, { method: "POST" });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
