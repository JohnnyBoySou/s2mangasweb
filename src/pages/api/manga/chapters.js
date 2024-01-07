
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"
const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

export default async function handler(req, res) {
    const { id } = req.query;
    try {
      const response = await axios.get(API_URL + 'manga/' + id);
      const $ = cheerio.load(response.data);    
      const chaptersArray = [];
  
      $('.single-chapter').each((index, element) => {
        const number = $(element).attr('data-id-cap');
        const dateRaw = $(element).find('small').text().trim();
  
        const day = dateRaw.slice(0, 2);
        const month = dateRaw.slice(3, 6);
        const year = dateRaw.slice(6, 10);
        const monthAbbreviation = months[parseInt(month, 10) - 1];
        const date = `${day} de ${monthAbbreviation}, ${year}`;
        const chapterInfo = {
          number: number,
          date: date,
        };
        chaptersArray.push(chapterInfo);
      });
  
      res.status(200).json(chaptersArray);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro na requisição' });
    }
  }