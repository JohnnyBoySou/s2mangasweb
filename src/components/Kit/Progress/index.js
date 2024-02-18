import React from 'react';
import { Column, Row, Label } from '../../../themes/global';

export default function Progress ({porcentage = 30}){
    return(
    <Column  style={{alignSelf: 'center', margin: 'auto'}}>
        <Row style={{width: 300, marginTop: 20,}}>
            <Column style={{height: 10, borderRadius: 100, width: porcentage.toFixed() + '%', background: '#B5FFBC'}}/>
            <Column style={{height: 10, borderRadius: 100, flexGrow: 1,  background: '#505050', marginLeft: 8,}}/>
        </Row>
        <Row style={{width: 300, marginTop: 10, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', }}>
            <Label style={{color: '#B5FFBC'}}>Completo {porcentage.toFixed(0)}%</Label>
            <Label style={{color: '#808080'}}>Falta {(100 - porcentage).toFixed(0)}%</Label>
        </Row>
    </Column>
    )
}