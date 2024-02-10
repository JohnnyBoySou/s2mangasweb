'use client';
import React, { useEffect, useState } from 'react';
import { Column, Row, Title, Label, ButtonOff } from '../../themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { LuBell } from "react-icons/lu";
import Link from 'next/link'
import './nav.css';
import { getPreferences } from '../../requests/user/requests';
import Image from 'next/image';
import { usePathname } from "next/navigation";


export default function NavBar (){
    const [user, setUser] = useState();
    const nextPage = () => {
        const lastVisitedPage = window.location.pathname;
        window.location.href = lastVisitedPage;
    }
    const previusPage = () => {
        window.history.back();
    }
    useEffect(() => {
        const getUser = () => {
            try {
              const response = getPreferences()
              setUser(response)
            } catch (error) {
              console.log(error)
            }
          }
          getUser()
    }, [])

    const pathname = usePathname();
   // if (pathname == "/register" || "/login") {
 //       return <></>;
  //  }
        return(
    <Row className="nav"  style={{ borderRadius: '12px 12px 4px 4px',justifyContent: 'space-between', alignItems: 'center',  zIndex: 99,}} >
        <Row>
            <ButtonOff onClick={previusPage} style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowLeft style={{marginTop: 6,}}/>
            </ButtonOff>
            <ButtonOff onClick={nextPage} style={{width: 44, height: 44, marginLeft: 10, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                      <FiArrowRight style={{marginTop: 6,}}/>
            </ButtonOff>
        </Row>
        <Row>
            <Link href="/novidades">
                <ButtonOff style={{background: "#40404090", justifyContent: 'center', fontSize: 20, alignItems: 'center',  marginLeft: 20, width: 44, height: 44, borderRadius: 100, padding: 0, justifyContent: 'center', alignItems: 'center', }}>
                    <LuBell style={{marginTop: 5,}}/>
                </ButtonOff>
            </Link> 
            <Link href="/account">
                    <Image src={user?.avatar} alt="user avatar" width={44} height={44} style={{ objectFit: 'cover', borderRadius: 100, marginLeft: 12, }}/>
            </Link> 
            </Row>
    </Row>
)}