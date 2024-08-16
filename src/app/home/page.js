import React from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
export default function HomeScreen({ navigation, }) {
    const { color, } = useTheme
    return (
        <Main style={{ padding: 18, }}>
            <Row style={{ columnGap: 18, }}>
                <Column bg="#303030" radius={12} pv={30} ph={20}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
                <Column bg="#303030" radius={12} pv={30} ph={20}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
                <Column bg="#303030" radius={12} pv={30} ph={20}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
            </Row>
            <Row style={{ columnGap: 18, }} mv={18}>
                <Column bg="#303030" radius={12} pv={30} ph={20} style={{ width: '70%', height: 300, }}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
                <Column bg="#303030" radius={12} pv={30} ph={20} style={{ width: '30%' }}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
            </Row>
            <Row style={{ columnGap: 18, }}>
                <Column bg="#303030" radius={12} pv={30} ph={20}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
                <Column bg="#303030" radius={12} pv={30} ph={20}>
                    <Title size='42px' align='center'>Ler mangás, agora é simples!</Title>
                </Column>
                <Column radius={12} pv={30} ph={20}>
                    <Row style={{ columnGap: 18, }} mv={18}>
                        <Column bg="#303030" radius={12} pv={30} ph={30} />
                        <Column bg="#303030" radius={12} pv={30} ph={30} />
                    </Row>
                    <Row style={{ columnGap: 18, }}>
                        <Column bg="#303030" radius={12} pv={30} ph={30} />
                        <Column bg="#303030" radius={12} pv={30} ph={30} />
                    </Row>
                </Column>
            </Row>

        </Main>
    )
}