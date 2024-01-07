
import axios from "axios";
import cheerio from 'cheerio';
const headers = {'Accept': "application/json",} 
const API_URL = "https://lermanga.org/"

import { NextResponse } from "next/server";

export default async function handler(req, NextResponse) {
  try {
    const response = await axios.get('https://lermanga.org/mangas/?orderby=views&order=desc', { headers });
    const mangaData = clearWeekend(response.data);

    // Usa next-response para definir os cabeçalhos CORS
    NextResponse.setHeader('Access-Control-Allow-Origin', '*');
    NextResponse.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    NextResponse.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    NextResponse.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

    // Retorna um JSON válido
    NextResponse.status(200).json({ mangas: mangaData });
  } catch (error) {
    console.error('Axios error:', error.message);
    console.error('Status:', error.response ? error.response.status : 'unknown');
    console.error('Data:', error.response ? error.response.data : 'unknown');
    response.status(error.response ? error.response.status : 500).json({ error: 'Erro na requisição' });
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
  