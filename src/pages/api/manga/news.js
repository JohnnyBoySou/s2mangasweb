import puppeteer from 'puppeteer';
import cheerio from 'cheerio'; 
const API_URL = "https://lermanga.org/"

export default async function handler(req, res) {

  let browser = await puppeteer.launch({ headless: 'new' });
  try {

    const page = await browser.newPage();
    await page.goto(API_URL);

    const html = await page.content();
    const mangaData = clearNews(html);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ mangas: mangaData });
  } catch (error) {
    console.error('Erro ao processar requisição:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    if (browser) {
      await browser.close();
    }
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