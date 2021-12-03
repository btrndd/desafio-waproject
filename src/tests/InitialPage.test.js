import React from 'react';
import { screen, waitFor, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import InitialPage from '../pages/InitalPage';
import NumberOfQuestions from '../components/NumberOfQuestions';

const mockReport = {
  score: 1,
  question1: ["In what Half-Life expansion can you find Gordon&#039;s picture in an &quot;Employee of the Month&quot; picture frame?",
  "Half-Life: Opposing Force", "Half-Life: Opposing Force"],
  question2: ["Which country was an allied power in World War II?", "Italy", "Soviet Union"],
  question3: ["What colour hair does the main character of the Yu-Gi-Oh! original anime series have?", "Red, black and green", "Red, black and yellow"],
};

describe('Testando a tela inicial', () => {
  beforeAll(() => {
    const mockFn = jest.fn( localStorage.setItem );
    localStorage.setItem = mockFn;
    localStorage.setItem('report', JSON.stringify(mockReport));
  });
  it('se o botão de rever resultados está disponível quando for o caso', async () => {
    render(<App />);    
    const lastGameBtn = screen.getByText('RESUME LAST GAME');
    expect(lastGameBtn).toBeInTheDocument();    
  });
  it('se página contém um label e input pro número de perguntas', () => {
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const label = screen.getByText('How many questions?');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  it('se contém um botão de continuar', () => {
    render(<App />);    
    const continueBtn = screen.getByText('Continue');
    expect(continueBtn).toBeInTheDocument();
  });
  it('se continua pro pŕoximo componente apenas com um input <= 20', async () => {
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByText('Continue');
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
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByText('Continue');
    userEvent.type(input, '5');
    userEvent.click(continueBtn);
    await waitFor(() => {
      const title = screen.getByText('You selected 5 questions.')
      expect(title).toBeInTheDocument();
    });    
  });
  it('se mostra o botão de start e cancel', async () => {
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByText('Continue');
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
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByText('Continue');
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
    render(<App />);
    const input = screen.getByLabelText(/How many questions?/i);
    const continueBtn = screen.getByText('Continue');
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
