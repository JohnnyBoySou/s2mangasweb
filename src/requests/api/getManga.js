import axios from 'axios';
import iso639Languages from './iso639';
const baseUrl = 'https://api.mangadex.org';

export async function getManga(mangaID = '8f3e1818-a015-491d-bd81-3addc4d7d56a') {
    try {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaID}`,
            params: {
                includes: ['cover_art',],
            }
        });
        const stat = await axios({
            method: 'GET',
            url: `${baseUrl}/statistics/manga/${mangaID}`,
        });

        const data = transformData(resp?.data?.data, stat);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        console.log('Finalizou');
    }
}

const removeLinksFromText = (text) => {
    // Remove qualquer URL da string
    return text?.replace(/https?:\/\/[^\s]+/g, '');
};


const transformData = (data, stats) => {
    
    if (!data) {
        return null;
    }

    const {
        id,
        type,
        attributes: {
            title = {},
            description = {},
            status = '',
            year = null,
            contentRating = '',
            tags = [],
            createdAt = '',
            updatedAt = '',
            availableTranslatedLanguages = [],
        } = {},
        relationships = []
    } = data;

    const { rating, follows } = stats.data.statistics[id];

    // Mapeia os status para o formato desejado
    const statusMapping = {
        completed: 'Completo',
        ongoing: 'Em andamento',
        hiatus: 'Hiato',
        cancelled: 'Cancelado',
    };

    // Mapeia os ratings para o formato desejado
    const ratingMapping = {
        safe: false,
        suggestive: true,
        erotica: true,
        pornographic: true,
    };

    // Extrai categorias dos tags
    const categories = tags.map(tag => tag.attributes.name.en);
    const long = categories.find(tag => tag === 'Long Strip')

    // Encontra o relacionamento de cover_art e extrai o nome do arquivo
    const coverArtRelationship = relationships.find(rel => rel.type === 'cover_art');
    let capa = '';

    if (coverArtRelationship && coverArtRelationship.attributes) {
        const coverFilename = coverArtRelationship.attributes.fileName;
        capa = `https://uploads.mangadex.org/covers/${id}/${coverFilename}`;
    }

    const cleanDescription = removeLinksFromText(description["pt-br"] || description[0]);
    const types = type === 'manga' ? 'Mangá' : type === 'manhwa' ? 'Manhwa' : 'Manhua';

    const translatedLanguages = availableTranslatedLanguages.map(lang => ({
        id: lang,
        name: iso639Languages[lang] || lang
    }));


    // Transforma os dados para o formato desejado
    const manga = {
        id,
        name: title.en || '',
        capa,
        type: types,
        rate: rating.average.toFixed(1),
        followers: follows,
        description: cleanDescription,
        status: statusMapping[status] || status,
        adult: ratingMapping[contentRating] || false,
        year: year,
        categories,
        chapters: 1, // Pode ser ajustado se houver dados sobre capítulos
        create_date: formatDateToShort(createdAt),
        release_date: formatDate(updatedAt),
        languages: translatedLanguages,
        long: long ? true : false,
    };

    return manga;
};



function formatDate(dateString) {
    const currentDate = new Date();
    const date = new Date(dateString);
    const diffInMilliseconds = currentDate - date;
    const diffInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
  
    if (diffInYears === 0) {
      return 'Este ano';
    } else if (diffInYears === 1) {
      return '1 ano atrás';
    } else {
      return `${diffInYears} anos atrás`;
    }
  }

  function formatDateToShort(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }
