import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export async function getCategory(name, page) {
    try {

        const includedTagNames = [name];
        const tags = await axios(`${baseUrl}/manga/tag`);

        const includedTagIDs = tags.data.data
            .filter(tag => includedTagNames.includes(tag.attributes.name.en))
            .map(tag => tag.id);
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/`,
            params: {
                'includedTags': includedTagIDs,
                availableTranslatedLanguage: ['pt-br'],
                includes: ['cover_art', 'score', 'chapter',],
                offset: 20 * page,
            }
        });
        
        const data = transformDataArray(resp?.data?.data)
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
    return text.replace(/https?:\/\/[^\s]+/g, '');
};


const transformDataArray = (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return [];
    }
    // Função de transformação fornecida
    const transformData = (data) => {
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

        // Encontra o relacionamento de cover_art e extrai o nome do arquivo
        const coverArtRelationship = relationships.find(rel => rel.type === 'cover_art');
        let capa = '';

        if (coverArtRelationship && coverArtRelationship.attributes) {
            const coverFilename = coverArtRelationship.attributes.fileName;
            capa = `https://uploads.mangadex.org/covers/${id}/${coverFilename}`;
        }

        const cleanDescription = removeLinksFromText(description["pt-br"] || description.en || '');
        const types = type === 'manga' ? 'Mangá' : type === 'manhwa' ? 'Manhwa' : 'Manhua';

        // Transforma os dados para o formato desejado
        const manga = {
            id,
            name: title.en || '',
            capa,
            type: types,
            description: cleanDescription,
            status: statusMapping[status] || status,
            adult: ratingMapping[contentRating] || false,
            year: year,
            categories,
            chapters: 1, // Pode ser ajustado se houver dados sobre capítulos
            create_date: formatDateToShort(createdAt),
            release_date: formatDate(updatedAt),
            languages: availableTranslatedLanguages,
        };

        return manga;
    };

    // Aplica a função de transformação a cada item do array
    return dataArray.map(transformData);
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