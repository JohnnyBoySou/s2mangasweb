'use client';
import React, { useState } from 'react';
import { GoHome, GoSearch } from "react-icons/go";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Column, BTIcon, Button, Row, Title, Label} from '../../themes/global';

import { BsCollection } from "react-icons/bs";
import { usePathname } from "next/navigation";
import ListCollections from '../Collections/listtab';
import Link from 'next/link'
import { IoAddOutline, IoArrowForward  } from "react-icons/io5";


export default function Header(){
    const pathname = usePathname();
   // if (pathname == "/register" || "/login") {
     //   return <></>;
   // }

   const [openTab, setOpenTab] = useState(true);
    return(
        <Column style={{padding: 12, height: '100vh', width: openTab ? '320px' : '76px', transition: '.2s linear'}}>
            <Column style={{backgroundColor: "#262626", borderRadius: 8,}}>
                <Row style={{ alignItems: 'center', }}>
                    <Link href="/home"> <BTIcon><GoHome/></BTIcon> </Link>
                    {openTab && <Title>Home</Title> }
                </Row>
                <Row style={{ alignItems: 'center', }}>
                    <Link href="/search"> <BTIcon><GoSearch/></BTIcon>  </Link>   
                    {openTab && <Title>Pesquisar</Title> }
                </Row>
                <Row style={{ alignItems: 'center', }}>
                    <Link href="/cards"> <BTIcon><TbCards /></BTIcon></Link>  
                    {openTab && <Title>Cards</Title> }
                </Row>

                <Row style={{ alignItems: 'center', }}>
                    <Link href="/account"> <BTIcon><CgProfile /></BTIcon></Link>
                    {openTab && <Title>Conta</Title> }
                </Row>
            </Column>
            <Row style={{ marginBottom: -15, marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingRight: 5, }}>
                <Row style={{ alignItems: 'center', }}>
                    <Button onClick={() => setOpenTab(!openTab)} style={{ marginLeft: -10, marginRight: -20,}}>
                        <Row>
                            <BTIcon><BsCollection/></BTIcon> 
                        </Row>
                    </Button>
                    {openTab && <Label style={{fontSize: 18, marginTop: -4, marginLeft: 10,}}>Coleções</Label>}
                </Row>
                {openTab && 
                <Row>
                    <Row>
                        <Button style={{fontSize: 22, color: '#fff', width: 36, height: 36, textAlign: 'center', borderRadius: 100, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', }}>
                            <IoAddOutline  style={{marginTop: 5,}}/>
                        </Button>
                        <Link href={"./collections"} style={{fontSize: 22, color: '#fff', width: 36, textAlign: 'center', height: 36, marginLeft: 10, borderRadius: 100, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', }}>
                            <IoArrowForward  style={{marginTop: 5,}}/>
                        </Link>

                    </Row>
                </Row>}
            </Row>
            <ListCollections open={openTab}/>
        </Column>
)}