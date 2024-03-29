'use client';
import React, { useState, useEffect } from 'react';
import { Column, Row, Title, Label, B, ButtonOff} from '../../themes/global';
import './account.css'
import { BsThreeDots } from "react-icons/bs";
import Image from 'next/image';
import { excludePreferences, getPreferences , dislikeAllManga} from '../../requests/user/requests';
import Modal from '../../components/Modal';
import { useRouter } from 'next/navigation'
import ListAccount from '../../components/Cards/list_account';

export default function Account() {

    const router = useRouter();
    const [step, setStep] = useState('progress');
    const [user, setUser] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => { 
        const getData = async () => {
            const response = await getPreferences()
            if(response){
                setUser(response)
                console.log(response)
            }
        }
        //dislikeAllManga()
        getData()
    }, []);

    const excludeProfile = () => {
        try {
           const response =  excludePreferences()
           if(response){
            router.push('/start');
          }
        }
        catch (error) {
            console.error('Error excluding profile ', error);
        }
    }

    return (
        <Column style={{overflow: 'auto', overflowX: 'hidden'}}>
            <Row style={{  alignItems: 'center', justifyContent: 'space-between', padding: 40,  position: 'relative',  backdropFilter: 'blur(20px)',}}>
                <Column style={{ backgroundImage: `url(${user?.capa})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed',backgroundPosition: 'center', position: 'absolute', top: 0, left: 0, }} className='bg'/>
                <Row>
                    <Image width={150} height={150} src={user?.avatar} style={{borderRadius:  300, background: '#505050', zIndex: 99, objectFit: 'cover', }} alt='avatar usuario' />
                    <Column style={{marginTop: 24, marginLeft: 24, marginBottom: 20, zIndex: 99,}}>
                        <Label style={{color: '#ED274A'}}>{user?.premium ? 'Premium' : ''}</Label>
                        <Title style={{fontSize: 52,  fontFamily: 'Black',}}>{user?.name}</Title>
                        <Label style={{fontSize: 22, color: "#f8f8f8"}}>{user?.bio}</Label>
                        <Label style={{fontSize: 16, marginTop: 10,}}>Entrou em {user?.date}</Label>
                    </Column>
                </Row>

                <BsThreeDots onClick={() => setModal(!modal)} style={{fontSize: 42, zIndex: 99, cursor: 'pointer', color: "#f7f7f7"}}/>
            </Row>
        <Column>
   
            <Row style={{margin: '0px 40px', marginTop: 60, marginBottom: 20,}}>
                <ButtonOff style={{backgroundColor: step == 'progress' ? '#fff' : '#404040', color: step == 'progress' ? '#000' : '#f6f6f6', }} onClick={() => setStep('progress')}>Em progresso</ButtonOff>
                <ButtonOff style={{backgroundColor: step == 'complete' ? '#fff' : '#404040', color: step == 'complete' ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep('complete')}>Concluídos</ButtonOff>
                <ButtonOff style={{backgroundColor: step == 'like' ? '#fff' : '#404040', color: step == 'like' ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep('like')}>Curtidos</ButtonOff>
                <ButtonOff style={{backgroundColor: step == 'follow' ? '#fff' : '#404040', color: step == 'follow' ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep('follow')}>Seguindo</ButtonOff>
            </Row>
           {step === 'progress' && <ListAccount data={user?.progress}/>}
           {step === 'complete' && <ListAccount data={user?.complete}/>}
           {step === 'like' && <ListAccount data={user?.likes}/>}
           {step === 'follow' && <ListAccount data={user?.follow}/>}
          {user?.likes?.length > 20 && <span className='btall'>Ver todos</span> }
        </Column>

            <Modal open={modal} setOpen={setModal} name='Configurações'>
                <Label style={{fontSize: 22, marginBottom: 10,}}>Geral</Label>
                <Column className='btsettings'>Preferências</Column>
                <Column className='btsettings'>Histórico</Column>
                <Column className='btsettings'>Sobre</Column>
                <Column className='btsettings'  onClick={excludeProfile} style={{color:'#fff', background: '#ED274A', alignSelf: 'flex-end'}}>Excluir perfil</Column>
            </Modal>

        </Column>
    )
}

/**
 * 

            <Row style={{margin: 44,}}>
                <Column className='card'>
                    <Row>
                        <Column>
                            <Label style={{textTransform: 'uppercase', letterSpacing: 1.4,}}>Seu plano</Label>
                            <Title style={{fontSize: 32,}}>Premium</Title>
                            <Label>Sua próxima cobrança será no dia <B>23/01/2024</B>, no valor de <B>R$ 4,99.</B></Label>
                            <Label style={{marginTop: 20, }}>Cartão Mastercard que termina com <B>3005</B></Label>
                        </Column>
                    </Row>
                </Column>

                <Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiEdit/>
                        </Title>
                        <Label style={{textAlign: 'center'}}>Editar Perfil</Label>
                    </Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiCreditCard1 />
                        </Title>
                        <Label style={{textAlign: 'center'}}>Atualizar Cartão</Label>
                    </Column>
                </Column>
            </Row>

            

            <Row style={{justifyContent: 'space-evenly', marginTop: 30, marginRight: 44, marginLeft: 44, marginBottom: 20,}}>
                <Title onClick={() => setStep('progress')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100, color: step === 'progress' ? '#fff' : '#909090', border: step === 'progress' ? '3px solid #fff' : '3px solid #404040' }}>Em progresso</Title> 
                <Title onClick={() => setStep('complete')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'complete' ? '#fff' : '#909090', border: step === 'complete' ? '3px solid #fff' : '3px solid #404040' }}>Completos</Title> 
                <Title onClick={() => setStep('like')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'like' ? '#fff' : '#909090', border: step === 'like' ? '3px solid #fff' : '3px solid #404040' }}>Curtidos</Title> 
                <Title onClick={() => setStep('follow')} style={{fontSize: 24, fontFamily: 'Medium', cursor: 'pointer', padding: '12px 20px', borderRadius: 100,  color: step === 'follow' ? '#fff' : '#909090', border: step === 'follow' ? '3px solid #fff' : '3px solid #404040' }}>Seguindo</Title> 
            </Row>
 */