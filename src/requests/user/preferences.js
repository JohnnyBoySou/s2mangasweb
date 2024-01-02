const User = {
    name: 'JohnnyBoy',
    genres: [{name: 'Ação', id: 'acao'}, {name: 'Artes Marciais', id: 'artes-marciais'}, {name: 'Adulto', id: 'adulto'}],
    email: '***',
    premium: true,
    avatar: 'https://i.pinimg.com/564x/d8/e1/be/d8e1be5e6a784c40f7dc02734007c67e.jpg',
    capa: 'https://i.pinimg.com/736x/7d/de/81/7dde81dbac1e8cf0883cee9cac615452.jpg',
    coins: 3200,
    diamonds: 20, 
    date: '20 de Jan, 2024',
    read: [
        {id: 1, chapters: [24,36,66,77,78,79], date: '12/02/2024', },
        {id: 2, chapters: [1,2,3,4,5,6,7,8,9,10], date: '17/02/2024',},
        {id: 4, chapters: [90,89,78,32,12,92], date: '22/03/2024',},
    ],
    likes: [1, 2, 3, 4, 5],
    complete: [
        {id: 5, date: '12/02/2024', },
        {id: 6, date: '12/02/2024', },
    ],
    collections: [
        {
            name: 'Meus Favoritos',
            icon: '✨',
            color: '#32a852',
            mangas_ids: [1253, 4413,],
            date: '24 de Fev, 2024'
        },
        {
            name: 'Natal',
            icon: '🎅',
            color: '#ff878f',
            mangas_ids: [1253, 4413, 5542, 4413, 5532, 5542, 4413, 5532,],
            date: '12 de Fev, 2024'
        },
        {
            name: 'Batmans',
            icon: '🦇',
            color: '#171213',
            mangas_ids: [1253, 4413, 5542, 4413, 5532, 5542, 4413, 5532, 5542, 4413, 5532,],
            date: '8 de Fev, 2023'
        },
    ],
    preferences: {
        horizontal: true,
        filterColor: true,
        color: "#303030",
    },
    marks: [
     {id: 1, url: 'https://i.pinimg.com/564x/75/69/3f/75693f65c4b47ab798e230f9788022cf.jpg', date: '20 de Jan, 2024', name: 'Gostei dessa página', } ,  
     {id: 2, url: 'https://i.pinimg.com/564x/80/5a/42/805a423d2e65b3304d082516a8fbbe4e.jpg', date: '20 de Jan, 2024', name: 'Gostei dessa página', }  , 
    ]
}
export default User