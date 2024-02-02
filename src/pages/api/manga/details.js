import axios from 'axios';
import cheerio from 'cheerio';
const API_URL = "https://lermanga.org/"


export default async function handler(req, res) {
  const { id } = req.query;
  

  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    
    const manga = {};
    const response = await axios.get(API_URL + '/mangas/' + id);
    const $ = cheerio.load(response.data);
    const item = $('.content_post');

   // manga.score = item.find('.rating-area .kksr-legend').text().split("/")[0].trim();
    manga.rate = item.find('.kksr-legend').text().split("/")[0].trim();
    manga.id = id;
    manga.capa = item.find('.capaMangaInfo img').attr('src');
    manga.chapters = item.find('.single-chapter').first().attr('data-id-cap');
    manga.last_chapter = item.find('.single-chapter').first().attr('data-id-cap');
    manga.first_chapter = '1';

    manga.name = item.find('.boxAnimeSobreLast h1').text().slice(10);
    manga.title = item.find('.boxAnimeSobreLast h1').text().slice(10);
    manga.type = item.find('.fd-infor .fdi-item').text().trim();
    manga.date = item.find('.fd-infor a ').eq(1).text().trim();
    manga.categories = item.find('.genre-list li').map((index, element) => {
      const categoryText = $(element).text().trim();
      return { id: categoryText, name: categoryText };
    }).get();
    manga.description = item.find('.boxAnimeSobreLast p').text().slice(9);

    const desc1 = item.find('.tsinfo.bixbox .imptdt i').map((index, element) => $(element).text()).get();

    manga.status = desc1[0] === 'Em curso' ? 'Em lançamento' : 'Finalizado';
    manga.released = desc1[1];
    manga.author = desc1[2];
    manga.artist = desc1[3] ? desc1[3] : desc1[2];

    const return_data = { manga };
    res.status(200).json(return_data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
