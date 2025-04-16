'use client';
import React, {useRef, useEffect, useState} from "react"
import Image from 'next/image'
import { Column, Row, Label, Title, ButtonPrimary, ButtonOff, Button} from 'old/themes/global'
import './feed.css';
import { useRouter } from 'next/navigation'
import Skeleton from "@components/Loading";

import NavBar from "@components/NavBar";
import LastedComponent from "@components/Home/Lasted";
import WeekendComponent from '@components/Home/Weekend/index';
import RateComponent from '@components/Home/Rate/index';
import Mangalists from "@components/Mangalist";
import { Search , Library } from "lucide-react"
import { useAuth } from '@/hooks/useAuth';

export default function SignUp () {
  const router = useRouter();
  const { user, login, logout, loading } = useAuth()

  return(
        <Column  style={{ overflowY: 'visible', overflowX:'hidden', background: `radial-gradient(circle, #202020, #171717)`,}} >
            <Column style={{ borderRadius: 12,  flexGrow: 1, margin: 20, marginTop: 0,paddingBottom: 0, width: 900, alignSelf: 'center',}} >

            <Row style={{justifyContent: 'space-between', alignItems: 'center', marginLeft: -50, marginRight: -50,}}>
              <Column className='circle' />
              <Column className='circle2' />
            </Row>
              <Column style={{padding: 60, paddingTop: 0,  }}/>
            </Column>
             
        </Column>
    )
}