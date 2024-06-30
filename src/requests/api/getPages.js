import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export async function getPages(chapterID = '6abbf820-dc5b-4e50-8335-af06e08f8cbc', mangaID) {
  try {
      const resp = await axios({
          method: 'GET',
          url: `${baseUrl}/at-home/server/${chapterID}`,
      });
      const chapters = await axios({
        method: 'GET',
        url: `${baseUrl}/manga/${mangaID}/feed`,
        params: {
            translatedLanguage: ['pt-br',],
            order: {
                chapter: 'desc',
            },
        }});
    
      const list = transformChapterData(chapters?.data?.data);
      const next = list.find(item => item.chapter === list.find( item => item.id === chapterID).chapter + 1);
      const prev = list.find(item => item.chapter === list.find( item => item.id === chapterID).chapter - 1);
      
      const { data } = resp; // Obtenha apenas os dados da resposta
      const chapterHash = data.chapter?.hash; // Obtenha a chave de hash do capítulo
      const pages = transformPage(chapterHash, data.chapter?.data); // Use transformPage para obter as URLs das páginas
      return {pages: pages, next: next, prev: prev};
  } catch (error) {
      console.error(error);
      return null;
  } finally {
      console.log('Finalizou');
  }
}

const transformPage = (chapterHash, pageData, baseUrl = 'https://uploads.mangadex.org') => {
    if (!chapterHash || !pageData || !pageData.length) {
        throw new Error('Invalid chapter data');
    }

    return pageData.map(page => {
        return `${baseUrl}/data/${chapterHash}/${page}`;
    });
};




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
