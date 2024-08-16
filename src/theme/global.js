"use client";
import styled, { createGlobalStyle } from "styled-components";
import dark from '@theme/dark';

export const GlobalStyle = createGlobalStyle`
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
    background-color: #171717;
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

export const useTheme = { color: dark.colors, font: dark.font, size: dark.size }

//utils
export const Button = styled.button`
  border: none;
  cursor: pointer;
  transition: .2s linear;
  padding: 8px 20px; 
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

//layout
export const Main = styled.section`
  padding: 12px;
`;
export const Row = styled.div`
  flex-direction: row;
  display: flex;
  background-color: ${props => props.bg || 'transparent'};
  margin: ${props => props.mv || 0 }px ${props => props.mh || 0}px;
  border-radius: ${props => props.radius || 0}px;
  padding: ${props => props.pv || 0 }px ${props => props.ph || 0}px;
`
export const Column = styled.div`
  flex-direction: column;
  display: flex;
  background-color: ${props => props.bg || 'transparent'};
  margin: ${props => props.mv || 0 }px ${props => props.mh || 0}px;
  border-radius: ${props => props.radius || 0}px;
  padding: ${props => props.pv || 0 }px ${props => props.ph || 0}px;
`

//typography
export const Title = styled.h1`
  font-size: ${props => props.size || '20px'};
  color: ${props => props.color || props.theme.color.title};
  font-family: ${props => props.font || props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
  letter-spacing: -0.6px;
  line-height: ${props => props.lineHeight || props.size + 3 || '20px'};
`;
export const Label = styled.p`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.book};
  text-align: ${props => props.align || 'left'};
  letter-spacing: -0.6px;
  line-height: ${props => props.lineHeight || props.size || '16px'};
`;
export const LabelBT = styled.span`
  font-size: ${props => props.size || '18px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => 'Bold'};
  letter-spacing: -0.6px;
  text-align: ${props => props.align || 'left'};
`;
export const SubLabel = styled.p`
  font-size: ${props => props.size || '14px'};
  color: ${props => props.color || props.theme.color.sublabel};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;
export const B = styled.span`
  font-family: 'Bold';
`
