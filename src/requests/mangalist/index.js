const stories = [
    {
        id: 1,
        video: 'https://v1.pinimg.com/videos/mc/720p/e8/2f/38/e82f38964d6e4b15c99e26077522f1e1.mp4',
        name: 'só quero relaxar', 
        type: 'stories',
        short: 'Spy x Family',
        color: '#FF9FEF',
        desc: 'só quero relaxar com meu mangázin nesse fim de tarde',
        date: '30 de Mar, 2024',
        capa: 'https://i.pinimg.com/736x/e3/8a/7e/e38a7ed48d141dec2d6b680a35bd0039.jpg',
        mangas_ids: ['spy-x-family', 'kobayashi-san-chi-no-maid-dragon-kanna-no-nichijou', 'shiro-seijo-to-kuro-bokushi', 'ookiku-nattara-kekkon-suru', 'auto-hunting-with-clones', 'tokyo-aliens', 'character-na-kang-lim' ]
    },
    {   
        id: 2,
        video: 'https://v1.pinimg.com/videos/mc/720p/79/36/3b/79363bd4f0a51a3df6be150eb3fe8218.mp4',
        short: 'Tate no Yuusha - AMV',
        name: 'o prota vai sofrer?',
        type: 'stories',
        color: "#076C45",
        date: '24 de Mar, 2024',
        desc: 'será que o prota vai sofrer? ou vai ser só mais um isekai de sucesso? só lendo pra saber.',
        capa: 'https://i.pinimg.com/736x/59/35/71/5935717b4bd37013de13790fa3cf5701.jpg',
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
        name: 'Go gym',
        type: 'stories',
        date: '12 de Mar, 2024',
        color: '#1D063D',
        desc: 'go gym, vamos vamos não perde o ritmo mais uma repetição',
        capa: 'https://i.pinimg.com/736x/4c/31/12/4c3112664553458860bc902b33936602.jpg',
        mangas_ids: [{"id":"mashle","name":"Mashle","capa":"https://img.lermanga.org/M/mashle/capa.jpg"},{"id":"undead-unluck","name":"Undead Unluck","capa":"https://img.lermanga.org/U/undead-unluck/capa.jpg"},{"id":"jojos-bizarre-adventure-part-9---the-jojolands-colorido","name":"JoJo’s Bizarre Adventure Part 9 – The JoJoLands (Colorido)","capa":"https://img.lermanga.org/J/jojos-bizarre-adventure-part-9---the-jojolands-colorido/capa.jpg"},{"id":"to-not-die","name":"To Not Die","capa":"https://img.lermanga.org/T/to-not-die/capa.jpg"},{"id":"chiruran-shinsengumi-requiem","name":"Chiruran: Shinsengumi Requiem","capa":"https://img.lermanga.org/C/chiruran-shinsengumi-requiem/capa.jpg"}]
    },
    {   
        id: 4,
        video: 'https://v1.pinimg.com/videos/mc/720p/31/5a/87/315a8746f305880e2847b3e46d91ce00.mp4',
        short: 'Ijiranaide, Nagatoro-san',
        name: 'casalzão da po**',
        type: 'stories',
        color: '#8D0B9C',
        date: '06 de Mar, 2024',
        desc: 'romances para aquecer o coração e cair o queixo de tão lindos que são, só casalzão.',
        capa: 'https://i.pinimg.com/736x/b6/fb/91/b6fb913812c457880170b3d739f647c9.jpg',
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
    ], },

    {   
        id: 5,
        video: 'https://v1.pinimg.com/videos/mc/720p/31/5a/87/315a8746f305880e2847b3e46d91ce00.mp4',
        short: 'Ijiranaide, Nagatoro-san',
        name: 'shounen no hype',
        type: 'post',
        color: '#C61664',
        date: '10 de Mar, 2024',
        desc: 'shounen ta na moda e no hype, e eu to amando isso, só vem mais e mais',
        capa: 'https://i.pinimg.com/736x/53/04/09/53040907621d3e859edbe7dec7a583a4.jpg',
        mangas_ids: [{"id":"moto-sekai-1-i-no-sub-chara-ikusei-nikki-hai-player-isekai-wo-kouryakuchuu","name":"Moto Sekai 1-i no Sub-Chara Ikusei Nikki: Hai Player, Isekai wo Kouryakuchuu!","capa":"https://img.lermanga.org/M/moto-sekai-1-i-no-sub-chara-ikusei-nikki-hai-player-isekai-wo-kouryakuchuu/capa.jpg"},{"id":"monster-pet-evolution","name":"Monster Pet Evolution","capa":"https://img.lermanga.org/M/monster-pet-evolution/capa.jpg"},{"id":"i-log-in-alone","name":"I Log In Alone","capa":"https://img.lermanga.org/I/i-log-in-alone/capa.jpg"},{"id":"mo-shou-jian-sheng","name":"Mo Shou Jian Sheng","capa":"https://img.lermanga.org/M/mo-shou-jian-sheng/capa.jpg"},{"id":"kindan-shitei-de-breakthrough-yuusha-no-musuko-ga-maou-no-deshi-de-nani-ga-warui","name":"Kindan Shitei de Breakthrough ~ Yuusha no Musuko ga Maou no Deshi de Nani ga Warui ~","capa":"https://img.lermanga.org/K/kindan-shitei-de-breakthrough-yuusha-no-musuko-ga-maou-no-deshi-de-nani-ga-warui/capa.jpg"},{"id":"the-return-of-the-prodigious-swordmaster","name":"The Return of the Prodigious Swordmaster","capa":"https://img.lermanga.org/T/the-return-of-the-prodigious-swordmaster/capa.jpg"},{"id":"demon-slayer-kimetsu-no-yaiba","name":"Demon Slayer: Kimetsu no Yaiba","capa":"https://img.lermanga.org/K/kimetsu-no-yaiba/capa.jpg"},{"id":"jujutsu-kaisen","name":"Jujutsu Kaisen","capa":"https://img.lermanga.org/J/jujutsu-kaisen/capa.jpg"}]

    },
    
  ]

  export default stories


