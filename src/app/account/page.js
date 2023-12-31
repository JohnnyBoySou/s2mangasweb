import React from 'react';
import { Column, Row, Title, Label, B} from '../../themes/global';
import './account.css'
import { CiEdit, CiCreditCard1 } from "react-icons/ci";

export default function Account() {
    return (
        <Column className='banner'>
            <Row>
                <Column className='card'>
                    <Row>
                        <Column>
                            <Label style={{textTransform: 'uppercase', letterSpacing: 1.4,}}>Seu plano</Label>
                            <Title style={{fontSize: 32,}}>Premium</Title>
                            <Label>Sua próxima cobrança será no dia <B>23/01/2024</B>, no valor de <B>R$ 4,99.</B></Label>
                            <Label style={{marginTop: 20, }}>Cartão Mastercard que termina com <B>3005</B></Label>
                        </Column>
                    </Row>
                </Column>

                <Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiEdit/>
                        </Title>
                        <Label style={{textAlign: 'center'}}>Editar Perfil</Label>
                    </Column>
                    <Column className='card'>
                        <Title style={{textAlign: 'center', fontSize: 32,}}>
                            <CiCreditCard1 />
                        </Title>
                        <Label style={{textAlign: 'center'}}>Atualizar Cartão</Label>
                    </Column>
                </Column>
            </Row>

        </Column>
    )
}