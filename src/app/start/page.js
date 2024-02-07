'use client';
import React, { useState, useEffect } from 'react';
import { Column, Row, Title, Label,  ButtonOff, Button, ButtonPrimary} from '../../themes/global';
import './gradient.css'
import Image from 'next/image'
import { geral } from '../../requests/shop/avatars';
import { geralbg } from '../../requests/shop/capas';
import { createPreferences, getPreferences } from '../../requests/user/requests';
import { useRouter } from 'next/navigation'
import Skeleton from '../../components/Loading';

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import tags from '../../requests/categories/tags';

export default function Start (){

    const router = useRouter();
            useEffect(() => { 
                    const getData = async () => {
                        const response = await getPreferences()
                        console.log(response)
                        if(response.length > 0){
                            router.push('/home');
                        }
                    }
                getData()
            }, []);


            const CategoryList = ({ item, index }) => {
                const addCategoria = () => { if (categorias.includes(item)) { setCategorias(categorias.filter(cat => cat !== item)); } else { setCategorias([...categorias, item]); } }
                return(
                <Column onClick={addCategoria} key={index} style={{ width: 200, cursor: 'pointer', margin: 10, borderRadius: 12, height: 240, backgroundColor: item?.color, overflow: 'hidden', padding: 6, opacity: categorias.includes(item) ? 0.2 : 1 }}>
                          <Title style={{fontSize: 24, margin: 10,}}>{item.name}</Title>
                            <Image className='image_poster' width={100} height={160} alt={item.name} src={item?.img} />
                        </Column>
                )
              }

              
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const stepLabel = step === 1 ? "Nome e Bio" : step === 2 ? "Avatar" : step === 3 ? "Capa" : "Categorias";
    const stepTotal = 4;
    const stepPorcentage = (step * 100) / stepTotal;


    const backStep = () => {
        if(step === 1){setStep(0)
        }else if(step === 2){
        setStep(1)
        }else if(step === 3){
        setStep(2)
        }else if(step === 4){
        setStep(3)
    }
    }

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState();
    const [capa, setCapa] = useState();
    const [categorias, setCategorias] = useState([]);
    function formatarData(data) {  const meses = [  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ];  const dia = data.getDate();const mes = meses[data.getMonth()];const ano = data.getFullYear();  return `${dia} de ${mes}, ${ano}`;}
   

    const createtUser = async () => {
        const user = {
            name: name,
            bio: bio,
            avatar: avatar,
            coins: 1000,
            diamonds: 10,
            capa: capa,
            genres: categorias,
            premium: false,
            likes: [
                {
                    name: 'Naruto',
                    id: 'naruto',
                    capa: 'https://img.lermanga.org/N/naruto/capa.jpg',
                },
                {
                    name: 'One Piece',
                    id: 'one-piece',
                    capa: 'https://img.lermanga.org/O/one-piece/capa.jpg',
                },
                {
                    name: 'Jujutsu Kaisen',
                    id: 'jujutsu-kaisen',
                    capa: 'https://img.lermanga.org/J/jujutsu-kaisen/capa.jpg',
                }
            ],
            progress: [
                {
                    name: 'Naruto',
                    id: 'naruto',
                    capa: 'https://img.lermanga.org/N/naruto/capa.jpg',
                },
                {
                    name: 'One Piece',
                    id: 'one-piece',
                    capa: 'https://img.lermanga.org/O/one-piece/capa.jpg',
                },
            ],
            follow: [
                {
                    name: 'Naruto',
                    id: 'naruto',
                    capa: 'https://img.lermanga.org/N/naruto/capa.jpg',
                },
                {
                    name: 'Jujutsu Kaisen',
                    id: 'jujutsu-kaisen',
                    capa: 'https://img.lermanga.org/J/jujutsu-kaisen/capa.jpg',
                }  
            ],
            complete: [
                {
                    name: 'Jujutsu Kaisen',
                    id: 'jujutsu-kaisen',
                    capa: 'https://img.lermanga.org/J/jujutsu-kaisen/capa.jpg',
                }  
            ],
            date: formatarData(new Date()),
        }
        try {
          const response = createPreferences(user)
          if(response){
            router.push('/home');
          }
        } catch (error) {
          console.log(error)
        }
      }
  
    


    if(loading){
        return(
            <Column style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Skeleton width={400} height={70} top={100}/>
                <Skeleton width={500} height={140} top={30}/>
            </Column>
        )
    }else{

    return(
        <Column  style={{ overflowX: 'hidden', padding: 44, borderRadius: 8, flexGrow: 1, background: `radial-gradient(circle, #262626, #121212)`,  }}>


        {step >= 1 && 
        <Column style={{ maxWidth: 600, alignSelf: 'center', marginBottom: 30,}}>

        <Column style={{width: 500, height: 10, backgroundColor: '#404040', borderRadius: 100, marginBottom: 10, alignSelf: 'center'}}>
            <Column style={{width: stepPorcentage, height: 10, backgroundColor: "#ED274A", borderRadius: 100,}}/>
        </Column>


        <Row style={{alignItems: 'center'}}>
            <ButtonOff onClick={backStep}  style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowLeft style={{marginTop: 6,}}/>
            </ButtonOff>
            <Column style={{marginLeft: 15,}}>
                <Label>Etapa {step} de 4</Label>
                <Label style={{fontSize: 24, color: "#fff", marginTop: 2, fontFamily: 'Medium',}}>{stepLabel}</Label>
            </Column>
        </Row>

        </Column>
        }




        {step == 0 && <Column style={{justifyContent: 'center', alignItems: 'center', marginTop: 100,}}>
            <Row>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
                <Column className='cardoff' style={{width: 100, height: 220, marginLeft: 20, marginRight: 20,}}/>
                <Column className='card_grad' style={{width: 100, height: 220,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 220,}}/>
            </Row>
            <Row style={{marginBottom: 60, marginTop: 20,}}>
                <Column className='cardoff' style={{width: 100, height: 20,  marginRight: 20}}/>
                <Column className='cardoff' style={{width: 100, height: 20,}}/>
                <Column className='card_grad' style={{width: 100, height: 20, marginLeft: 20, marginRight: 20,}}/>
                <Column className='cardoff' style={{width: 100, height: 20,}}/>
            </Row>


            <Row>
                <Title style={{fontSize: 72, fontFamily: 'Book', textAlign: 'center', marginTop: 10,}}>Bem vindo ao </Title>
                <Row>
                    <Image src="/star.png" alt="start" width={42} height={42} className='star' style={{marginRight: -20, marginTop: -10,}}/>
                    <h1 className='gradient'>S2mangás.</h1>
                    <Image src="/north.png" alt="north"  className='star' width={42} height={42} style={{marginLeft: -10, marginTop: 60,}}/>
                </Row>
            </Row>
            <Title style={{fontFamily: 'Book', color: "#d8d8d8", }}>Um leitor de mangás completo. Simples, interativo e rápido.</Title>
            <Row style={{marginTop: 50,}} >
            <Column  className='btgo' onClick={() => setStep(1)} >
                <span>Começar agora</span>
            </Column>

            <Column className='btof'>
                <span>Ver funções</span>
            </Column>
          
            </Row>
            </Column>}

            {step == 1 && 
            <Column style={{justifyContent: 'center', maxWidth: 1300, alignSelf: 'center',}}>
            
            <Title style={{marginTop: 10,}}>Nome</Title>
            <Label>Este nome aparecerá no seu perfil.</Label>
            <input
                        value={name}
                        className='search_input'
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Nome ou Apelido"
                    />


            <Title style={{marginTop: 10,}}>Bio</Title>
            <Label>Escreva um pouco sobre você. </Label>
            <input
                        value={bio}
                        className='search_input'
                        onChange={e => setBio(e.target.value)}
                        type="text"
                        placeholder="Bio ou breve descrição"
                    />

            {name.length > 1 && bio.length > 1 && <ButtonPrimary className='fadeInUp' onClick={() => setStep(2)} style={{marginTop: 20, paddingTop: 15, paddingBottom: 15,}}>Continuar</ButtonPrimary>}
            </Column>}

            {step == 2 && <Column style={{justifyContent: 'center', alignItems: 'center', maxWidth: 1300, alignSelf: 'center',}}>
                 
                    <Column style={{padding: 42,}}  className="fadeInLeft">
                    <Title style={{fontSize: 32,}}>Avatar</Title>
                    <Label>Escolha sua foto de perfil.</Label>
                    <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                    {geral.map((item, index) => (
                    <Image
                    src={item}
                    key={index}
                    width={124}
                    height={124}
                    onClick={() => setAvatar(item)}
                    alt=""
                    style={{
                        objectFit: "cover", 
                        borderWidth: 4,
                        transition: 'linear .2s',
                        cursor: 'pointer',
                        transform: `scale(${avatar === item ? 1.1 : 1})`,
                        borderColor: avatar === item ? "#ED274A" : '#00000000',
                        borderStyle: 'solid',
                        borderRadius: 100, margin: 4,}}
                        loading="lazy"
                        />
                    ))}
                    </Row>
                    {avatar?.length > 1 && <ButtonPrimary className='fadeInUp' onClick={() => setStep(3)} style={{marginTop: 20, paddingTop: 15, paddingBottom: 15,}}>Continuar</ButtonPrimary>}
           
                    </Column> 
                </Column>}


                {step == 3 && <Column style={{justifyContent: 'center', alignItems: 'center', maxWidth: 1300, alignSelf: 'center',}}>
                    
                    <Column style={{padding: 42,}}  className="fadeInLeft">
                    <Title style={{fontSize: 32,}}>Capa</Title>
                    <Label>Escolha uma capa que combine com você.</Label>
                    <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                    {geralbg.map((item, index) => (
                    <Image
                    src={item}
                    key={index}
                    width={200}
                    height={100}
                    onClick={() => setCapa(item)}
                    alt=""
                    style={{
                        objectFit: "cover", 
                        borderWidth: 4,
                        transition: 'linear .2s',
                        cursor: 'pointer',
                        transform: `scale(${capa === item ? 1.1 : 1})`,
                        borderColor: capa === item ? "#ED274A" : '#00000000',
                        borderStyle: 'solid',
                        borderRadius: 12, margin: 4,}}
                        loading="lazy"
                        />
                    ))}
                </Row>
                {capa?.length > 1 && <ButtonPrimary className='fadeInUp' onClick={() => setStep(4)} style={{marginTop: 20, paddingTop: 15, paddingBottom: 15,}}>Continuar</ButtonPrimary>}
           
          </Column>  
            </Column>}


        {step == 4 && <Column style={{justifyContent: 'center', maxWidth: 1300, alignSelf: 'center',}}>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                
            <Column>
            <Row style={{alignItems: 'center'}}>
                <Title style={{marginTop: 10, marginRight: 20,}}>Genêros</Title>
                {categorias.map((item, index) => <Label key={index} style={{margin: 4, padding: '10px 20px', backgroundColor: item.color+90, color: "#fff", borderRadius: 120,}}>{item.name}</Label>)}
            </Row>
            <Label>Selecione seus favoritos para receber recomendações personalizadas. No mínimo 3 categorias.</Label>
            </Column>
            {categorias.length >= 3 && <ButtonPrimary className='fadeInUp' onClick={createtUser} style={{marginTop: 20, paddingTop: 15, paddingBottom: 15,}}>Continuar</ButtonPrimary>}
            </Row>
            <Row style={{flexWrap: 'wrap', marginTop: 10,}}>
            {tags.map((item, index) => <CategoryList  index={index} key={index} item={item} />)}
            </Row>
            </Column>}

      </Column>
    )}}

    /*<Link href={`/login`} >
    <ButtonOff style={{marginLeft: 15,}}>Entrar</ButtonOff>
    </Link>
        <Title style={{fontFamily: 'Book', fontSize: 20, marginTop: 20,}}>✷ COLEÇÕES ✷ CARDS ✷ CURTIR ✷ SEGUIR ✷ AVATAR ✷ CAPA ✷ MIX ✷ </Title>
    
           <Column  style={{justifyContent: 'center', alignItems: 'center', border: '2px dashed #303030', padding: 20, borderRadius: 12,}}>
                        <Column className='cardoff' style={{borderRadius: 12, width: 240, height: 130, padding: 0,}}/>
                        <Column className='card_grad' style={{borderRadius: 100, marginTop: -50, zIndex: 99, width: 106, height: 106, padding: 0,}}/>
                        <Title style={{marginTop: 10,}}>Avatar</Title>
                        <Label style={{fontSize: 18, textAlign: 'center',}}>Você pode comprar avatares novos na lojinha. Atualizada semanalmente!</Label>
                    </Column>
                    <Column  style={{justifyContent: 'center', alignItems: 'center', border: '2px dashed #303030', padding: 20, borderRadius: 12,}}>
                        <Column className='card_grad' style={{borderRadius: 12, width: 240, height: 130, padding: 0,}}/>
                        <Column className='cardoff' style={{borderRadius: 100, marginTop: -50, zIndex: 99, width: 106, height: 106, padding: 0,}}/>
                        <Title style={{marginTop: 10,}}>Avatar</Title>
                        <Label style={{fontSize: 18, textAlign: 'center',}}>Você pode comprar avatares novos na lojinha. Atualizada semanalmente!</Label>
                    </Column>
    */

