import Decks from "@data/cards/index";

export default async function handler(req, res) {
  try {
    res.status(200).json(Decks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
