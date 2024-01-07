
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"



export default async function handler(req, res) {
    const { id } = req.query;
  
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  


      const response = await axios.get(`https://lermanga.org/mangas/${id}`);
      const similarMangas = clearSimilar(response.data);
  
      res.status(200).json(similarMangas);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro na requisição' });
    }
  }
  
  export function clearSimilar(html){
    const $ = cheerio.load(html);
    const owlItems = $('.owl-carousel div')
    const owlILog = $('.owl-carousel div').html()
    const mangas = [];
    owlItems.each((index, element) => {
      const manga = {}
      manga.name = $(element).find('a').attr('title').slice(10);
      manga.capa = $(element).find('img').attr('data-src');
      manga.date = $(element).find('.ep').text().trim()
      manga.id = $(element).find('img').attr('data-src').slice(27, -9)
      mangas.push(manga);
    });
  
  return mangas
  }