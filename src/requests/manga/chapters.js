
import axios from "axios";
import * as cheerio from 'cheerio';
const headers = {'Accept': "text/html", 'Access-Control-Allow-Origin': '*'} 
const API_URL = "https://lermanga.org/"
const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

export default async function requestChapters(id) {
  try {
    const response = await axios.get(API_URL + 'mangas/' + id, { headers: {'Accept': "text/html", 'Access-Control-Allow-Origin': '*'} });
    const $ = cheerio.load(response.data);
    const chaptersArray = [];

    $('.single-chapter').each((_, element) => {
      const number = $(element).attr('data-id-cap');
      const dateRaw = $(element).find('small').text().trim();

      const day = dateRaw.slice(0, 2);
      const month = dateRaw.slice(3, 6);
      const year = dateRaw.slice(6, 10);
      const monthAbbreviation = months[parseInt(month, 10) - 1];
      const date = `${day} de ${monthAbbreviation}, ${year}`;
      const chapterInfo = {
        number: parseInt(number),
        date: date,
      };
      chaptersArray.push(chapterInfo);
    });

    return chaptersArray;

  } catch (error) {
    console.log(error);
    return error.message;
  }
}
    

    