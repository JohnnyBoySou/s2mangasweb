
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"

export default async function requestRate() {
  try {
    const response = await axios.get('https://lermanga.org/mangas/?orderby=rating&order=desc', { headers });
    const mangaData = clearWeekend(response.data);
    return { mangas: mangaData }
  } catch (error) {
    return error.message;
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
  