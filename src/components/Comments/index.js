import React from 'react';
import { Column, Row, Title, Label, } from '../../themes/global';

import comments from './../../requests/comments/request';
import Image from 'next/image';
import './style.css';

export default function Comments ({ id }){
    
    const comment = comments.find(item => item.manga_id === id)
    
    const Card = ({item}) => {
      return(
        <Column className='card-comment'>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                    <Image src={item.user.avatar} width={40} height={40} radius={100} alt="user avatar" className='avatar'/>
                    <Column style={{marginLeft: 10,}}>
                        <Title>{item.user.name}</Title>
                        <Title>{item.rate}</Title>
                    </Column>
                </Row>

                <Label style={{fontSize: 14,}}>{item.date}</Label>
            </Row>
            <Label style={{fontSize: 16, marginTop: 10,}}>{item.comment}</Label>

            <Row style={{margin: '10px 0px',}}>
                <Label style={{fontSize: 14, color: "#fff",}} className='like'>{item.likes} curtidas</Label>
                <Label style={{fontSize: 14,}} className='dislike'>{item.dislikes} descurtidas</Label>
            </Row>
            <Column style={{width: 60, height: 8, marginTop: 5, borderRadius: 100, backgroundColor: "#404040", alignSelf: 'center'}}/>
        </Column>    
      )
    }
    
    


return(
    <Column>

        {comment?.comments.map((item, index) => <Card key={index} item={item}/>)}
    </Column>
)}