import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

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
          disableElevation
        >
          { decodeHTML(questions[idx].correct_answer) }
        </ToggleButton>]);
      const incorrctAnswers = questions[idx].incorrect_answers.map((answer, index) => (
        <ToggleButton
          value={ `incorret-${index}`}
          size="small"
          key={ index }
          disableElevation
        >
          { decodeHTML(answer) }
        </ToggleButton>
      ));

      const arrayAnswers = [...correctAnswer, ...incorrctAnswers];

      return (        
          <>
            <div>
              <Typography variant="h4" sx={{ mb: "10px" }}>Question {idx + 1}</Typography>
              <Typography variant="body2" sx={{ mb: "10px" }}>{decodeHTML(questions[idx].category)}</Typography>
              <Typography variant="button">
                {decodeHTML(questions[idx].question)}
              </Typography>
            </div>
            <ToggleButtonGroup
              color="success"
              size="small"
              sx={{ mt: "20px" }}
              orientation="vertical"
              value={alignment}
              exclusive
              onClick={handleClickAnswer}
            >
              {arrayAnswers.sort(() => Math.round(Math.random()) - 0.5)}
            </ToggleButtonGroup>
          </>
      );
    }
    return(
      <Typography variant="h6">Oops! Something went wrong :( </Typography>
    )
  }

  export default CardQuestion;