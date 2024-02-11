import stories from "../../../requests/mangalist";

export default async function handler(req, res) {
  try {
    res.status(200).json(stories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
