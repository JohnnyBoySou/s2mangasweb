'use client';
import React from 'react';
import { Column, Row, Title, Label, ButtonOff } from '../../themes/global';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { LuBell } from "react-icons/lu";
import Link from 'next/link'
import './nav.css';

export default function NavBar (){
    const nextPage = () => {
        const lastVisitedPage = window.location.pathname;
        window.location.href = lastVisitedPage;
    }
    const previusPage = () => {
        window.history.back();
    }
    
    return(
    <Row className="nav"  style={{ borderRadius: '12px 12px 4px 4px', }} >
        <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
            <ButtonOff onClick={previusPage} style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                <FiArrowLeft style={{marginTop: 6,}}/>
            </ButtonOff>
            <ButtonOff onClick={nextPage} style={{width: 44, height: 44, marginLeft: 10, justifyContent: 'center', alignItems: 'center', fontSize: 26, textAlign: 'center', backgroundColor: '#50505090' , padding: 0,}}>
                      <FiArrowRight style={{marginTop: 6,}}/>
            </ButtonOff>
            <Link href="/news">
                <ButtonOff style={{background: "#40404090", marginLeft: 20, width: 44, height: 44, borderRadius: 100, padding: 0, justifyContent: 'center', alignItems: 'center', }}>
                    <LuBell/>
                </ButtonOff>
            </Link> 
        </Row>
    </Row>
)}