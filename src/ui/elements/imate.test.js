import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './image'; 
import '@testing-library/jest-dom/extend-expect'; 

describe('Componente <Image />', () => {
  it('deve renderizar a imagem quando a prop src for fornecida', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" w={100} h={100} alt="Imagem de teste" />);
    const imagem = screen.getByAltText('Imagem de teste');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://exemplo.com/imagem.jpg');
  });

  it('não deve renderizar a imagem quando a prop src não for fornecida', () => {
    render(<Image w={100} h={100} />);
    const imagem = screen.queryByAltText('Imagem de teste');
    expect(imagem).toBeNull();
  });

  it('deve aplicar o estilo de largura e altura corretamente', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" w={200} h={150} />);
    const wrapper = screen.getByRole('img').parentElement;
    expect(wrapper).toHaveStyle('width: 200px');
    expect(wrapper).toHaveStyle('height: 150px');
  });

  it('deve aplicar o estilo de border-radius corretamente', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" w={200} h={150} r={10} />);
    const imagem = screen.getByAltText('Imagem de teste');
    expect(imagem).toHaveStyle('border-radius: 10px');
  });

  it('deve aplicar o estilo de object-fit corretamente', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" w={200} h={150} resize="contain" />);
    const imagem = screen.getByAltText('Imagem de teste');
    expect(imagem).toHaveStyle('object-fit: contain');
  });

  it('deve aplicar o estilo de alinhamento corretamente', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" w={200} h={150} align="flex-start" />);
    const wrapper = screen.getByRole('img').parentElement;
    expect(wrapper).toHaveStyle('align-self: flex-start');
  });

  it('deve renderizar o componente com o alt correto', () => {
    render(<Image src="https://exemplo.com/imagem.jpg" alt="Imagem de teste" w={100} h={100} />);
    const imagem = screen.getByAltText('Imagem de teste');
    expect(imagem).toBeInTheDocument();
  });
});
