'use client';
import axios from "axios";
import cheerio from 'cheerio';
const headers = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
};
export default async function requestLasted(page = 1) {
  try {
    const response = await axios.get(`https://lermanga.org/mangas/page/${page}?orderby=date&order=desc`,  { headers: {'Accept': "text/html", 'Access-Control-Allow-Origin': '*'} });
    const mangaData = clearWeekend(response.data);
    return {mangas : mangaData}
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
  