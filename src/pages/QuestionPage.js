import React, { useEffect, useState } from 'react';
import CardQuestion from '../components/CardQuestion.js';
import { ToggleButton, Button, Card, CardContent } from '@mui/material';
import { useHistory } from 'react-router';

function QuestionPage() {
  const [idx, setIdx] = useState(0);
  const [alignment, setAlignment] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [answers, setAnswers] = useState([]);
  const history = useHistory();

  const report = {
    score: 0,
  }

  useEffect(() => {
    localStorage.setItem('report', JSON.stringify(report));
  }, [])

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;  
  }

  const questions = JSON.parse(localStorage.getItem('questions'));    

  const arrayAnswers = (id) => {
    const correctAnswer = ([
      <ToggleButton
        value="correct"
        size="small"
        key=""
        name={ decodeHTML(questions[id].correct_answer) }
      >
        { decodeHTML(questions[id].correct_answer) }
      </ToggleButton>]);
    const incorrctAnswers = questions[id].incorrect_answers.map((answer, index) => (
      <ToggleButton
        value={ index }
        size="small"
        key={ index }
        name={ decodeHTML(answer) }
      >
        { decodeHTML(answer) }
      </ToggleButton>
    ));
    const sortedAnswers = [...correctAnswer, ...incorrctAnswers];
    setAnswers(sortedAnswers.sort(() => Math.round(Math.random()) - 0.5));
  }  

  function handleNextQuestion() {
    const MAX_ARRAY = JSON.parse(localStorage.getItem('questionsNumber')).questionsNumber;    
    if ((idx + 1) === MAX_ARRAY) {      
      return history.push('/report');
    } else {
      setIdx(idx + 1);
      arrayAnswers(idx + 1);
      setDisabled(true);
      setAlignment('');
    }
  }

  return(
    <Card sx={{ mx: '20px', mt: '100px', minWidth: 275 }}>
      <CardContent>
        <CardQuestion
          idx={ idx }
          setDisabled={ setDisabled }
          alignment={ alignment }
          setAlignment={ setAlignment }
          arrayAnswers={ arrayAnswers }
          answers={ answers }
        />
        <div>
          <Button
            variant="outlined"
            size="small"
            onClick={ handleNextQuestion }
            disabled={ disabled }
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestionPage;