
import axios from "axios";
import cheerio from 'cheerio';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { chapter, id } = req.query;
    const return_data = {
      "link": 1,
      "chapter_number": chapter,
      "manga": id,
      "images": [],
      "format": 0,
      "pages": 0,
      "next_chapter": { "number": parseInt(chapter, 10) + 1 },
      "previus_chapter": { "number": parseInt(chapter, 10) >= 2 ? parseInt(chapter, 10) - 1 : 1 }
    };
  
    const startPageIndex = 1;
    const tag = id.slice(0, 1).toUpperCase();
    const formats = ['png', 'jpg', 'jpeg'];
  
    try {
      let foundPage = false;
      let selectedFormat = null;
  
      for (const format of formats) {
        let pageIndex = startPageIndex;
  
        while (pageIndex <= 2) {
          const link = `https://img.lermanga.org/${tag}/${id}/capitulo-${chapter}/${pageIndex.toString().padStart(2, '0')}.${format}`;
  
          try {
            await axios.get(link);
            foundPage = true;
            selectedFormat = format;
            pageIndex++;
          } catch (error) {
            if (pageIndex === 1) {
              // Se falhar para pageIndex 1, tente com 01
              pageIndex = 2;
            } else {
              break;
            }
          }
        }
  
        if (foundPage) {
          break; // Se encontrou uma página, não precisa continuar procurando em outros formatos
        }
      }
  
      if (foundPage && selectedFormat) {
        const urls = [];
      
        // Agora que conhecemos o formato válido, buscamos todas as páginas disponíveis
        let pageIndex = startPageIndex;
      
        while (true) {
          const link = `https://img.lermanga.org/${tag}/${id}/capitulo-${chapter}/${pageIndex.toString().padStart(2, '0')}.${selectedFormat}`;
      
          try {
            // Verifica a existência da página novamente
            await axios.get(link);
      
            // Adiciona o link ao array de urls
            urls.push(link);
            pageIndex++;
          } catch (error) {
            // Se a página não for encontrada, encerra o loop
            break;
          }
        }
      
        return_data.format = selectedFormat;
        return_data.pages = urls.length;
        return_data.images = urls;
      } else {
        console.error('Nenhuma página encontrada.');
      }
      
      res.status(200).json(return_data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro na requisição' });
    }
  }