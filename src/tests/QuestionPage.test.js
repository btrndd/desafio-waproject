import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../testData';
import axios from 'axios';

jest.mock('axios');

const mockFetch = () => {
  axios.get.mockImplementation(() => Promise.resolve(data));
};

const getToQuestionPage = async () => {  
  await act(async () => {
    render(<App />);
  })
  const input = screen.getByLabelText(/How many questions?/i);
  const continueBtn = screen.getByRole('button');
  userEvent.type(input, '5');
  userEvent.click(continueBtn);
  await waitFor(() => {
    mockFetch();
    const startBtn = screen.getByText('Start');
    userEvent.click(startBtn);
  });
}

describe('Testando a tela de perguntas', () => {
  beforeAll(getToQuestionPage);
  it('se página contém título, categoria e pergunta', async () => {
    await waitFor(() => {
      const title = screen.getByText('Question 1');
      const category = screen.getByTestId('category');
      const question = screen.getByTestId('question');
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(question).toBeInTheDocument();
    });    
  });
  it('se página contém apenas uma reposta certa', async () => {
    await act(async () => {
      render(<App />);
    })
    await waitFor(() => {
      const correctAnswer = screen.getAllByTestId('correct-answer');
      expect(correctAnswer[0]).toBeInTheDocument();
      expect(correctAnswer.length).toBe(1);
    });    
  });
  it('se página contém pelo menos 1 resposta errada', async () => {
    await act(async () => {
      render(<App />);
    })
    await waitFor(() => {
      const wrongAnswer = screen.getAllByTestId('wrong-answer');
      expect(wrongAnswer[0]).toBeInTheDocument();
    });    
  });
  it('se ao escolher uma pergunta, mostra a certa', async () => {
    await act(async () => {
      render(<App />);
    })
    await waitFor(() => {
      const wrongAnswer = screen.getAllByTestId('wrong-answer');
      userEvent.click(wrongAnswer[0]);
      const correctAnswer = screen.getByRole('button', { pressed: true });
      expect(correctAnswer).toBeInTheDocument();
    });    
  });
  it('se tem um botão de próxima pergunta', async () => {
    await act(async () => {
      render(<App />);
    })
    await waitFor(() => {
      const nextBtn = screen.getByText('Next');
      expect(nextBtn).toBeInTheDocument();
    });
  });
  it('se ao clicar vai pra próxima pergunta', async () => {
    await act(async () => {
      render(<App />);
    })
    await waitFor(() => {
      const nextBtn = screen.getByText('Next');
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);
      userEvent.click(nextBtn);
      const question2 = screen.getByText('Question 2');
      expect(question2).toBeInTheDocument();
    });
  });
  it('se ao chegar na última pergunta, vai pra tela de relatório', async () => {
    await act(async () => {
      render(<App />);
      const questionsNumber = {
        questionsNumber: 3,
      }
      const mockFn = jest.fn( localStorage.setItem );
      localStorage.setItem = mockFn;
      localStorage.setItem('questionsNumber', JSON.stringify(questionsNumber));
    })
    for (let index = 0; index <= 3; index += 1) {
      await waitFor(() => {      
        const nextBtn = screen.getByText('Next');
        const correctAnswer = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer);
        userEvent.click(nextBtn);
      });
    };
    await waitFor(() => {
      const nextBtn = screen.getByText('Next');
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);
      userEvent.click(nextBtn);
      const results = screen.getByText('Your Results');
      expect(results).toBeInTheDocument();
    })    
  });
});
