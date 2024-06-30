import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export async function getChapters(mangaID, lg = 'pt-br') {
    try {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaID}/feed`,
            params: {
                translatedLanguage: [lg],
                order: {
                    chapter: 'desc',
                },
            }
        });
        const data = transformChapterData(resp?.data?.data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        console.log('Finalizou');
    }
}

const transformChapterData = (chapters) => {
    // Verifica se chapters é um array e se não está vazio
    if (!Array.isArray(chapters) || chapters.length === 0) {
        return [];
    }

    return chapters.map(chapter => {
        const { id, attributes } = chapter;
        const { title, chapter: chapterNumber, volume, translatedLanguage, publishAt, pages } = attributes;

        // Transforma a data de publicação para o formato desejado (27 de Dez, 2023)
        const publishDate = new Date(publishAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        return {
            id,
            title,
            chapter: parseInt(chapterNumber), // Converte para número inteiro
            volume: parseInt(volume), // Converte para número inteiro
            language: [translatedLanguage],
            publish_date: publishDate,
            pages,
        };
    });
};


/**
 *     {
      "id": "20ae03d5-25c5-4bd0-a8ba-2652cbe43f46",
      "type": "chapter",
      "attributes": {
        "volume": "4",
        "chapter": "22",
        "title": "Cops and Robbers (5)",
        "translatedLanguage": "en",
        "externalUrl": null,
        "publishAt": "2023-05-20T01:36:27+00:00",
        "readableAt": "2023-05-20T01:36:27+00:00",
        "createdAt": "2023-05-20T01:36:26+00:00",
        "updatedAt": "2023-05-21T02:21:30+00:00",
        "pages": 28,
        "version": 8
      },
      "relationships": [
        {
          "id": "2a5a666b-1d12-493b-9ced-0ea6741a4d96",
          "type": "scanlation_group"
        },
        {
          "id": "8f3e1818-a015-491d-bd81-3addc4d7d56a",
          "type": "manga"
        },
        {
          "id": "850ecce2-5a7a-4fa6-a2ed-2d6a7a5ccc83",
          "type": "user"
        }
      ]
    }
 */