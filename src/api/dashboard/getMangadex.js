import axios from "axios";
import iso639Languages from "@/hooks/iso639";
import { baseURL } from "@/hooks/urls";

export async function getMangadex(mangaID = "8f3e1818-a015-491d-bd81-3addc4d7d56a", lg = "pt-br") {
  try {
    const resp = await axios({
      method: "GET",
      url: `${baseURL}/manga/${mangaID}`,
      params: {
        translatedLanguage: [lg],
        includes: ["cover_art"]
      }
    });
    const stat = await axios({
      method: "GET",
      url: `${baseURL}/statistics/manga/${mangaID}`
    });

    const chapter = await axios({
      method: "GET",
      url: `${baseURL}/manga/${mangaID}/feed?limit=10&offset=0`,
      params: {
        translatedLanguage: [lg],
        contentRating: ["safe", "suggestive", "erotica", "pornographic"],
        order: {
          chapter: "asc"
        }
      }
    });

    const data = transformData(resp?.data?.data, stat, chapter.data.data[0]?.id);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
  }
}

const removeLinksFromText = (text) => {
  // Remove qualquer URL da string
  return text?.replace(/https?:\/\/[^\s]+/g, "");
};

const transformData = (data, stats, chapter) => {
  if (!data) {
    return null;
  }

  const {
    id,
    type,
    attributes: {
      title = {},
      description = {},
      status = "",
      year = null,
      contentRating = "",
      tags = [],
      createdAt = "",
      updatedAt = "",
      availableTranslatedLanguages = []
    } = {},
    relationships = []
  } = data;

  const { rating, follows } = stats.data.statistics[id];

  // Mapeia os status para o formato desejado
  const statusMapping = {
    completed: "Completo",
    ongoing: "Em andamento",
    hiatus: "Hiato",
    cancelled: "Cancelado"
  };

  // Mapeia os ratings para o formato desejado
  const ratingMapping = {
    safe: false,
    suggestive: true,
    erotica: true,
    pornographic: true
  };

  // Extrai categorias dos tags
  const categories = tags.map(tag => tag.attributes.name.en);
  const long = categories.find(tag => tag === "Long Strip");

  // Encontra o relacionamento de cover_art e extrai o nome do arquivo
  const coverArtRelationship = relationships.find(rel => rel.type === "cover_art");
  let capa = "";

  if (coverArtRelationship && coverArtRelationship.attributes) {
    const coverFilename = coverArtRelationship.attributes.fileName;
    capa = `https://uploads.mangadex.org/covers/${id}/${coverFilename}`;
  }

  const cleanDescription = removeLinksFromText(description["pt-br"] || description["en"] || "Descrição não disponível");
  const types = type === "manga" ? "Mangá" : type === "manhwa" ? "Manhwa" : "Manhua";

  const translatedLanguages = availableTranslatedLanguages.map(lang => ({
    id: lang,
    name: iso639Languages[lang] || lang
  }));

  // Transforma os dados para o formato desejado
  const manga = {
    id,
    name: title["en"] || title["pt-br"] || "Título não encontrado", // Verifica se há título em inglês ou português
    capa,
    type: types,
    followers: follows,
    description: cleanDescription,
    status: statusMapping[status] || status,
    adult: ratingMapping[contentRating] || false,
    contentRating: contentRating,
    rate: rating.bayesian.toFixed(2),
    year: year,
    categories,
    create_date: formatDateToShort(createdAt),
    release_date: formatDate(updatedAt),
    languages: translatedLanguages,
    long: long ? true : false
  };

  return manga;
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda para meses menores que 10
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda para dias menores que 10
  return `${year}-${month}-${day}`;
}

function formatDateToShort(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
}
