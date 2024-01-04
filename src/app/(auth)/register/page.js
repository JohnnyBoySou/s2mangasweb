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
import { createUser } from "../../../requests/user/requests";

export default function Register() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repetPassword: '',
    capa: undefined,
    genres: [{name: 'Ação', id: 'acao'}, {name: 'Artes Marciais', id: 'artes-marciais'}, {name: 'Adulto', id: 'adulto'}],
    role: 'Leitor',
    avatar: undefined,
    plan: 'free',
    error: undefined,
    currentStep: 1,
    coins: 100, 
    diamonds: 5,
    read: [],
    likes: [],
    complete: [],
    collections: [],
    preferences: {
      horizontal: false,
      filterColor: false,
      color: "#303030",},
    marks: [],

    });

  const steps = ['Registrar', 'Plano', 'Perfil', 'Capa', 'Salvando'];
  const [eyePass, setEyePass] = useState();
  const users = ['Johnny', 'Marechal', 'Jimmy'];

  const checkEmptyFields = () => {
    const { name, email, password, repetPassword, role } = formData;
    const emptyFields = [];
    if (!name) emptyFields.push('Apelido');
    if (!email) emptyFields.push('Email');
    if (!password) emptyFields.push('Senha');
    if (!role) emptyFields.push('Função');
    if (!repetPassword) emptyFields.push('Repetir senha');

    return emptyFields;
  };

  const verifyFields = () => {
    const emptyFields = checkEmptyFields();
    if (emptyFields.length > 0) {
      setFormData({
        ...formData,
        error: `Os seguintes campos não foram preenchidos: ${emptyFields.join(', ')}`,
      });
      return false;
    }
    const { password, repetPassword } = formData;
    if (password !== repetPassword) {
      setFormData({ ...formData, error: 'As senhas não coincidem.' });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (formData.currentStep < steps.length) {
      if (verifyFields()) {
        if (formData.currentStep + 1 === 5) {
          await createUser(formData);  
        }
        setFormData({ ...formData, currentStep: formData.currentStep + 1 });
      }
    }
  };

  const handlePrevius = () => {
    if (formData.currentStep > 1) {
      setFormData({ ...formData, currentStep: formData.currentStep - 1 });
    }
  };

    return (
      <Main style={{justifyContent: 'center', aligItems: 'center', backgroundColor: '#171717', height :'110vh'}}>
        <Column style={{border: '2px solid #303030', alignSelf: 'center', margin: '20px auto', borderRadius: 12, maxWidth: 650,}}>
         
        {formData.currentStep === 1 && <Column className="fadeInLeft" style={{padding: 42,}}>
            <Title>Criar conta</Title>
            <Label>Registre-se agora mesmo para ver seus mangás favoritos</Label>
            {formData.error?.length > 1 ? <Error className="fadeInUp">{formData.error}</Error> : null}
            <Column style={{marginTop: 10, marginBottom: 20,}}>
               
               <Row style={{justifyContent: 'space-between', aligItems: 'center', }}> 
                <Column style={{display: 'flex'}}>
                <TextInput
                  value={formData.name}
                  className="effect-1"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  placeholder="Apelido"
                />
                <SubInput className="focus-border" />

                </Column>
                
                <Column style={{display: 'flex'}}>
                <TextInput
                  value={formData.email}
                  className="effect-1"
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  type="text"
                  placeholder="Email"
                />
                <SubInput className="focus-border" />
                </Column>
               </Row>
               
              <Row style={{justifyContent: 'space-between', aligItems: 'center', }}>
                <Column style={{display: 'flex'}}>
                <TextInput
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="effect-1"
                  type={eyePass ? 'text' : 'password'}
                  placeholder="Senha"
                />
                <SubInput className="focus-border"/>
                </Column>
                <Column style={{display: 'flex'}}>
                <TextInput
                  value={formData.repetPassword}
                  onChange={e => setFormData({ ...formData, repetPassword: e.target.value })}
                  className="effect-1"
                  type={eyePass ? 'text' : 'password'}
                  placeholder="Repetir Senha"
                />    
                <SubInput className="focus-border"/>
                </Column>
              </Row>

              <Label style={{cursor: 'pointer', marginTop: 12, justifyContent: 'center', alignItems: 'center', }} onClick={() => setEyePass(!eyePass)}>
              {!eyePass ? <BsEye style={{marginRight: 5, marginBottom: -2,}}/> : <BsEyeSlash style={{marginRight: 5, marginBottom: -2,}}/>}    {!eyePass ? 'Mostrar' : 'Ocultar'} senha
              </Label>

              <Title style={{marginTop:20,}}>Sou um</Title>
              <Row>
                <BTSelect className={formData.role != 'Leitor' ? 'btrole' : ''} $active={formData.role === 'Leitor'}  onClick={() => setFormData({ ...formData, role: 'Leitor' })}>
                  <Column>
                    <Title>Leitor</Title>
                    <Label style={{color: "#F1F1F1"}}>Apenas ler mangás</Label>
                  </Column>
                </BTSelect>
                <BTSelect className={formData.role != 'Scan' ? 'btrole' : ''} $active={formData.role === 'Scan'}  onClick={() => setFormData({ ...formData, role: 'Scan' })}>
                <Column>
                  <Title>Scan ou Grupo</Title>
                  <Label style={{color: "#F1F1F1"}}>Publicar e gerenciar mangás</Label>
                </Column>
                </BTSelect>
              </Row>
            </Column>
          </Column>}
        
        {formData.currentStep === 2 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Planos</Title>
            <Label>Escolha seu plano agora mesmo</Label>
            
            <Row>
              <Column className={formData.plan === 'free' ? 'card select' : 'card'} onClick={() => setFormData({ ...formData, plan: 'free' })}>
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

                <span className="bt_free" onClick={() => setFormData({ ...formData, plan: 'free' })}>Selecionar</span>
              </Column>

              <Column className={formData.plan === 'premium' ? 'card_p select' : 'card_p'} onClick={() => setFormData({ ...formData, plan: 'premium' })}>
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

                <span className="bt_free" onClick={() => setFormData({ ...formData, plan: 'premium' })}>Selecionar</span>
              </Column>
            </Row>

          </Column>
        }

        {formData.currentStep === 3 &&         
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
              onClick={() => setFormData({ ...formData, avatar: item })}
              alt=""
              style={{objectFit: "cover", 
              borderWidth: 4,
              transition: 'linear .2s',
              cursor: 'pointer',
              transform: `scale(${formData.avatar === item ? 1.1 : 1})`,
              borderColor: formData.avatar === item ? "#ED274A" : '#00000000',
              borderStyle: 'solid',
              borderRadius: 100, margin: 4,}}
              loading="lazy"
              />
              ))}
              </Row>

          </Column>}

        {formData.currentStep === 4 &&         
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
              onClick={() => setFormData({ ...formData, capa: item })}
              alt=""
              style={{objectFit: "cover", 
              borderWidth: 4,
              transition: 'linear .2s',
              cursor: 'pointer',
              transform: `scale(${formData.capa === item ? 1.1 : 1})`,
              borderColor: formData.capa === item ? "#ED274A" : '#00000000',
              borderStyle: 'solid',
              borderRadius: 12, margin: 10,}}
              loading="lazy"
              />
              ))}
              </Row>

          </Column>}

        {formData.currentStep === 5 &&         
        <Column style={{padding: 42,}}  className="fadeInLeft">
            <Title>Tudo pronto!</Title>
            <Label>Salvamos seus dados e agora vamos curtir alguns mangás!</Label>
            <Column onClick={() => createUser(formData).then(res => console.log(res))}>Criar conta</Column>
           
          </Column>}

          
        {formData.currentStep != 5 && <Row style={{ margin: 44, marginTop: -40, justifyContent: 'space-between', alignItems: 'center', }}>
              <Row>
                <ButtonOff onClick={handlePrevius}>Voltar</ButtonOff>
                <ButtonPrimary style={{marginLeft: 20,}} onClick={handleNext}>Continuar</ButtonPrimary>
              </Row>
              <Title>{formData.currentStep} de {steps?.length}</Title>
            </Row>}
        </Column>
      </Main>
        )
  }
