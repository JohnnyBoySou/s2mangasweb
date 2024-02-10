import requestLasted from "./lasted";
import requestNews from "./news";
import requestRate from "./rate";
import requestWeekend from "./weekend";

const requestHome = async () => {
    const lasted = await requestLasted();
    const news = await requestNews();
    const weekend = await requestWeekend();
    const rate = await requestRate();
    const res = {
        lasted: lasted.mangas,
        news: news.mangas,
        weekend: weekend.mangas,
        rate: rate.mangas,
    }
    return res
};

export default requestHome;
