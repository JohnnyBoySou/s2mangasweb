import axios from "axios"

const API_URL = "https://s2mangas.com/api/publish"
const Headers = { 'Content-Type': 'application/json', }
import weekend from "@data/weekend";


export async function getWeekend(page = 1) {
    try {
        const res = await axios.get(`${API_URL}/weekend?page=${page}`, { headers: Headers });
        console.log(res)
        return weekend;
    } catch (error) {
        return error.message;
    }
}