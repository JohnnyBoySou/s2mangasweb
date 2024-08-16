import news from "@data/mangas/news";
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  try {
    res.status(200).json({ mangas: news });
  } catch (error) {
    console.error('Axios error:', error.message);
    console.error('Status:', error.response ? error.response.status : 'unknown');
    console.error('Data:', error.response ? error.response.data : 'unknown');
    // Retorna um JSON válido mesmo em caso de erro
    res.status(error.response ? error.response.status : 500).json({ error: 'Erro na requisição' });
  } finally {

  }
}