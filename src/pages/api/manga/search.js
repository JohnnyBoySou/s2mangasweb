
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"



export default async function handler(req, res) {
    const { name } = req.query;
  
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  


      const response = await axios.get(API_URL + '?s=' + name);
      const similarMangas = cleanResults(response.data);
      res.status(200).json(similarMangas);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro na requisição' });
    }
  }
       
function cleanResults (html){
  const $ = cheerio.load(html);
  const bss = $('.film_list-wrap .flw-item')
  const mangas = [];
  bss.each((index, element) => {
    const manga = {}
    const bs = $(element);
    const uid = bs.find('.film-poster-ahref').attr('href')
    manga.id = uid.split('/').reverse()[1];
    manga.typename = bs.find('.item__cat').text().trim()
    manga.cl = bs.find('.item__color-badge').text()
    manga.name = bs.find('.dynamic-name').text()
    manga.rate = bs.find('.item__rating').text().trim()
    manga.chapters = bs.find('.luf ul li').children().first().text()
    manga.capa = bs.find('.film-poster-img').attr('src');
    manga.status = 'Em lançamento'
    mangas.push(manga);
  });
  return mangas

}
