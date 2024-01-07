
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"

export default async function handler(req, res) {
  
  try {

  
    const response = await axios.get(API_URL, { headers });
    const mangaData = clearNews(response.data);
    // Retorna um JSON válido
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
    res.status(200).json({ mangas: mangaData });
  } catch (error) {
    console.error('Axios error:', error.message);
    console.error('Status:', error.response ? error.response.status : 'unknown');
    console.error('Data:', error.response ? error.response.data : 'unknown');
    // Retorna um JSON válido mesmo em caso de erro
    res.status(error.response ? error.response.status : 500).json({ error: 'Erro na requisição' });
  }
}

export function clearNews(html) {
  const $ = cheerio.load(html);
  const bss = $('.innercontent .capitulo_recentehome')
  const mangas = [];
  bss.each((index, element) => {
    const manga = {}
    const bs = $(element);
    const uid = bs.find('.boxAnimeSobreCap h3 a').attr('href')
    manga.id = uid.split('/').reverse()[1];
    const links = bs.find('.fdi-item.fdi-cate a');
    const resultArray = links.map((index, element) => $(element).text()).get();
    const chapterLinks = bs.find('.lancamento-list li a');
    const chapterNumbers = chapterLinks.map((index, element) => $(element).text()).get();
    manga.newchapters = chapterNumbers
    manga.categories = resultArray
    manga.name = bs.find('h3').text()
    manga.chapters = bs.find('.lancamento-list').children().first().text()
    manga.capa = bs.find('.capaMangaCap img').attr('data-src');
    manga.release_date = bs.find('.boxAnimeSobreCap small').text().trim()
    manga.status = 'Em lançamento'
    mangas.push(manga);
  });
  return mangas
}