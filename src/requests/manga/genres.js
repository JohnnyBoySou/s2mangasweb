
import axios from "axios";
import cheerio from 'cheerio';
export default async function requestGenre(genre, page = 1) {
  try {
    const response = await axios.get(`https://lermanga.org/mangas/genero/${genre}/page/${page}`,  { headers: {'Accept': "text/html", 'Access-Control-Allow-Origin': '*'} });
    const mangaData = clearGenre(response.data);
    return {mangas : mangaData}
  } catch (error) {
    return error.message;
  }
}

export function clearGenre(html) {
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
  