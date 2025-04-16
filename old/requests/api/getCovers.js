import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export async function getCovers(mangaID) {
    try {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/cover`,
            params: {
                manga: [mangaID],
            }
        });
        const data = resp.data.data;   
        return formatCoverData(data, mangaID);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return null;
    } finally {
        console.log('Finalizou');
    }
}

function formatCoverData(covers, mangaID) {
    return covers.map(cover => ({
        img: `https://uploads.mangadex.org/covers/${mangaID}/${cover.attributes.fileName}`,
        volume: cover.attributes.volume,
        id: cover.id,
    }));
}

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