import React, { useContext, useState } from 'react';
import CardQuestion from '../components/CardQuestion.js';
import { Button, Card, CardContent } from '@mui/material';
import InitialPageContext from '../context/InitialPageContext.js';
import { useHistory } from 'react-router';

function QuestionPage() {
  const [idx, setIdx] = useState(0);
  const [alignment, setAlignment] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  function handleNextQuestion() {
    const MAX_ARRAY = JSON.parse(localStorage.getItem('questionsNumber')).questionsNumber;
    console.log(MAX_ARRAY);
    if ((idx + 1) === MAX_ARRAY) {      
      return history.push('/report');
    } else {
      setIdx(idx + 1)
      setDisabled(true);
      setAlignment('')
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