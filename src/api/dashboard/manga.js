import { fetchWithAuth, fetchApi } from "@/hooks/api";

export async function publishManga(data) {
  // CREATE
  const res = await fetchWithAuth("/manga", { method: "POST", data: data });
  return res.data;
}
export async function updateManga(id, data) {
  // PUT
  const res = await fetchWithAuth(`/manga/${id}`, { method: "PUT", data: data });
  return res.data;
}
export async function deleteManga(id) {
  // DELETE
  const res = await fetchWithAuth(`/manga/${id}`, { method: "DELETE" });
  return res.data;
}
export async function getMangadex(id) {
  // DELETE
  const res = await fetchWithAuth(`/mangadex/${id}`, { method: "GET" });
  return res;
}

export async function getCovers(mangaID) {
  const response = await fetchApi("/cover", { method: "GET", data: undefined, params: { manga: [mangaID] } });
  return formatCoverData(response.data, mangaID);
}

function formatCoverData(covers, mangaID) {
  return covers.map(cover => ({
    img: `https://uploads.mangadex.org/covers/${mangaID}/${cover.attributes.fileName}`,
    volume: cover.attributes.volume,
    id: cover.id
  }));
}
