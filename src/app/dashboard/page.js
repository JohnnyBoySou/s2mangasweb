'use client';
import React, { useState } from 'react';
import { Column, Row, Title, Label, TextInput, SubInput, ButtonPrimary, ButtonOff, ButtonPrimaryLight, Button, } from '../../themes/global';
import Image from 'next/image'
import Skeleton from '../../components/Loading';

export default function Dashboard (){


    const values = {   
        id: 3,
        video: 'https://v1.pinimg.com/videos/mc/720p/eb/46/d8/eb46d895a130eb3da44ecfcbcff73992.mp4',
        short: 'Pokémon - Squirtle Dance',
        name: 'go gym',
        type: 'stories',
        desc: 'go gym, vamos vamos não perde o ritmo mais uma repetição',
        capa: 'https://i.pinimg.com/564x/32/75/e5/3275e5012006ba8211a88f3a4a6a56ad.jpg',
        manga_ids: [
            {name: 'Pokemon Especial', id: 'pokemon-special', capa: 'https'},
            {name: 'Pokemon Especial', id: 'pokemon-special', capa: 'https'},
            {name: 'Pokemon Especial', id: 'pokemon-special', capa: 'https'},
            ]
    }

    const [mangaList, setMangaList] = useState([]);
    const [mangas, setMangas] = useState({
        name: '',
        id: '',
        capa: '',
    });
        const [formData, setFormData] = useState({
          id: 0,
          video: '',
          short: '',
          name: '',
          type: '',
          desc: '',
          capa: '',
          date: '',
          manga_ids:'',
        });
       
        // Função para lidar com a mudança nos inputs
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };

         const handleChangeManga = (e) => {
            const { name, value } = e.target;
            setMangas({ ...mangas, [name]: value });
          };

          const addManga = () => {
            setMangaList([...mangaList, mangas])
            setMangas({
                name: '',
                id: '',
                capa: '',
            })
          }
          
          const raw = JSON.stringify(formData)

          const [step, setStep] = useState(1);

    return(
    <Column style={{padding: 42,}}>
        <Label style={{fontSize: 18, fontFamily: 'Book'}}>Dashboard  /  Mangalist  /  Criar</Label>
        <Title style={{marginBottom: 20, fontSize: 54, marginTop: 10,}}>Criando Mangálist</Title>

        <Row style={{marginBottom: 30,}}>
            <ButtonOff onClick={() => setStep(1)} style={{fontSize: 24, backgroundColor: step === 1 ? "#fff" : "#303030",  color: step === 1 ? "#000" : "#fff", }}>Sobre</ButtonOff>
            <ButtonOff onClick={() => setStep(2)} style={{fontSize: 24, backgroundColor: step === 2 ? "#fff" : "#303030",  color: step === 2 ? "#000" : "#fff", margin: '0px 20px', }}>Vídeo</ButtonOff>
            <ButtonOff onClick={() => setStep(3)} style={{fontSize: 24, backgroundColor: step === 3 ? "#fff" : "#303030",  color: step === 3 ? "#000" : "#fff", marginRight: 20,}}>Mangás</ButtonOff>
            <ButtonOff onClick={() => setStep(4)} style={{fontSize: 24, backgroundColor: step === 4 ? "#fff" : "#303030",  color: step === 4 ? "#000" : "#fff", }}>Código</ButtonOff>
        </Row>

        <Row style={{padding: 24, borderRadius: 12, backgroundColor: '#303030'}}>

       {step === 1 && <Column style={{}}>
        <Row>
            <Column>
                <SubInput>UID</SubInput>
                <TextInput name="id" value={formData.id} onChange={handleChange} />
            </Column>
            <Column style={{marginLeft: 20,}}>
                <SubInput>Nome</SubInput>
                <TextInput name="name" value={formData.name} onChange={handleChange} />
            </Column>
        </Row>
            <SubInput>Descrição</SubInput>
            <TextInput name="desc" value={formData.desc} onChange={handleChange}/>
        <Row>
            <Column>
                <SubInput>Capa URL</SubInput>
                <TextInput name="capa" value={formData.capa} onChange={handleChange}/>
            </Column>
            <Column style={{marginLeft: 20,}}>
                <SubInput>Date</SubInput>
                <TextInput placeholder='22 de Jan, 2024' name="date" value={formData.date} onChange={handleChange}/>
            </Column>
        </Row>
            <ButtonPrimary style={{marginTop: 10,}} >Gerar</ButtonPrimary>
        </Column>
         }

        {step === 2 &&  <Column style={{backgroundColor: "#404040", padding: 24, borderRadius: 12, marginRight: 10,}}>
            <Title>Video</Title>
            <video width="300" height="400" controls style={{backgroundColor: '#606060', borderRadius: 12, marginBottom: 10, marginTop: 10,}}>
                {formData.video.length > 1 && <source src={formData.video} type="video/mp4"/>}
            </video>
            <SubInput>URL</SubInput>
            <TextInput name='video' value={formData.video} onChange={handleChange}/>
            <SubInput>Descrição curta</SubInput>
            <TextInput name="short" value={formData.short} onChange={handleChange}/>
        </Column>}

        
        {step === 3 &&  <Column style={{padding: 24, backgroundColor: "#202020", padding: 24, borderRadius: 12, margin: '0px 20px', width: 400,}}>
            <Title>Mangás</Title>
               {mangas?.capa.length > 1 ? 
                <Image src={mangas.capa} width={240} height={320} alt={formData?.name} style={{backgroundColor: '#404040', borderRadius: 12, marginTop: 20, alignSelf: 'center', objectFit: 'cover',}}/>
               : <Column style={{width: 240, height: 320, borderRadius: 12, backgroundColor: "#303030", marginTop: 20, alignSelf: 'center'}}/> }
            <SubInput>ID</SubInput>
            <TextInput name="id" value={mangas.id} onChange={handleChangeManga} />
            <SubInput>Nome</SubInput>
            <TextInput name="name" value={mangas.name} onChange={handleChangeManga} />
            <SubInput>Capa</SubInput>
            <TextInput name="capa" value={mangas.capa} onChange={handleChangeManga} />

            <ButtonOff style={{marginTop: 20,}} onClick={addManga}>Adicionar Mangá</ButtonOff>
        </Column>}


        {step === 4 && <Column style={{padding: 24, border: '2px dashed #404040', borderRadius: 12, width: 400,}}>
            <Title>Código</Title>
            <Label style={{width: 400, wordBreak: 'break-all'}}>
                
            {raw.slice(0, -3)}
            
            [{mangaList.map((item, index) => (
            <Label key={index}>{JSON.stringify(item)},</Label>
            ))} ]{'}'}
            </Label>
        </Column>}

        </Row>

        <Row style={{justifyContent: 'space-between', margin: 20,}}>
            <ButtonOff>Anterior</ButtonOff>
            <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                <Label style={{marginRight: 10,}}>2 de 6 campos preenchidos</Label>
                {step < 4 && <ButtonPrimary onClick={() => setStep(step + 1)}>Próximo</ButtonPrimary>}
                {step === 4 && <ButtonPrimary>Salvar & Publicar</ButtonPrimary>}
            </Row>
        </Row>
        
    </Column>
    )}