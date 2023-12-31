'use client';
import React from 'react';
//icones
import { GoHome, GoSearch } from "react-icons/go";
import { TbCards } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Column, BTIcon, } from '../../themes/global';



//components
import ListCollections from '../Collections/listtab';
import Link from 'next/link'


export default function Header(){
    return(
        <Column style={{padding: 12, }}>
            <Column style={{backgroundColor: "#262626", borderRadius: 8,}}>
                <Link href="/home"> <BTIcon><GoHome/></BTIcon></Link>
                <Link href="/search"> <BTIcon><GoSearch/></BTIcon> </Link>   
                <Link href="/cards"> <BTIcon><TbCards /></BTIcon> </Link>  
                <Link href="/account"> <BTIcon><CgProfile /></BTIcon>    </Link>
            </Column>
            <ListCollections/>
        </Column>
)}