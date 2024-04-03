
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export default async function handler(req, res) {
    const { id } = req.query;
    const browser = await puppeteer.launch({ headless: true });
  
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      const page = await browser.newPage();
      await page.goto(`https://lermanga.org/mangas/${id}`);
      const html = await page.content();

      const similarMangas = clearSimilar(html);
  
      res.status(200).json(similarMangas);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro na requisição' });
    }finally {
      if (browser) {
        await browser.close();
      }
    }
  }
  
  export function clearSimilar(html){
    const $ = cheerio.load(html);
    const owlItems = $('.owl-carousel div')
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