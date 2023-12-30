import React, {useState, useEffect,} from "react";
import { Column, Label, Main, Row, TextInput, Title, SubInput, Button, BTSelect, Error, ButtonPrimary } from "../../themes/global";
import { BsEye, BsEyeSlash } from "react-icons/bs";


import './inputs.css';
import './plans.css';
import '../../themes/ani.css'

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [repetPassword, setRepetPassword] = useState('');
  const [eyePass, setEyePass] = useState(false);
  const [role, setRole] = useState('Leitor');

  const [error, setError] = useState('Apelido vazio');
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Registrar', 'Plano', 'Confirmação']

  const users = ['Johnny', 'Marechal','Jimmy']

  useEffect(() => {
    if (users?.find(existingUsername => existingUsername === username)) {
      setError('Nome de usuário ocupado');
    }else{
      setError()
    }

    if(password != repetPassword){
      setError('Senhas não conferem')
    }

  },[username, repetPassword])


  const handleStep = () => {
    setCurrentStep(2)
  }
  

    return (
      <Main style={{justifyContent: 'center', aligItems: 'center', flex: 1, backgroundColor: '#171717'}}>
        <Column style={{border: '2px solid #303030', alignSelf: 'center', margin: '20px auto', borderRadius: 12, maxWidth: 560,}}>
         
        {currentStep === 1 && <Column style={{padding: 42,}}>
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
                <TextInput value={email} onChange={e=> setEmail(e.target.value)} className="effect-1" type="text" placeholder="E-mail"/>
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
                <BTSelect className={role != 'Leitor' ? 'btrole' : ''} active={role === 'Leitor'} onClick={() => setRole('Leitor')}>
                  <Column>
                    <Title>Leitor</Title>
                    <Label style={{color: "#F1F1F1"}}>Apenas ler mangás</Label>
                  </Column>
                </BTSelect>
                <BTSelect className={role != 'Scan' ? 'btrole' : ''} active={role === 'Scan'} onClick={() => setRole('Scan')}>
                <Column>
                  <Title>Scan ou Grupo</Title>
                  <Label style={{color: "#F1F1F1"}}>Publicar e gerenciar mangás</Label>
                </Column>
                </BTSelect>
              </Row>
            </Column>
          </Column>}
        
        {currentStep === 2 &&         <Column style={{padding: 42,}}>
            <Title>Planos</Title>
            <Label>Escolha seu plano agora mesmo</Label>
            
            
              <Column className="card">
              <h3 className="free">Free</h3>
              <Label style={{fontSize: 16, marginTop: 5,}}>Leia mangás a qualquer momento com anúncios periódicos.</Label>
            
              <Label style={{fontSize: 14, margin:10,}}>
              • Acesso a biblioteca livre<br/>
              • Aviso de novos capítulos<br/>
              • Coleções e Cards<br/>
              </Label>

              <span className="bt_free" style={{ color: "#000"}}>Selecionar</span>
              </Column>




          </Column>
        }
          
          
          <Row style={{ margin: 44, marginTop: -40, justifyContent: 'space-between', alignItems: 'center', }}>
              
              
              <ButtonPrimary onClick={handleStep}> 
                <Title>Continuar</Title>
              </ButtonPrimary>


              <ButtonPrimary onClick={handleStep}> 
                <Title>Continuar</Title>
              </ButtonPrimary>
              <Title>{currentStep} de {steps?.length}</Title>
            </Row>
        </Column>
      </Main>
        )
  }

  const styles = [

  ]