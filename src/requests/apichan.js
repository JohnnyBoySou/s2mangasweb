
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"

export async function requestWeekend() {
    var return_data = { "manga": {} };
    try {
        const response = await axios.get('https://lermanga.org/mangas/?orderby=views&order=desc', {headers});
        console.log('Response:', response);
        return_data.manga = clearWeekend(response.data);
    } catch (error) {
        console.error('Axios error:', error.message);
        console.error('Status:', error.response ? error.response.status : 'unknown');
        console.error('Data:', error.response ? error.response.data : 'unknown');
    
    }
    return return_data;
}

export async function requestRate() {
  var return_data = { "manga": {} };
  try {
      let response = await axios.get('https://lermanga.org/mangas/?orderby=rating&order=desc');
      return_data.manga = clearWeekend(response.data);
  } catch (error) {
      console.error(error.message);
  }
  return return_data;
}

export async function requestLasted() {
  var return_data = { "manga": {} };
  try {
      let response = await axios.get('https://lermanga.org/mangas/?orderby=date&order=desc');
      return_data.manga = clearWeekend(response.data);
  } catch (error) {
      console.error(error.message);
  }
  return return_data;
}

export async function requestNews() {
  var return_data = { "manga": {} };
  try {
      let response = await axios.get(API_URL);
      return_data.manga = clearNews(response.data);

  } catch (error) {
      console.error(error.message);
  }
  return return_data;
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
    manga.chaptersList = chapterNumbers
    manga.cats = resultArray
    manga.name = bs.find('h3').text()
    manga.chapters = bs.find('.lancamento-list').children().first().text()
    manga.capa = bs.find('.capaMangaCap img').attr('data-src');
    manga.date = bs.find('.boxAnimeSobreCap small').text().trim()
    manga.status = 'Em lançamento'
    mangas.push(manga);
  });
  return mangas
}

export async function requestManga(id) {
  const return_data = {manga:{}};
  try {
    const manga = {}
    const response = await axios.get(API_URL + '/mangas/' + id);
    const $ = cheerio.load(response.data);
    const item = $('.content_post'); 

    manga.score = item.find('.rating-area .kksr-legend').text().split("/")[0].trim()
    manga.rate = item.find('.rating-area .kksr-legend').text().split("/")[0].trim()
    manga.id = id
    manga.capa = item.find('.capaMangaInfo img').attr('src');
    manga.chapters = item.find('.single-chapter').first().attr('data-id-cap')
    manga.last_chapter = item.find('.single-chapter').first().attr('data-id-cap')
    manga.first_chapter = '1'

    manga.name = item.find('.boxAnimeSobreLast h1').text().slice(10)
    manga.title = item.find('.boxAnimeSobreLast h1').text().slice(10)
    manga.typename = item.find('.fd-infor .fdi-item').text().trim()
    manga.date = item.find('.fd-infor a ').eq(1).text().trim()
    manga.categories = item.find('.genre-list li').map((index, element) => {const categoryText = $(element).text().trim();return {id: categoryText, name: categoryText,};}).get();
    manga.description = item.find('.boxAnimeSobreLast p').text().slice(9)
    
    
    //manga.alternative = item.find('.alternative').text()
    const desc1 = item.find('.tsinfo.bixbox .imptdt i').map((index, element) => $(element).text()).get();

    manga.status = desc1[0] === 'Em curso' ? 'Em lançamento' : 'Finalizado'
    manga.released = desc1[1]
    manga.author = desc1[2]
    manga.artist = desc1[3] ? desc1[3] : desc1[2]
    return_data.manga = manga
    return return_data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function requestChapters(id) {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  try {
    const response = await axios.get(API_URL + 'manga/'+ id);
    const $ = cheerio.load(response.data);
    const chaptersArray = [];
    $('.single-chapter').each((index, element) => {
      const number = $(element).attr('data-id-cap');
      const dateRaw = $(element).find('small').text().trim();

      const day = dateRaw.slice(0,2)
      const month = dateRaw.slice(3,6)
      const year = dateRaw.slice(6,11)
      const monthAbbreviation = months[parseInt(month, 10) - 1];
      const date = `${day} de ${monthAbbreviation}, ${year}`;
      const chapterInfo = {
        number: number,
        date: date,
      };
      chaptersArray.push(chapterInfo);
    });

    return chaptersArray


  } catch (error) {
    console.error(error.message);
  }
}

export async function requestPages(chapter, id) {
    const return_data = {
      "chapter_number": chapter,
      "images": [],
      "pages": 0,
      "next_chapter": { "number": chapter + 1  },
      "previus_chapter": { "number": chapter >= 2 ? chapter - 1 : 1, }
    };
    const startPageIndex = 1;
    const tag = id.slice(0,1).toUpperCase()
    const formats = ['png', 'jpg', 'jpeg']
    try {
      const urls = [];
      for (const format of formats) {
        let pageIndex = startPageIndex;
        while (true) {
          const link = `https://img.lermanga.org/${tag}/${id}/capitulo-${chapter}/${pageIndex}.${format}`;
          console.log(link)
          try {
            await axios.get(link);
            urls.push(link);
            pageIndex++;
          } catch (error) {
            break;
          }
        }
      }
    
      if (urls.length > 0) {
        return_data.pages = urls.length
        return_data.images = urls
      } else {
        console.error('Nenhuma página encontrada.');
      }
    } catch (error) {
      console.error(error.message);
    }
    return return_data;
}
  
export async function requestGenre(name, page) {
  var return_data = { "mangas": [] }; 
  const offset = page > 1 ? '/page/' + page : ''
  try {
    const response = await axios.get(API_URL  + '/genres/' + name + offset);
    return_data.mangas = cleanGenres(response.data)
  } catch (error) {
    console.error(error.message);
  }
  return return_data;
}

export async function requestSearch (name){

  var return_data = { "mangas": [] }; 
  
  try {
    const response = await axios.get(API_URL + '?s=' + name)
    return_data.mangas = cleanResults(response.data)
  } catch (error) {
    console.log(error.message);
  }
  return return_data;
}

function cleanResults (html){
  const $ = cheerio.load(html);
    const bss = $('.listupd .bs');
    const mangas = [];
    bss.each((index, element) => {
      const manga = {}
      const bs = $(element);
      const uid = bs.find('a').attr('href')
      manga.id = uid.split('/').reverse()[1];
      manga.index = index
      manga.typename = bs.find('.typename').text();
      manga.name = bs.find('.tt').text().trim();
      manga.rate = bs.find('.numscore').text();
      let chp = bs.find('.epxs').text();
      manga.chapters = parseInt(chp.match(/\d+/g))
      manga.paginas = parseInt(chp.match(/\d+/g))
      manga.capa = bs.find('.ts-post-image').attr('src');
      manga.status = 'Em lançamento'
      mangas.push(manga);
  });
  return mangas

}

function cleanGenres (html){
  const $ = cheerio.load(html);
    const bss = $('.listupd .bs');
    const mangas = [];
    bss.each((index, element) => {
      const manga = {}
      const bs = $(element);
      const uid = bs.find('a').attr('href')
      manga.id = uid.split('/').reverse()[1];
      manga.index = index
      manga.typename = bs.find('.typename').text();
      manga.name = bs.find('.tt').text().trim();
      manga.rate = bs.find('.numscore').text();
      let chp = bs.find('.epxs').text();
      manga.chapters = parseInt(chp.match(/\d+/g))
      manga.paginas = parseInt(chp.match(/\d+/g))
      manga.capa = bs.find('.limit img').attr('src');
      manga.status = 'Em lançamento'
      mangas.push(manga);
  });
  return mangas

}


export async function requestSimilar(id) {
  var return_data = [];
  try {
      let response = await axios.get('https://lermanga.org/mangas/'+ id );
      return_data = clearSimilar(response.data);
  } catch (error) {
      console.error(error.message);
  }
  return return_data;
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
    mangas.push(manga);
  });

return mangas
}