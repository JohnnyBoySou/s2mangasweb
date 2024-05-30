import weekend from "../../../data/weekend";
export default async function handler(req, res) {
    try {
      res.status(200).json({ mangas: weekend });
    } catch (error) {
      console.error('Axios error:', error.message);
      console.error('Status:', error.response ? error.response.status : 'unknown');
      console.error('Data:', error.response ? error.response.data : 'unknown');
      // Retorna um JSON válido mesmo em caso de erro
      res.status(error.response ? error.response.status : 500).json({ error: 'Erro na requisição' });
    }finally {
     
    }
  }