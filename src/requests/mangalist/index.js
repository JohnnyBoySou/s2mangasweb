const stories = [
    {
        id: 1,
        video: 'https://v1.pinimg.com/videos/mc/720p/e8/2f/38/e82f38964d6e4b15c99e26077522f1e1.mp4',
        name: 'para curtir o final de tarde', 
        type: 'stories',
        short: 'Spy x Family',
        color: '#FF9FEF',
        desc: 'só quero relaxar com meu mangázin',
        date: '30 de Mar, 2024',
        capa: 'https://i.pinimg.com/564x/4f/5c/db/4f5cdbee3dd40db97458e586f5c33aa8.jpg',
        mangas_ids: ['spy-x-family', 'kobayashi-san-chi-no-maid-dragon-kanna-no-nichijou', 'shiro-seijo-to-kuro-bokushi', 'ookiku-nattara-kekkon-suru', 'auto-hunting-with-clones', 'tokyo-aliens', 'character-na-kang-lim' ]
    },
    {   
        id: 2,
        video: 'https://v1.pinimg.com/videos/mc/720p/79/36/3b/79363bd4f0a51a3df6be150eb3fe8218.mp4',
        short: 'Tate no Yuusha - AMV',
        name: 'apanho agora e apanho depois',
        type: 'stories',
        color: "#004E2F",
        date: '24 de Mar, 2024',
        desc: 'talvez hoje não seja meu melhor dia',
        capa: 'https://i.pinimg.com/564x/63/a7/49/63a7498407039ee86c9f8b93ff69913f.jpg',
        mangas_ids: [
            {
                name: 'Hanma Baki',
                id: 'hanma-baki',
                capa: 'https://img.lermanga.org/H/hanma-baki/capa.jpg',
            },
            {
                name: 'Tate no Yuusha no Nariagari',
                id: 'tate-no-yuusha-no-nariagari',
                capa: 'https://img.lermanga.org/T/tate-no-yuusha-no-nariagari/capa.jpg',
            },
            {
                name: 'Eternal First Son-in-Law',
                id: 'eternal-first-son-in-law',
                capa: 'https://img.lermanga.org/E/eternal-first-son-in-law/capa.jpg',
            },
            {
                name: 'The Great Mage Returns After 4000 Years',
                id: 'the-great-mage-returns-after-4000-years',
                capa: 'https://img.lermanga.org/T/the-great-mage-returns-after-4000-years/capa.jpg',
            },
            {
                name: 'The Strongest Florist',
                id: 'the-strongest-florist',
                capa: 'https://img.lermanga.org/T/the-strongest-florist/capa.jpg',
            },{
                name: 'Solo Leveling',
                id: 'solo-leveling-pt-br',
                capa: 'https://img.lermanga.org/S/solo-leveling/capa.jpg',
                
            },
            {
                name: 'Dead Rock',
                id: 'dead-rock',
                capa: 'https://img.lermanga.org/D/dead-rock/capa.jpg',
            },
            {
                name: 'Konjiki no Word Master: Yuusha Yonin ni Makikomareta Unique Cheat',
                id: 'konjiki-no-word-master-yuusha-yonin-ni-makikomareta-unique-cheat',
                capa: 'https://img.lermanga.org/K/konjiki-no-word-master-yuusha-yonin-ni-makikomareta-unique-cheat/capa.jpg',
            },
            {
                name: 'Lycoris Recoil',
                id: 'lycoris-recoil',
                capa: 'https://img.lermanga.org/L/lycoris-recoil/capa.jpg',
            },
        ]
    },
    {   
        id: 3,
        video: 'https://v1.pinimg.com/videos/mc/720p/eb/46/d8/eb46d895a130eb3da44ecfcbcff73992.mp4',
        short: 'Pokémon - Squirtle Dance',
        name: 'go gym',
        type: 'stories',
        date: '12 de Mar, 2024',
        color: '#004BBB',
        desc: 'go gym, vamos vamos não perde o ritmo mais uma repetição',
        capa: 'https://i.pinimg.com/564x/32/75/e5/3275e5012006ba8211a88f3a4a6a56ad.jpg',
        mangas_ids: ['pokemon-special', 'the-great-villain-who-threatened-to-kill-himself', 'dorei-tensei-sono-dorei-saikyou-no-moto-ouji-ni-tsuki', 'yakusai-no-moushigo-to-seijo-no-meikyuu', 'necromancer-academy-and-the-genius-summoner', 'erotic-x-anabolic', 'mezametara-saikyou-soubi-to-uchuusen-mochi-datta-no-de-ikkodate-mezashite-youhei-toshite-jiyuu-ni-ikitai']
    },
    {   
        id: 4,
        video: 'https://v1.pinimg.com/videos/mc/720p/31/5a/87/315a8746f305880e2847b3e46d91ce00.mp4',
        short: 'Ijiranaide, Nagatoro-san',
        name: 'o amor está no ar',
        type: 'stories',
        color: '#00BB71',
        date: '06 de Mar, 2024',
        desc: 'romances para aquecer o coração',
        capa: 'https://img.lermanga.org/M/my-universe/capa.jpg',
        mangas_ids: ['my-universe', 'nee-chan-no-tomodachi-ga-uzai-banashi', 'there-are-too-many-second-male-leads', 'punderworld', 'oshi-ni-amagam', 'sono-bijin-otoko-fushidara-ni-tsuki', 'sono-bijin-otoko-fushidara-ni-tsuki', 'heroine-hajimemashita', 'ijiranaide-nagatoro-sa']
    },
    {   
        id: 5,
        video: 'https://v1.pinimg.com/videos/mc/720p/31/5a/87/315a8746f305880e2847b3e46d91ce00.mp4',
        short: 'Ijiranaide, Nagatoro-san',
        name: 'shounen ta na moda',
        type: 'post',
        color: '#2370BE',
        date: '10 de Mar, 2024',
        desc: 'ta nas trend o shounen ai eu gosto',
        capa: 'https://i.pinimg.com/564x/b9/bf/3f/b9bf3fe65580574e057192d65aff7c80.jpg',
        mangas_ids: [{"id":"moto-sekai-1-i-no-sub-chara-ikusei-nikki-hai-player-isekai-wo-kouryakuchuu","name":"Moto Sekai 1-i no Sub-Chara Ikusei Nikki: Hai Player, Isekai wo Kouryakuchuu!","capa":"https://img.lermanga.org/M/moto-sekai-1-i-no-sub-chara-ikusei-nikki-hai-player-isekai-wo-kouryakuchuu/capa.jpg"},{"id":"monster-pet-evolution","name":"Monster Pet Evolution","capa":"https://img.lermanga.org/M/monster-pet-evolution/capa.jpg"},{"id":"i-log-in-alone","name":"I Log In Alone","capa":"https://img.lermanga.org/I/i-log-in-alone/capa.jpg"},{"id":"mo-shou-jian-sheng","name":"Mo Shou Jian Sheng","capa":"https://img.lermanga.org/M/mo-shou-jian-sheng/capa.jpg"},{"id":"kindan-shitei-de-breakthrough-yuusha-no-musuko-ga-maou-no-deshi-de-nani-ga-warui","name":"Kindan Shitei de Breakthrough ~ Yuusha no Musuko ga Maou no Deshi de Nani ga Warui ~","capa":"https://img.lermanga.org/K/kindan-shitei-de-breakthrough-yuusha-no-musuko-ga-maou-no-deshi-de-nani-ga-warui/capa.jpg"},{"id":"the-return-of-the-prodigious-swordmaster","name":"The Return of the Prodigious Swordmaster","capa":"https://img.lermanga.org/T/the-return-of-the-prodigious-swordmaster/capa.jpg"},{"id":"demon-slayer-kimetsu-no-yaiba","name":"Demon Slayer: Kimetsu no Yaiba","capa":"https://img.lermanga.org/K/kimetsu-no-yaiba/capa.jpg"},{"id":"jujutsu-kaisen","name":"Jujutsu Kaisen","capa":"https://img.lermanga.org/J/jujutsu-kaisen/capa.jpg"}]

    },
    
  ]

  export default stories


