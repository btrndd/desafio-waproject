import React, { useState } from 'react';

function CardQuestion() {
    const [idx, setIdx] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const questions = JSON.parse(localStorage.getItem('questions'));

    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }

    if (questions) {
      const correctAnswer = ([
        <button
          className={ toggle && 'correct' }
          type="button"
          key=""
          disabled={ disabled }
        >
          { decodeHTML(questions[idx].correct_answer) }
        </button>]);
      const incorrctAnswers = questions[idx].incorrect_answers.map((answer, index) => (
        <button
          className={ toggle && 'incorrect' }
          type="button"
          key={ index }
          disabled={ disabled }
        >
          { decodeHTML(answer) }
        </button>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;

      return (
        <>
          <p>{ decodeHTML(questions[idx].category) }</p>
          <h3>{ decodeHTML(questions[idx].question) }</h3>
          {arrayQuestions.sort(() => Math.round(Math.random()) - HALF)}
        </>
      );
    }
    return(
      <p>Couldn't find your question :( </p>
    )
  }

  export default CardQuestion;