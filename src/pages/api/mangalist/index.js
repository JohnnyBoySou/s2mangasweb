import stories from "../../../requests/mangalist";

export default async function handler(req, res) {
  try {
    const { page } = req.query;
    const pageSize = 20;
    const startIndex = ((page || 1) - 1) * pageSize;
    const endIndex = (page || 1) * pageSize;
    const paginatedStories = stories.slice(startIndex, endIndex);
    res.status(200).json(paginatedStories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
