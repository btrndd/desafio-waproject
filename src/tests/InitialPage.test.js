import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a tela inicial', () => {    
  it('se página contém um label e input pro número de perguntas', () => {
    renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const label = screen.getByText('How many questions?');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  it('se contém um botão de continuar', () => {
    renderWithRouter(<App />);    
    const continueBtn = screen.getByRole('button');
    expect(continueBtn).toBeInTheDocument();
  });
  it('se continua pro pŕoximo componente apenas com um input <= 20', async () => {
    renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByRole('button'); 
    userEvent.type(input, '21');
    userEvent.click(continueBtn);
    expect(continueBtn).toBeInTheDocument();
    userEvent.clear(input)
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const startBtn = screen.getByText('Start');
      expect(startBtn).toBeInTheDocument();
    });    
  });
  it('se mostra a quantidade de perguntas selecionadas corretamente', async () => {
    renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByRole('button'); 
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const title = screen.getByText('You selected 5 questions.')
      expect(title).toBeInTheDocument();
    });    
  });
  it('se mostra o botão de start e cancel', async () => {
    renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByRole('button'); 
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const startBtn = screen.getByText('Start');
      expect(startBtn).toBeInTheDocument();
      const cancelBtn = screen.getByText('Cancel');
      expect(cancelBtn).toBeInTheDocument();
    });    
  });
  it('se o botão de cancel volta pra seleção de perguntas', async () => {
    renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByRole('button'); 
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const cancelBtn = screen.getByText('Cancel');
      userEvent.click(cancelBtn);
    });    
    const title = screen.getByText('Questions&Answers');
    expect(title).toBeInTheDocument();
  });
  it('se o botão de start redireciona pra próxima tela', async () => {
    const { history } = renderWithRouter(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByRole('button'); 
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const startBtn = screen.getByText('Start');
      userEvent.click(startBtn);
    });
    await waitFor(() => {
      const questionOne = screen.getByText('Question 1');
      expect(questionOne).toBeInTheDocument();
    })
  });
});
