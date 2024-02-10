
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"

export default async function requestNews() {
  try {
    const response = await axios.get(API_URL,  { headers: {'Accept': "text/html", 'Access-Control-Allow-Origin': '*'} });
    const mangaData = clearNews(response.data);
    return { mangas: mangaData}
  } catch (error) {
    return error.message;
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