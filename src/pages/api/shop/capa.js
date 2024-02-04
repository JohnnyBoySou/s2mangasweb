import { capas , capas2, comida, geralbg, news} from '../../../requests/shop/capas';

export default async function handler(req, res) {
  try {

    const capa = [
        {'capas':capas}, 
        {'capas2':capas2}, 
        {'comida':comida}, 
        {'geralbg':geralbg}, 
        {'news':news}, 
    ]
    res.status(200).json(capa);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
