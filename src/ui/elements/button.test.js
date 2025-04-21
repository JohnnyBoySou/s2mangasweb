import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button'; // ajuste o caminho conforme necessário

describe('Componente <Button />', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<Button label="Clique aqui" />);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve chamar a função onPress quando clicado', () => {
    const mockOnPress = jest.fn();
    render(<Button label="Enviar" onPress={mockOnPress} />);
    const botao = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(botao);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('deve desabilitar o botão quando a prop disabled for verdadeira', () => {
    const mockOnPress = jest.fn();
    render(<Button label="Desabilitado" onPress={mockOnPress} disabled />);
    const botao = screen.getByRole('button', { name: 'Desabilitado' });
    expect(botao).toBeDisabled();
    fireEvent.click(botao);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('deve mostrar "Carregando..." quando a prop loading for verdadeira', () => {
    render(<Button label="Salvar" loading />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
  });

  it('deve aplicar corretamente o ícone quando a prop icon for passada', () => {
    const IconMock = <svg data-testid="icone-mock" />;
    render(<Button label="Com Ícone" icon={IconMock} />);
    expect(screen.getByTestId('icone-mock')).toBeInTheDocument();
  });

  it('não deve disparar onPress quando loading for verdadeiro', () => {
    const mockOnPress = jest.fn();
    render(<Button label="Salvando..." loading onPress={mockOnPress} />);
    const botao = screen.getByRole('button', { name: 'Salvando...' });
    fireEvent.click(botao);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
function expect(mockOnPress) {
    throw new Error('Function not implemented.');
}

