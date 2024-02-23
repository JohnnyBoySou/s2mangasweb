import stories from "../../../../requests/mangalist";

export default async function handler(req, res) {
  const { id } = req.query;
  const uid = parseInt(id);
  const item = stories.find((item) => item.id === uid);
  try {
    if(item === undefined){
      res.status(404).json(
        { 
          error: 'Mangalist não encontrado',
          code: 404,
          id: uid,
      });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
