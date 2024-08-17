import React from 'react';
import { Title, Label, Column } from '@theme/global';

const PrivacyPolicy = () => {
  return (
    <Column style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title size={32}>Política de Privacidade - S2 Mangás</Title>
      <Label>No <strong>S2 Mangás</strong>, levamos sua privacidade a sério. Queremos que você entenda como lidamos com seus dados pessoais.</Label>

      <Title>Coleta de Dados</Title>
      <Label>Coletamos apenas informações necessárias para melhorar sua experiência no aplicativo, como:</Label>
      <ul style={{ color: '#ffffff' }}>
        <li style={{ color: '#ffffff' }}>Preferências de leitura</li>
        <li style={{ color: '#ffffff' }}>Configurações de coleções</li>
        <li style={{ color: '#ffffff' }}>Personalização de conta</li>
      </ul>
      <Label>Esses dados são <strong>armazenados localmente</strong> em seu dispositivo para garantir que suas preferências sejam mantidas.</Label>

      <Title>Não enviamos dados para a web</Title>
      <Label>Nenhuma informação coletada por nós é enviada ou compartilhada com servidores externos, serviços de terceiros ou a internet. Tudo o que você faz no app fica apenas no seu dispositivo.</Label>

      <Title>Alterações nesta Política</Title>
      <Label>Podemos atualizar nossa Política de Privacidade ocasionalmente. Qualquer alteração será informada diretamente no aplicativo.</Label>

      <Label><strong>Última atualização:</strong> 17/08/2024</Label>
    </Column>
  );
};

export default PrivacyPolicy;
