'use client';
import React, { useState } from 'react';
import { GoHome, GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { Column, BTIcon, Button, Row, Title, Label } from '../../themes/global';
import './header.css'
import { BsCollection } from "react-icons/bs";
import ListCollections from '../Collections/listtab';
import Link from 'next/link'
import { IoGridOutline, IoArrowForward } from "react-icons/io5";
import Image from 'next/image';


export default function Header() {


    const [grid, setGrid] = useState(true);
    const [openTab, setOpenTab] = useState(false);


    return (
        <Column style={{ padding: 12, height: '100vh', width: openTab ? '400px' : '76px', transition: '.2s linear', }}>
            <Column style={{ backgroundColor: "#171717", borderRadius: 8, }}>
                <Row style={{ alignItems: 'center', }}  >
                    <BTIcon style={{ marginLeft: -5, }}><Image src="/icon.png" alt='logo s2mangas' width={42} height={36} style={{ objectFit: 'cover', }} /></BTIcon>
                    {openTab && <Title style={{ fontSize: 22, color: "#F6F6F690", fontFamily: 'Book' }}>Mangás</Title>}
                </Row>
                <Row style={{ alignItems: 'center', }}  >
                    <Link href="/home"><BTIcon><GoHome /></BTIcon> </Link>
                    {openTab && <Link href="/home" style={{ textDecoration: 'none', }}><Title style={{ fontSize: 22, color: "#F6F6F690", fontFamily: 'Book' }}>Início</Title></Link>}
                </Row>
                <Row style={{ alignItems: 'center', }}  >
                    <Link href="/search"> <BTIcon><GoSearch /></BTIcon>  </Link>
                    {openTab && <Link href="/search" style={{ textDecoration: 'none', }}> <Title style={{ fontSize: 22, color: "#F6F6F690", fontFamily: 'Book' }}>Pesquisar</Title></Link>}
                </Row>
                <Row style={{ alignItems: 'center', }} >
                    <Link href="/account"> <BTIcon><CgProfile /></BTIcon></Link>
                    {openTab && <Link href="/account" style={{ textDecoration: 'none', }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Title style={{ fontSize: 22, color: "#F6F6F690", fontFamily: 'Book' }}>Conta</Title>
                            <Label className='badge' style={{ fontSize: 14, color: '#f7f7f7' }}>Novo</Label>
                        </Row>
                    </Link>}
                </Row>

            </Column>
            <Row style={{ marginBottom: -15, marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingRight: 5, }}>
                <Row style={{ alignItems: 'center', }}>
                    <BTIcon onClick={() => {
                        if (openTab) { setOpenTab(false); setGrid(true) } else { setOpenTab(true) }
                    }} style={{ marginLeft: 0, marginRight: -20, }}><BsCollection /></BTIcon>
                    {openTab && <Label style={{ fontSize: 18, marginTop: -4, marginLeft: 10, }}>Coleções</Label>}
                </Row>
                {openTab &&
                    <Row>
                        <Row>
                            <Button onClick={() => setGrid(!grid)} style={{ fontSize: 18, color: grid ? '#fff' : '#000', width: 36, height: 36, textAlign: 'center', borderRadius: 100, transition: '.2s linear', backgroundColor: grid ? '#262626' : '#fff', justifyContent: 'center', alignItems: 'center', }}>
                                <IoGridOutline style={{ marginTop: 5, }} />
                            </Button>
                            <Link href={"/collections"} style={{ fontSize: 22, color: '#fff', width: 36, textAlign: 'center', height: 36, marginLeft: 10, borderRadius: 100, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', }}>
                                <IoArrowForward style={{ marginTop: 7, }} />
                            </Link>

                        </Row>
                    </Row>}
            </Row>
            <Column style={{ overflowY: 'auto', overflowX: 'hidden', borderRadius: 12, marginTop: 16, marginBottom: 30, }}>
                <ListCollections open={openTab} grid={grid} />
            </Column>
        </Column>
    )
}


/**
 *   <Row style={{ alignItems: 'center', }}  className='bar'>
                    <Link href="/cards"> <BTIcon><TbCards /></BTIcon></Link>  
                    {openTab && <Link href="/cards" style={{textDecoration: 'none',  flexDirection: 'row',}}>
                    <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                        <Title style={{fontSize: 22, color: "#F6F6F690", fontFamily: 'Book'}}>Cards</Title>
                        <Label className='badge' style={{fontSize: 14, color: '#f7f7f7'}}>Novos</Label>
                        </Row>
                    </Link>}
                </Row>

                <Row style={{ alignItems: 'center', }}  className='bar'>
                    <Link href="/account"> <BTIcon><CgProfile /></BTIcon></Link>
                    {openTab && <Link href="/account" style={{textDecoration: 'none',  }}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                            <Title style={{fontSize: 22, color: "#F6F6F690", fontFamily: 'Book'}}>Conta</Title>
                            <Label className='badge' style={{fontSize: 14, color: '#f7f7f7'}}>Novo</Label>
                        </Row>
                    </Link> }
                </Row>
 */