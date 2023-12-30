"use client";
import React, {useState,} from "react";
import { Column, Label, Main, Row, TextInput, Title, SubInput, Button, BTSelect, Error, ButtonPrimary, ButtonOff } from "../../../themes/global";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Image from 'next/image'
import { geral } from "../../../requests/shop/avatars";
import { geralbg } from "../../../requests/shop/capas";

import '../inputs.css';
import '../plans.css';
import '../../../themes/ani.css'

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetPassword, setRepetPassword] = useState('');
  const [role, setRole] = useState('Leitor');
  const [capa, setCapa] = useState();
  const [eyePass, setEyePass] = useState(false);
  const [avatar, setAvatar] = useState();
  const [plan, setPlan] = useState('free');
  const [error, setError] = useState('Apelido vazio');
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Registrar', 'Plano', 'Perfil', 'Capa', 'Salvando']
  const users = ['Johnny', 'Marechal','Jimmy']
  function verificarCampos (){
    return new Promise((resolve) => {
      const camposVazios = [];
      if (!nickname) camposVazios.push('Apelido');
      if (!username) camposVazios.push('Usuário');
      if (!email) camposVazios.push('Email');
      if (!password) camposVazios.push('Senha');
      if (!repetPassword) camposVazios.push('Repetir senha');
      if (!role) camposVazios.push('Sou um');
      if (camposVazios.length > 0) {
        setError(`Os seguintes campos não foram preenchidos: ${camposVazios.join(', ')}`);
        resolve(false); // Indica que há um erro
      }
      else if (password !== repetPassword) {
        setError('As senhas não coincidem.');
        resolve(false); // Indica que há um erro
      }else if (users?.find(existingUsername => existingUsername === username)) {
        setError('Nome de usuário ocupado');
        resolve(false)
      } 
      else {
        resolve(true); // Indica que todos os campos estão preenchidos
      }
    });
  };

  const handleNext = () => {
    if(currentStep === 1){
      verificarCampos().then(res => {if(res === true){setCurrentStep(2)}})
    }else if(currentStep === 2){
      setCurrentStep(3)
    }else if(currentStep === 3){
      setCurrentStep(4)
    }else if(currentStep === 4){
      setCurrentStep(5)
    }
  }
  const handlePrevius = () => {
    if(currentStep === 2){
      setCurrentStep(1)
    }else if(currentStep === 3){
      setCurrentStep(2)
    }else if(currentStep === 4){
      setCurrentStep(3)
    }else if(currentStep === 5){
      setCurrentStep(4)
    }
  }
    return (
      <Main style={{justifyContent: 'center', aligItems: 'center', backgroundColor: '#171717', height :'110vh'}}>
        <Column style={{border: '2px solid #303030', alignSelf: 'center', margin: '20px auto', borderRadius: 12, maxWidth: 650,}}>
         
        {currentStep === 1 && <Column className="fadeInLeft" style={{padding: 42,}}>
            <Title>Criar conta</Title>
            <Label>Registre-se agora mesmo para ver seus mangás favoritos</Label>
            {error?.length > 1 ? <Error className="fadeInUp">{error}</Error> : null}
            <Column style={{marginTop: 10, marginBottom: 20,}}>
               
               <Row style={{justifyContent: 'space-between', aligItems: 'center', }}> 
                <Column style={{display: 'flex'}}>
                <TextInput value={nickname} className="effect-1"  onChange={e => setNickname(e.target.value)} type="text" placeholder="Apelido"/>
                <SubInput className="focus-border"/>
                </Column>
                <Column style={{display: 'flex'}}>
                <TextInput value={username} onChange={e=> setUsername(e.target.value)} className="effect-1" type="text" placeholder="Usuário"/>
                <SubInput className="focus-border"/>
                </Column>
               </Row>
               
               <Column style={{display: 'flex'}}>
                <TextInput value={email} onChange={e=> setEmail(e.target.value)} className="effect-1" type="e-mail" placeholder="E-mail"/>
                <SubInput className="focus-border"/>
              </Column>

              <Row style={{justifyContent: 'space-between', aligItems: 'center', }}>
                <Column style={{display: 'flex'}}>
                <TextInput value={password} onChange={e=> setPassword(e.target.value)} className="effect-1" type={eyePass ? 'text' : 'password'} placeholder="Senha"/>
                <SubInput className="focus-border"/>
                </Column>
                <Column style={{display: 'flex'}}>
                <TextInput value={repetPassword} onChange={e=> setRepetPassword(e.target.value)} className="effect-1" type={eyePass ? 'text' : 'password'} placeholder="Repetir Senha"/>
                <SubInput className="focus-border"/>
                </Column>
              </Row>

              <Label style={{cursor: 'pointer', marginTop: 12, justifyContent: 'center', alignItems: 'center', }} onClick={() => setEyePass(!eyePass)}>
              {!eyePass ? <BsEye style={{marginRight: 5, marginBottom: -2,}}/> : <BsEyeSlash style={{marginRight: 5, marginBottom: -2,}}/>}    {!eyePass ? 'Mostrar' : 'Ocultar'} senha
              </Label>

              <Title style={{marginTop:20,}}>Sou um</Title>
              <Row>
                <BTSelect className={role != 'Leitor' ? 'btrole' : ''} $active={role === 'Leitor'} onClick={() => setRole('Leitor')}>
                  <Column>
                    <Title>Leitor</Title>
                    <Label style={{color: "#F1F1F1"}}>Apenas ler mangás</Label>
                  </Column>
                </BTSelect>
                <BTSelect className={role != 'Scan' ? 'btrole' : ''} $active={role === 'Scan'} onClick={() => setRole('Scan')}>
                <Column>
                  <Title>Scan ou Grupo</Title>
                  <Label style={{color: "#F1F1F1"}}>Publicar e gerenciar mangás</Label>
                </Column>
                </BTSelect>
              </Row>
            </Column>
          </Column>}
        
        {currentStep === 2 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Planos</Title>
            <Label>Escolha seu plano agora mesmo</Label>
            
            <Row>
              <Column className={plan === 'free' ? 'card select' : 'card'} onClick={() => setPlan('free')}>
                <span className="type">Free</span>
                <Row>
                  <h3 className="free_t">Free</h3>
                  <h3 className="free_p">para sempre</h3>
                </Row>
                <p className="free_text">Leia seus mangás favoritos a todo momento.</p>
                <div className="line"/>
                <Label style={{fontSize: 14, lineHeight: 1.5, margin:10,}}>
                • Mangá Pass<br/>
                • Acesso a biblioteca livre<br/>
                • Aviso de novos capítulos<br/>
                • Coleções e Cards<br/>
                </Label>

                <span className="bt_free" onClick={() => setPlan('free')}>Selecionar</span>
              </Column>

              <Column className={plan === 'premium' ? 'card_p select' : 'card_p'} onClick={() => setPlan('premium')}>
                <span className="type_premium">Premium</span>
                <Row>
                  <h3 className="free_t">R$ 4,99</h3>
                  <h3 className="free_p">por mês</h3>
                </Row>
                <p className="free_text">Experiência imersiva e benefícios exclusivos.</p>
                <div className="line"/>
                <Label style={{fontSize: 14, lineHeight: 1.5, margin:10,}}>
                
                • Mangá Pass Pro<br/>
                • Feed personalizado<br/>
                • Sugestões aprimoradas<br/>
                • Acesso ao Flow [BETA]<br/>
                </Label>

                <span className="bt_free" onClick={() => setPlan('premium')}>Selecionar</span>
              </Column>
            </Row>

          </Column>
        }

        {currentStep === 3 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Perfil</Title>
            <Label>Escolha sua foto de perfil agora mesmo</Label>
            <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', }}>

            {geral.map((item, index) => (
              <Image
              src={item}
              key={index}
              width={84}
              height={84}
              onClick={() => setAvatar(item)}
              alt=""
              style={{objectFit: "cover", 
              borderWidth: 4,
              transition: 'linear .2s',
              cursor: 'pointer',
              transform: `scale(${avatar === item ? 1.1 : 1})`,
              borderColor: avatar === item ? "#ED274A" : '#00000000',
              borderStyle: 'solid',
              borderRadius: 100, margin: 4,}}
              loading="lazy"
              />
              ))}
              </Row>

          </Column>}

        {currentStep === 4 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Capa</Title>
            <Label>Escolha sua capa de perfil agora mesmo</Label>
            <Row className="scroll-container" style={{flexWrap: 'wrap', justifyContent: 'center', }}>
            {geralbg.map((item, index) => (
              <Image
              src={item}
              key={index}
              width={200}
              height={100}
              onClick={() => setCapa(item)}
              alt=""
              style={{objectFit: "cover", 
              borderWidth: 4,
              transition: 'linear .2s',
              cursor: 'pointer',
              transform: `scale(${capa === item ? 1.1 : 1})`,
              borderColor: capa === item ? "#ED274A" : '#00000000',
              borderStyle: 'solid',
              borderRadius: 12, margin: 10,}}
              loading="lazy"
              />
              ))}
              </Row>

          </Column>}

        {currentStep === 5 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Tudo pronto!</Title>
            <Label>Salvamos seus dados e agora vamos curtir alguns mangás!</Label>
           
          </Column>}

          
          
          {currentStep != 5 && <Row style={{ margin: 44, marginTop: -40, justifyContent: 'space-between', alignItems: 'center', }}>
              <Row>
                <ButtonOff onClick={handlePrevius}>Voltar</ButtonOff>
                <ButtonPrimary style={{marginLeft: 20,}} onClick={handleNext}>Continuar</ButtonPrimary>
              </Row>
              <Title>{currentStep} de {steps?.length}</Title>
            </Row>}
        </Column>
      </Main>
        )
  }
