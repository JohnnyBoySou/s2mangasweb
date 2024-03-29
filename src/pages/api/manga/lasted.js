
import axios from "axios";
import cheerio from 'cheerio';
const headers = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
};

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', 's2mangas.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    
    const response = await axios.get('https://lermanga.org/mangas/?orderby=date&order=desc', { headers });
    const mangaData = clearWeekend(response.data);
    // Retorna um JSON válido 
    res.status(200).json({ mangas: response });
  } catch (error) {
    console.error('Axios error:', error.message);
    console.error('Status:', error.response ? error.response.status : 'unknown');
    console.error('Data:', error.response ? error.response.data : 'unknown');
    // Retorna um JSON válido mesmo em caso de erro
    res.status(error.response ? error.response.status : 500).json({ error: 'Erro na requisição' });
  }
}

export function clearWeekend(html) {
  const $ = cheerio.load(html);
  const bss = $('.film_list-wrap .flw-item')
  const mangas = [];
  bss.each((index, element) => {
    const manga = {}
    const bs = $(element);
    const uid = bs.find('.film-poster-ahref').attr('href')

    manga.id = uid.split('/').reverse()[1];
    manga.type = bs.find('.item__cat').text().trim()
    manga.cl = bs.find('.item__color-badge').text()
    manga.name = bs.find('.dynamic-name').text()
    manga.score = bs.find('.item__rating').text().trim()
    manga.chapters = bs.find('.luf ul li').children().first().text()
    manga.capa = bs.find('.film-poster-img').attr('data-src');
    manga.status = 'Em curso'
    
    mangas.push(manga);
});
return mangas
}
  