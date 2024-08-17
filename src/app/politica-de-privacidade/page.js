import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Política de Privacidade - S2 Mangás</h1>
      <p>No <strong>S2 Mangás</strong>, levamos sua privacidade a sério. Queremos que você entenda como lidamos com seus dados pessoais.</p>
      
      <h2>Coleta de Dados</h2>
      <p>Coletamos apenas informações necessárias para melhorar sua experiência no aplicativo, como:</p>
      <ul>
        <li>Preferências de leitura</li>
        <li>Configurações de coleções</li>
        <li>Personalização de conta</li>
      </ul>
      <p>Esses dados são <strong>armazenados localmente</strong> em seu dispositivo para garantir que suas preferências sejam mantidas.</p>
      
      <h2>Não enviamos dados para a web</h2>
      <p>Nenhuma informação coletada por nós é enviada ou compartilhada com servidores externos, serviços de terceiros ou a internet. Tudo o que você faz no app fica apenas no seu dispositivo.</p>

      <h2>Alterações nesta Política</h2>
      <p>Podemos atualizar nossa Política de Privacidade ocasionalmente. Qualquer alteração será informada diretamente no aplicativo.</p>

      <p><strong>Última atualização:</strong> [data]</p>
    </div>
  );
};

export default PrivacyPolicy;
