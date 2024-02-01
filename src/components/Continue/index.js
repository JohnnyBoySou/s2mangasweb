'use client';
import React, {useState} from 'react';
import { Column, Row, Title, Label, ButtonOff, Button } from '../../themes/global';
import './continue.css'
import Image from 'next/image';
import Link from 'next/link';
export default function ContinueReading() {

    const [step, setStep] = useState(1);
    const [other, setOther] = useState(1);
    const data = {
        name: 'ZomGan',
        id: 'zomgan',
        capa: 'https://img.lermanga.org/Z/zomgan/capa.jpg',
        desc: 'Em um mundo onde todos lutam para viver, Onmirae, é o único garoto que quer a morte. Um dia, um grupo da morte apareceu na sua frente e lhe ofereceu uma proposta. "Vou matá-lo, mas antes, vamos reconstruir juntos a sociedade humana" Para morrer, você tem que salvar a to "Vou matá-lo, mas antes, vamos reconstruir juntos a sociedade humana" Para morrer, você tem que salvar a to...',
        categories: ['Ação', 'Artes Marciais', 'Adulto', 'Shounen'],
        chapters: 18,
        type: 'MANWHA',
        date: 2024,
        reaction: 'amei',
        progress: {
            chapters: [8, 9, 12, 13,   ],
            date: '20 de Fev, 2024',
            mark: [4, 6, 7, 8],
        }
    }


    const porcentage = (data.progress.chapters.length / data.chapters) * 100;
    const porcentage_not = 100 - porcentage;
    const last_read = data.progress.chapters[data.progress.chapters.length - 1];
    const markes = data.progress.mark.map((mark, index) => mark + (index === data.progress.mark.length - 1 ? '' : ', #'))
    const chapters_reads = data.progress.chapters.length;
    const chapters = data.chapters;

    const chapters_next = Array.from({ length: chapters - last_read - 1 }, (_, index) => last_read + index + 1);

    const reaction = data.reaction === 'amei' ? 'https://em-content.zobj.net/source/samsung/380/smiling-face-with-heart-eyes_1f60d.png' : data.reaction === 'gostei' ? 'https://em-content.zobj.net/source/microsoft/379/smiling-face-with-smiling-eyes_1f60a.png' : data.reaction === 'odiei' ? 'https://em-content.zobj.net/source/microsoft/379/skull_1f480.png' : 'https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png';
    const reaction_color = data.reaction === 'amei' ? '#FFC4A3' : data.reaction === 'gostei' ? '#B5FFBC' : data.reaction === 'odiei' ? '#1D1A39' : '#FFFFCA';
    return (
        <Column style={{padding: 44, alignSelf: 'center',}}>
            <Row>
                <Column style={{position: 'relative', marginLeft: 60, marginRight: 100,}}>
                    <Image src={data.capa} alt={data.name} width={330} height={520} style={{borderRadius: 12, zIndex: 2, objectFit: 'cover'}}/>
                    <Image src='/brush.png' alt={data.name} width={660} height={740} style={{borderRadius: 8, position: 'absolute', zIndex: 0, top: -50, alignSelf: 'center',}}/>
                </Column>


                <Row style={{zIndex: 99,}}>
                    <Column style={{marginRight: 20, width: 500,}}>
                        <Title style={{letterSpacing: 2, marginBottom: 10,}}>SOBRE</Title>
                        <Column className='cd' style={{}}>
                            <Title style={{marginBottom: 10,}}>{data?.name}</Title>
                            <Label>
                                {data?.desc.slice(0, 300)}...
                                <br/>
                                <br/>
                                Lançado em {data?.date}
                            </Label>
                        </Column>

                        <Title style={{letterSpacing: 2, marginBottom: 10, marginTop: 30,}}>OUTROS</Title>
                        
                        <Column className='cd' style={{}}>
                        <Row style={{margin: '10px 0px'}}>
                            <ButtonOff style={{backgroundColor: other == 1 ? '#fff' : '#404040', color: other == 1 ? '#000' : '#f6f6f6', }} onClick={() => setOther(1)}>Similares</ButtonOff>
                            <ButtonOff style={{backgroundColor: other == 2 ? '#fff' : '#404040', color: other == 2 ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setOther(2)}>Categorias</ButtonOff>
                        </Row>
                        </Column>


                    </Column>

                    <Column>
                        <Title style={{letterSpacing: 2, marginBottom: 10,}}>PROGRESSO</Title>
                        <Column className='cd'>
                            <Row>
                                <Column>
                                <Label style={{fontSize: 14, marginBottom: 10, marginTop: 10, background: '#FFC4A3', color: "#000", borderRadius:100, padding: '6px 10px', alignSelf: 'flex-start',  }}>EM PROGRESSO</Label>
                                <Title>Você já leu {chapters_reads} de {chapters}<br/> capítulos desse mangá!</Title>
                                <Label>
                                    <br/> Último lido: #{last_read}.
                                    <br/> Com marcadores: {markes}.
                                    <br/> Começou a ler em {data.progress.date}.
                                </Label>

                                <Row style={{width: 300, marginTop: 20,}}>
                                    <Column style={{height: 10, borderRadius: 100, width: porcentage.toFixed() + '%', background: '#B5FFBC'}}/>
                                    <Column style={{height: 10, borderRadius: 100, flexGrow: 1,  background: '#505050', marginLeft: 8,}}/>
                                </Row>
                                <Row style={{width: 300, marginTop: 10, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{color: '#B5FFBC'}}>Completo {porcentage.toFixed(0)}%</Label>
                                    <Label style={{color: '#808080'}}>Falta {porcentage_not.toFixed(0)}%</Label>
                                </Row>
                                </Column>
                                <Column style={{justifyContent: 'center', alignItems: 'center', marginLeft: 30,}}>
                                <Title style={{fontSize: 18, marginBottom: 10,}}>Sua reação</Title>
                                    <Column style={{padding: 34, marginBottom: 10, borderRadius: 32, background: reaction_color, }}>
                                        <Image src={reaction} alt='reaction manga' width={64} height={64} className='emoji'/>
                                    </Column>
                                    <Label style={{color: reaction_color, }}>{data?.reaction}</Label>
                                </Column>   

                            </Row>
                       
                        </Column>
                        
                        <Title style={{letterSpacing: 2, marginBottom: 10, marginTop: 30,}}>CAPÍTULOS</Title>
                        <Column className='cd' >
                        <Row style={{margin: '10px 0px'}}>
                            <ButtonOff style={{backgroundColor: step == 1 ? '#fff' : '#404040', color: step == 1 ? '#000' : '#f6f6f6', }} onClick={() => setStep(1)}>Próximos</ButtonOff>
                            <ButtonOff style={{backgroundColor: step == 2 ? '#fff' : '#404040', color: step == 2 ? '#000' : '#f6f6f6', marginLeft: 15,}} onClick={() => setStep(2)}>Com marcador</ButtonOff>
                        </Row>
                        
                        {step == 1 ? (
                            <Row style={{flexWrap: 'wrap', marginTop: 10, marginBottom: 20, width: 480, justifyContent: 'center', alignItems: 'center',  }}>
                                {chapters_next.map((mark, index) => (
                                    <Column className='icon_link' key={index}>
                                        <Link
                                            href={`/manga/${data.id}/${mark}`}
                                            style={{ textDecoration: 'none' }}
                                            className='link_chapter'
                                        >  #{mark}
                                        </Link>
                                    </Column>

                                ))}
                            </Row>
                        ) : (
                            <Row style={{flexWrap: 'wrap', marginTop: 10, marginBottom: 20, width: 480, justifyContent: 'center', alignItems: 'center',  }}>
                                {data.progress.mark.map((mark, index) => (
                                      <Column className='icon_link' key={index}>
                                    <Link
                                        key={index}
                                        href={`/manga/${data.id}/${mark}`}
                                        style={{ textDecoration: 'none' }}
                                        className='link_chapter'
                                    >
                                        #{mark}
                                    </Link>
                                    </Column>

                                ))}
                            </Row>
                        )}
                        </Column>
                    </Column>


                </Row>

            </Row>
        </Column>
    )
}