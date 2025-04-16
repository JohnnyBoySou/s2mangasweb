'use client';
import React, { useRef, useEffect, useState } from "react"
import Image from 'next/image'
import { Column, Row, Label, Title, Button, Skeleton } from '@/ui'
import './feed.css';
import { useAuth } from '@/hooks/useAuth';

export default function Feed() {
  const { user, loading } = useAuth()
  console.log(user)
  const saudacao = new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite';
  if (loading) {
    return (
      <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Skeleton width={300} height={300} radius={1000} top={140} />
        <Skeleton width={500} height={70} radius={12} top={50} />
        <Skeleton width={700} height={100} radius={12} top={20} bottom={70} />
        <Row>
          <Skeleton width={240} height={300} radius={12} />
          <Skeleton width={240} height={300} radius={12} left={30} />
          <Skeleton width={240} height={300} radius={12} left={30} right={30} />
          <Skeleton width={240} height={300} radius={12} />
        </Row>
      </Column>
    )
  }

  return (
    <Column style={{ overflowY: 'visible', overflowX: 'hidden', background: `radial-gradient(circle, #202020, #171717)`, }} >
      <Column style={{ borderRadius: 12, flexGrow: 1, margin: 20, marginTop: 0, paddingBottom: 0, width: 900, alignSelf: 'center', }} >
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginLeft: -50, marginRight: -50, }}>
          <Column className='circle' />
          <Column className='circle2' />
        </Row>
        <Column style={{ margin: '0px 60px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image src={user?.avatar} alt="avatar" className="fadeInUp profile" width={200} height={200} style={{ borderRadius: 100, objectFit: 'cover', alignSelf: 'center', border: '4px solid #fff', marginBottom: 20, }} />
          <Column>
            <Title style={{ fontSize: 54, lineHeight: 1, textAlign: 'center' }}>{saudacao}</Title>
            <Row style={{}}>
              <Image src="/star.png" alt="start" width={42} height={42} className='star' style={{ marginRight: -20, marginTop: -10, }} />
              <span className="gradient">{user?.name}</span>
              <Image src="/north.png" alt="north" className='star' width={42} height={42} style={{ marginLeft: -10, marginTop: 60, }} />
            </Row>
          </Column>
        </Column>
        <Column style={{ padding: 60, paddingTop: 0, }} />
      </Column>
    </Column>
  )
}
