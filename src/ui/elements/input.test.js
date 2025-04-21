import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input'; // ajuste o caminho conforme necessário
import '@testing-library/jest-dom/extend-expect'; // para usar os matchers como toBeInTheDocument

describe('Componente <Input />', () => {
  it('deve renderizar o input com o valor correto', () => {
    const mockSetValue = jest.fn();
    render(<Input value="12345" setValue={mockSetValue} label="Campo de teste" />);
    const input = screen.getByPlaceholderText('Campo de teste');
    expect(input).toHaveValue('12345');
  });

  it('deve aplicar a máscara de CPF corretamente', () => {
    const mockSetValue = jest.fn();
    render(<Input value="" setValue={mockSetValue} label="CPF" mask="CPF" />);
    const input = screen.getByPlaceholderText('CPF');
    
    fireEvent.change(input, { target: { value: '12345678901' } });
    expect(mockSetValue).toHaveBeenCalledWith('123.456.789-01');
  });

  it('deve aplicar a máscara de telefone corretamente', () => {
    const mockSetValue = jest.fn();
    render(<Input value="" setValue={mockSetValue} label="Telefone" mask="PHONE" />);
    const input = screen.getByPlaceholderText('Telefone');
    
    fireEvent.change(input, { target: { value: '11987654321' } });
    expect(mockSetValue).toHaveBeenCalledWith('(11) 98765-4321');
  });

  it('deve aplicar a máscara de CEP corretamente', () => {
    const mockSetValue = jest.fn();
    render(<Input value="" setValue={mockSetValue} label="CEP" mask="CEP" />);
    const input = screen.getByPlaceholderText('CEP') ;
    
    fireEvent.change(input, { target: { value: '12345678' } });
    expect(mockSetValue).toHaveBeenCalledWith('12345-678');
  });

  it('deve aplicar a máscara de nascimento corretamente', () => {
    const mockSetValue = jest.fn();
    render(<Input value="" setValue={mockSetValue} label="Nascimento" mask="NASCIMENTO" />);
    const input = screen.getByPlaceholderText('Nascimento') ;
    
    fireEvent.change(input, { target: { value: '12011990' } });
    expect(mockSetValue).toHaveBeenCalledWith('12/01/1990');
  });

  it('deve alternar a visibilidade da senha ao clicar no ícone', () => {
    const mockSetValue = jest.fn();
    render(<Input value="senha123" setValue={mockSetValue} label="Senha" pass />);
    
    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText('Senha');
    
    // Verifica o tipo do input como password inicialmente
    expect(input.type).toBe('password');
    
    // Clica para alternar a visibilidade
    fireEvent.click(button);
    expect(input.type).toBe('text');
    
    // Clica novamente para voltar ao tipo password
    fireEvent.click(button);
    expect(input.type).toBe('password');
  });

  it('deve alterar o foco corretamente no campo de input', () => {
    const mockSetValue = jest.fn();
    render(<Input value="teste" setValue={mockSetValue} label="Campo de teste" />);
    
    const input = screen.getByPlaceholderText('Campo de teste');
    
    // Verifica se o estilo do input é alterado ao focar
    fireEvent.focus(input);
    expect(input).toHaveStyle('border-color: #fff');
    
    // Verifica se o estilo do input é alterado ao desfocar
    fireEvent.blur(input);
    expect(input).toHaveStyle('border-color: #303030');
  });
});
