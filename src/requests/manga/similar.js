
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"



export default async function requestSimilar( id ) {
  
    try {
      const response = await axios.get(`https://lermanga.org/mangas/${id}`);
      const similarMangas = clearSimilar(response.data);
      return { mangas: similarMangas }

    } catch (error) {
      return error.message;
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