import React from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';

import comments from '../../requests/comments/request';
import Image from 'next/image';
import './style.css';
import { GoStarFill, GoStar } from "react-icons/go";
import Comments from '.';

export default function CommentsComponent ({ id, name }){

return(
    <Column>
        <Title style={{fontSize: 42, fontFamily: 'Bold', marginTop: 30, }}>Comentários</Title>
        <Label style={{marginBottom: 20,}}>O que estão comentando sobre {name}</Label>
        <Comments id={id}/>
    </Column>
)}