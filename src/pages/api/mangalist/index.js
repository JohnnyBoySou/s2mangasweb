import stories from "@data/mangalists";

export default async function handler(req, res) {
  try {
    const { page, type } = req.query;
    const storiesByType = stories.filter((story) => story.type === type);
    const pageSize = 20;
    const startIndex = ((page || 1) - 1) * pageSize;
    const endIndex = (page || 1) * pageSize;
    const paginatedStories = storiesByType.slice(startIndex, endIndex);
    res.status(200).json(paginatedStories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
