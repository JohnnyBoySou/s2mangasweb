const proxyUrl = '/api/proxy?url=';

const weekend = [
    {
        id: 'd90ea6cb-7bc3-4d80-8af0-28557e6c4e17',
        capa: `https://mangadex.org/covers/d90ea6cb-7bc3-4d80-8af0-28557e6c4e17/d885a28e-a5d3-4dc3-85e9-ca600f227b04.jpg.512.jpg`,
        name: 'Dungeon Meshi',
        score: '9.29',
        type: 'Mangá'
    },
    {
        id: 'c52b2ce3-7f95-469c-96b0-479524fb7a1a',
        capa: `https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/a112e575-4f11-48b2-83d8-28057ceecc4c.jpg.512.jpg`,
        name: 'Jujutsu Kaisen',
        score: '9.14',
        type: 'Mangá'
    },
    {
        id: '237d527f-adb5-420e-8e6e-b7dd006fbe47',
        capa: `https://mangadex.org/covers/237d527f-adb5-420e-8e6e-b7dd006fbe47/3af56897-f26d-4526-8b8d-d56b0da89e24.jpg.512.jpg`,
        name: 'Kaiju No. 8',
        score: '8.85',
        type: 'Mangá'
    },
    {
        id: '9eb78304-0436-484d-9a79-a925b45e2731',
        capa: `https://mangadex.org/covers/9eb78304-0436-484d-9a79-a925b45e2731/927da800-8445-4240-bfd2-ccd754a3e044.jpg.512.jpg`,
        name: 'Wind Breaker',
        score: '8.92',
        type: 'Mangá'
    },
    {
        id: 'e7eabe96-aa17-476f-b431-2497d5e9d060',
        capa: `https://mangadex.org/covers/e7eabe96-aa17-476f-b431-2497d5e9d060/f48d2c1f-c5a3-4e83-b6b4-8cb8b6912205.jpg.512.jpg`,
        name: 'Black Clover',
        score: '8.64',
        type: 'Mangá'
    },
    {
        id: '6b1eb93e-473a-4ab3-9922-1a66d2a29a4a',
        capa: `https://mangadex.org/covers/6b1eb93e-473a-4ab3-9922-1a66d2a29a4a/bb223226-a5ca-457b-8a10-ad3ecaea66be.jpg.512.jpg`,
        name: 'Naruto',
        score: '8.30',
        type: 'Mangá'
    },
    {
        id: '46e530ce-0766-4cbd-b005-5e6fb0ba5e71',
        capa: `https://mangadex.org/covers/46e530ce-0766-4cbd-b005-5e6fb0ba5e71/143198b5-58bd-49dd-b8d9-6060e8528e61.jpg.512.jpg`,
        name: 'Boruto: Naruto Next Generations',
        score: '6.56',
        type: 'Mangá'
    },
    {
        id: '827a3cbf-6859-4f71-906f-285596becb59',
        capa: `https://mangadex.org/covers/827a3cbf-6859-4f71-906f-285596becb59/01b322f1-6b49-4971-86f9-6e6b8f9bdea7.jpg.512.jpg`,
        name: 'Nido to Jidori Okutte Yannai!',
        score: '7.78',
        type: 'Mangá'
    },
    {
        id: 'c326cbf9-c81b-4ff5-9d77-dc549437fd4e',
        capa: `https://mangadex.org/covers/c326cbf9-c81b-4ff5-9d77-dc549437fd4e/3385f606-9a6a-43b2-a7d3-99df56ce121d.jpg.512.jpg`,
        name: 'Kimi ni Somaru Monochrome',
        score: '8.14',
        type: 'Mangá'
    },
    {
        id: '4509fd84-c003-4c57-ab07-e207e6999dab',
        capa: `https://mangadex.org/covers/4509fd84-c003-4c57-ab07-e207e6999dab/f6543ee0-f5fc-4266-aa25-585c2bb2d06f.jpg.512.jpg`,
        name: 'Issho ni Kurashite ii desu ka?',
        score: '7.77',
        type: 'Mangá'
    },
    {
        id: 'bbc06354-a4ab-4f44-bb0a-db2e3a58d57c',
        capa: `https://mangadex.org/covers/bbc06354-a4ab-4f44-bb0a-db2e3a58d57c/68a02bc5-51c3-409b-895f-e0b5f23ef65a.jpg.512.jpg`,
        name: 'Tsukushitagari na Uchi no Yome ni Tsuite Derete mo Ii ka',
        score: '7.43',
        type: 'Mangá'
    },
    {
        id: '7bf163e3-123a-41c1-b2bc-8254dbe5a09b',
        capa: `https://mangadex.org/covers/7bf163e3-123a-41c1-b2bc-8254dbe5a09b/99b807c0-0ace-4a75-846d-b6a225501e06.jpg.512.jpg`,
        name: '2.5 Dimensional Seduction',
        score: '8.37',
        type: 'Mangá'
    },
    {
        id: '05bd710c-d94a-45eb-be99-2109d58f1006',
        capa: `https://mangadex.org/covers/05bd710c-d94a-45eb-be99-2109d58f1006/b285b593-19c4-4fe0-96d1-1610635be45b.jpg.512.jpg`,
        name: 'Hajirau Kimi Ga Mitainda',
        score: '8.25',
        type: 'Mangá'
    },
    {
        id: '9dba8d1f-9fe7-48e7-9c1b-868ca4144068',
        capa: `https://mangadex.org/covers/9dba8d1f-9fe7-48e7-9c1b-868ca4144068/5013096f-f48a-4ee8-b848-ea09e3e8c3ed.jpg.512.jpg`,
        name: 'Strategic Lovers',
        score: '6.91',
        type: 'Mangá'
    },
    {
        id: 'ced562a0-6b49-478a-862b-e737e1f32f7a',
        capa: `https://mangadex.org/covers/ced562a0-6b49-478a-862b-e737e1f32f7a/c9ef8dff-846b-4073-b7e0-818f071e8cfe.jpg.512.jpg`,
        name: "I Don't Know if It's LOVE or MAGIC!",
        score: '7.16',
        type: 'Mangá'
    },
    {
        id: 'be2efc56-1669-4e42-9f27-3bd232bca8ea',
        capa: `https://mangadex.org/covers/be2efc56-1669-4e42-9f27-3bd232bca8ea/ce5a0bdb-da3c-419a-8620-ef22c5bd000d.jpg.512.jpg`,
        name: 'Ningen ni Koisuru Shinigami-chan',
        score: '8.42',
        type: 'Mangá'
        },
        {
        id: '0cfadedb-99cf-4fe5-b117-dc624da32225',
        capa: `https://mangadex.org/covers/0cfadedb-99cf-4fe5-b117-dc624da32225/0172b37a-cff6-4499-90a5-830765e99cf3.jpg.512.jpg`,
        name: 'Black Gakkou ni Tsutomete Shimatta Sensei',
        score: '7.54',
        type: 'Mangá'
        }
        ];
        
        export default weekend;
