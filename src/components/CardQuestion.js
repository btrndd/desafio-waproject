import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';

function CardQuestion() {
    const [idx, setIdx] = useState(0);
    const [alignment, setAlignment] = useState('');
    const questions = JSON.parse(localStorage.getItem('questions'));

    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }

    const handleClickAnswer = () => {
      setAlignment('correct');
    }

    if (questions) {
      const correctAnswer = ([
        <ToggleButton
          value="correct"
          size="small"
        >
          { decodeHTML(questions[idx].correct_answer) }
        </ToggleButton>]);
      const incorrctAnswers = questions[idx].incorrect_answers.map((answer, index) => (
        <ToggleButton
          value={ `incorret-${index}`}
          size="small"
          sx={{ mx: '20px' }}
          key={ index }
        >
          { decodeHTML(answer) }
        </ToggleButton>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;    
      const answers = arrayQuestions.sort(() => Math.round(Math.random()) - HALF)

      return (
        <>
          <p>{ decodeHTML(questions[idx].category) }</p>
          <h3>{ decodeHTML(questions[idx].question) }</h3>
          <ToggleButtonGroup
            color="standard"
            size="small"
            value={ alignment }
            exclusive
            sx={{ mx: '20px' }}
            onClick={ handleClickAnswer }
          >
            { answers }
          </ToggleButtonGroup>          
        </>
      );
    }
    return(
      <p>Couldn't find your question :( </p>
    )
  }

  export default CardQuestion;