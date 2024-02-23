import React from 'react';
import { Column, Row, Title, Label, ButtonPrimaryLight, } from '../../themes/global';

import comments from './../../requests/comments/request';
import Image from 'next/image';
import './style.css';
import { GoStarFill, GoStar } from "react-icons/go";

export default function Comments ({ id }){
    const comment = comments.find(item => item.manga_id === id)
    
    const Card = ({item}) => {
        const Rate = () => {
            if(item.rate === 0){
                return(
                    <Row style={{alignItems: 'center', marginTop: 10,}}>
                        <GoStar color="#505050" size={20}/>
                        <Label style={{fontSize: 16, marginLeft: 5,}}>Sem avaliação</Label>   
                    </Row>                 
                    )
                }
            else if(item.rate === 1) {
                return(
                <Row style={{alignItems: 'center', marginTop: 10,}}>
                        <GoStarFill color="#FFD700" size={20}/>
                    </Row>
                    )
                }

        }
      return(
        <Column className='card-comment'>
            <Row style={{justifyContent: 'space-between', alignItems: 'center', }}>
                <Row style={{justifyContent: 'center', alignItems: 'center', }}>
                    <Image src={item.user.avatar} width={40} height={40} radius={100} alt="user avatar" className='avatar'/>
                    <Column style={{marginLeft: 10,}}>
                        <Title>{item.user.name}</Title>
                       <Rate/>
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
       {comment === undefined  ? <Column style={{alignSelf: 'center', alignItems: 'center', marginTop: 20, backgroundColor:"#303030", borderRadius: 12, padding: '30px 50px'}}>
       <Image src="https://i.pinimg.com/564x/c4/12/b3/c412b3e7f5ec660c0921fb21208327ee.jpg" width={150} height={250} alt="comentarios vazios" style={{borderRadius: 12, objectFit: 'cover', transform: 'rotate(16deg)'}} />
       <Title style={{fontSize: 16, marginTop: 20, fontSize: 28, fontFamily: 'Bold',}}>Nenhum comentário ainda...</Title>
       <ButtonPrimaryLight style={{marginTop: 20,}}>Comentar agora</ButtonPrimaryLight> 
       </Column>
       : 
       <>
       {comment?.comments.map((item, index) => <Card key={index} item={item}/>)}
       </> 
       }
    </Column>
)}