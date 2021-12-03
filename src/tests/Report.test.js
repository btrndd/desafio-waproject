import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Report from '../pages/Report';
import renderWithRouter from '../renderWithRouter';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;  
}

const mockReport = {
  score: 1,
  question1: ["In what Half-Life expansion can you find Gordon&#039;s picture in an &quot;Employee of the Month&quot; picture frame?",
  "Half-Life: Opposing Force", "Half-Life: Opposing Force"],
  question2: ["Which country was an allied power in World War II?", "Italy", "Soviet Union"],
  question3: ["What colour hair does the main character of the Yu-Gi-Oh! original anime series have?", "Red, black and green", "Red, black and yellow"],
};

const questionsNumber = {
  questionsNumber: 3,
}

const setLocalStorage = async () => {  
  await act(async () => {
    renderWithRouter(<Report />);
  });
  const mockFn = jest.fn( localStorage.setItem );
  localStorage.setItem = mockFn;
  localStorage.setItem('questionsNumber', JSON.stringify(questionsNumber));
  localStorage.setItem('report', JSON.stringify(mockReport));
}

describe('Testando a tela de resultados', () => {
  beforeAll(setLocalStorage);
  it('se página contém título, número de perguntas, pontuação e erros', async () => {
    await act(async () => {
      renderWithRouter(<Report />);
    });
    const title = screen.getByText('Your Results');
    expect(title).toBeInTheDocument();
    const numberOfQuestions = screen.getByText(`Number of questions: ${questionsNumber.questionsNumber}`);
    expect(numberOfQuestions).toBeInTheDocument();
    const totalScore = screen.getByText(`Total score: ${mockReport.score}`);
    expect(totalScore).toBeInTheDocument();
    const mistakes = screen.getByText(`Mistakes: ${questionsNumber.questionsNumber - mockReport.score}`);
    expect(mistakes).toBeInTheDocument();
  });
  it('se página contém um relatório detalhado', async () => {
    await act(async () => {
      renderWithRouter(<Report />);
    });
    const title = screen.getByText('Detailed Report');
    expect(title).toBeInTheDocument();
  });
  it('se o relatório detalhado tem cards para todas as perguntas', async () => {
    await act(async () => {
      renderWithRouter(<Report />);
    });
    const question1 = screen.getByText('Question 1:');
    expect(question1).toBeInTheDocument();
    const question2 = screen.getByText('Question 2:');
    expect(question2).toBeInTheDocument();
    const question3 = screen.getByText('Question 3:');
    expect(question3).toBeInTheDocument();
  });
  it('se cada card possui a pergunta, a escolha e a resposta certa', async () => {
    await act(async () => {
      renderWithRouter(<Report />);
    });
    for (let index = 1; index <= questionsNumber.questionsNumber; index += 1) {
      const currentQuestion = `question${index}`;
      const question = screen.getByText(`${decodeHTML(mockReport[currentQuestion][0])}`);
      const selectedAns = screen.getAllByText(`${decodeHTML(mockReport[currentQuestion][1])}`);
      const correctAns = screen.getAllByText(`${decodeHTML(mockReport[currentQuestion][2])}`);
      expect(question).toBeInTheDocument();
      expect(selectedAns[0]).toBeInTheDocument();
      expect(correctAns[0]).toBeInTheDocument();
    }
  });
});

