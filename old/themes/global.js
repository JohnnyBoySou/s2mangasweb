"use client";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle `
    @font-face {
    font-family: 'Medium';
    src: url('/fonts/Circular_Medium.ttf') format('truetype');
    font-style: normal;
  }
  @font-face {
    font-family: 'Bold';
    src: url('/fonts/Circular_Bold.ttf') format('truetype');
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Book';
    src: url('/fonts/Circular_Book.ttf') format('truetype');
    font-style: normal;
    font-weight: 200;
    font-display: swap;
  }
  @font-face {
    font-family: 'Black';
    src: url('/fonts/Circular_Black.ttf') format('truetype');
    font-style: normal;
    font-weight: 900;
    font-display: swap;
  }
  @font-face {
    font-family: 'Intro';
    src: url('/fonts/Intro_Bold.ttf') format('truetype');
    font-style: normal;
    font-weight: 900;
    font-display: swap;
  }
  h1{
    font-weight: 400;
    margin: 0;
  }
  html, body{
    padding: 0;
    margin: 0;
    font-family: 'Medium';
    background-color: #101010;
  }
  ::-webkit-scrollbar {
    width: 12px; /* Largura da barra de rolagem */
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #707070; /* Cor do polegar da barra de rolagem */
    border-radius: 6px; /* Borda arredondada do polegar */
    cursor: pointer;
  }
  
 ::-webkit-scrollbar-track {
    background-color: #404040; /* Cor da trilha da barra de rolagem */
  }
`;

export const TextInput = styled.input`
  font-size: ${props => props.theme.size.title};
  color: ${props => props.theme.color.title};
  font-family: 'Book';
  background-color: #303030;
  border: 0.6px solid #404040;
  border-radius: 6px;
  margin-top: 10px;
  outline: none;
  z-index: 2;
  padding: 8px 10px;
  transition: .2s linear;
  &:focus {
    
  border: 0.6px solid ${props => props.theme.color.primary};
  }
`;

export const SubInput = styled.span`
  font-size: 18px;
  color: ${props => props.theme.color.title};
  margin-bottom: -20px;
  margin-top: 20px;
  background-color: #505050;
  border-radius: 4px;
  padding: 8px 14px 16px 14px;
  align-self: flex-start;
`

export const Title = styled.h1`
  font-size: ${props => props.theme.size.title};
  color: ${props => props.theme.color.title};
  font-family: 'Medium';
  margin: 0px;
`;

export const Error = styled.div`
  font-size: ${props => props.theme.size.label};
  color: ${props => props.theme.color.red};
  background-color: #541d1d;
  font-family: 'Book';
  padding: 8px;
  cursor: not-allowed;
  border-radius: 6px;
  margin-top: 10px;
`;
export const B = styled.span`
  font-family: 'Bold';
`
export const Label = styled.span`
  font-size: ${props => props.theme.size.label};
  color: ${props => props.theme.color.label};
  font-family: 'Book';
`;

export const Main = styled.section`
  padding: 12px;

`;


export const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: #00000000;
`;


export const ButtonPrimary = styled.button`
  border: none;
  padding: 8px 20px; 
  border-radius: 100px; 
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.title};
  transition: .2s linear;
  font-family: 'Medium';
  font-size: 18px;
  cursor: pointer;
  &:hover {
  background-color: ${props => props.theme.color.poff};
  color:  ${props => props.theme.color.label};
  }
`;

export const ButtonPrimaryLight = styled.button`
  border: none;
  padding: 8px 20px; 
  border-radius: 100px; 
  background-color: #fff;
  color: ${props => props.theme.color.off};
  transition: .2s linear;
  font-family: 'Medium';
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.color.primary};
    color:  ${props => props.theme.color.title};
  }
`;


export const ButtonOff = styled.button`
  border: none;
  padding: 8px 20px; 
  font-family: 'Medium';
  font-size: 18px;
  border-radius: 100px; 
  color: ${props => props.theme.color.title};
  background-color: ${props => props.theme.color.off2};
  transition: .2s linear;
  cursor: pointer;
  &:hover {
  background-color: #000;
  color: ${props => props.theme.color.title};
  }
`;


export const BTIcon = styled.button`
  border: none;
  padding: 12px 20px 10px 24px; 
  font-family: 'Medium';
  font-size: 28px;
  border-radius: 6px; 
  color: ${props => props.theme.color.label+98};
  background-color: #00000000;
  transition: .2s linear;
  align-self: center;
  cursor: pointer;
  &:hover {
  color: ${props => props.theme.color.title};
  }
`;

export const BTColection = styled.button`
  font-family: 'Medium';
  font-size: 24px;
  border: none;
  width: 54px;
  height: 50px;
  margin: 10px 10px 10px 10px;
  z-index: 99;
  border-radius: 6px; 
  color: ${props => props.theme.color.label};
  transition: .2s linear;
  cursor: pointer;
  &:hover {
  }
`;

export const BTColectionLarge = styled.button`
  font-family: 'Medium';
  font-size: 52px;
  margin-bottom: 10px;
  border: none;
  width: 124px;
  height: 120px;
  border-radius: 6px; 
  color: ${props => props.theme.color.label};
  transition: .2s linear;
  cursor: pointer;
  &:hover {
  }
`;


export const BTSelect = styled.button`
  border: 2px solid ${props => props.$active ? '#ffffff00' : "#404040"} ;
  border-radius: 8px;
  margin: 10px 10px 0 0;
  transition: .2s linear;
  cursor: pointer;
  width: 240px;
  height: 100px;
  padding: 10px 20px;
  text-align: left;
  background-color: ${props => props.$active ? props.theme.color.primary : "#ffffff00"};
`;





export const BTLike = styled.button`
  font-family: 'Medium';
  font-size: 18px;
  padding: 6px 20px;
  border: ${props => props.liked ? 'none': '3px solid #f7f7f790'}; 
  background:  ${props => props.liked ? '#FFFFFF': 'transparent'};
  color: ${props => props.liked ? props.theme.color.primary : props.theme.color.label};
  border-radius: 100px; 
  transition: .2s linear;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.title};
    border: 3px solid #fff;
  }
`;


export const BTFlow = styled.button`
  font-family: 'Medium';
  font-size: 18px;
  border-radius: 100px; 
  padding: 6px 20px;
  border: ${props => props.notify ? '2px solid' + props.theme.color.primary : '3px solid #f7f7f790'}; 
  background: none;
  color: ${props => props.notify ? props.theme.color.primary : props.theme.color.label};
  transition: .2s linear;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.title};
    border: 3px solid #fff;
  }
`;


export const Row = styled.div`
  flex-direction: row;
  display: flex;
`


export const Column = styled.div`
  flex-direction: column;
  display: flex;
`
