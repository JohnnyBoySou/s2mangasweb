import { backgrounds } from 'old/data/shop/collections';

export default async function handler(req, res) {
  try {
    res.status(200).json(backgrounds);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
