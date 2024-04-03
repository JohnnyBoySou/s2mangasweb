import requestLasted from "./lasted";
import requestNews from "./news";
import requestRate from "./rate";
import requestWeekend from "./weekend";

const requestHome = async () => {
    const lasted = await fetch('http://localhost:3000/api/manga/lasted').then(res => res.mangas).catch(() => []);
    const news = await fetch('http://localhost:3000/api/manga/news').then(res => res.mangas).catch(() => []);
    const weekend = await fetch('http://localhost:3000/api/manga/weekend').then(res => res.mangas).catch(() => []);
    const rate = await fetch('http://localhost:3000/api/manga/rate').then(res => res.mangas).catch(() => []);
    const res = {
      //  lasted: lasted,
        news: news,
       // weekend: weekend,
       // rate: rate,
    }
    return res
};

export default requestHome;
