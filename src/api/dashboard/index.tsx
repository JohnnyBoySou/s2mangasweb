import { fetchWithAuth } from "../../hooks/api";

type Stats = {
  total: {
    users: number;
    collections: number;
    mangalists: number;
    mangas: number;
    wallpapers: number;
  };
  weekend: {
    mangas: number;
    mangalists: number;
    collections: number;
    users: number;
    wallpapers: number;
  };
};

export const listStats = async() => {
  try {
    const res: any = await fetchWithAuth("/statistics", { method: "GET" });
    console.log(res)
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
