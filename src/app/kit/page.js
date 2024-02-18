'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import {  Column, Row, Title, Label, } from './../../themes/global';
import Progress from '../../components/Kit/Progress';
import Check from '../../components/Kit/Check';
import Input from '../../components/Kit/input';

export default function Kit (){

    const [check, setCheck] = useState(false);
    const [value, setValue] = useState('a');
return(
<Column style={{padding: 60,}}>
    <Title>UI KIT {value}</Title>

    <Column>
        <Progress porcentage={12}/>
        <Check value={check} onClick={() => setCheck(!check)}/>
        <Input value={value} onClick={(value) => setValue(value)}/>
        
    </Column>
  
</Column>
)}