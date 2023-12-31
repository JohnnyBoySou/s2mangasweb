'use client'
import React, {useState} from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';
import Header from '../../components/Header';
import Fixed from '../../components/Fixed';

export default function MangaLayout ({children}){

    const [fixe, setFixe] = useState(false);
    return(
    <Row>
        <Header/>
        {children}
        {fixe && <Fixed/> }
    </Row>
    )}