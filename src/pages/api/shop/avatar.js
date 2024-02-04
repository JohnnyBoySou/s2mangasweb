import { avatars, chibi , art, art2, geral, animev2, novos} from "../../../requests/shop/avatars";


export default async function handler(req, res) {
  try {

    const avatar = [
        {'avatars':avatars}, 
        {'chibi': chibi}, 
        {'art':art}, 
        {'art2':art2}, 
        {'geral':geral}, 
        {'animev2':animev2}, 
        {'novos':novos}, 
    ]
    res.status(200).json(avatar);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro na requisição' });
  }
}
