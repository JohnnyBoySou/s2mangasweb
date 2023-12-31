import React from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';
import Header from '../../components/Header';
import Fixed from '../../components/Fixed';

export default function FeedLayout ({children}){
    return(
    <Row>
        <Header/>
        {children}
        <Fixed/>
    </Row>
    )}