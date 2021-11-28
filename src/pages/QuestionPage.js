import React, { useContext, useState } from 'react';
import CardQuestion from '../components/CardQuestion.js';
import { Button, Card, CardContent } from '@mui/material';
import InitialPageContext from '../context/InitialPageContext.js';
import { useHistory } from 'react-router';

function QuestionPage() {
  const [idx, setIdx] = useState(0);
  const [alignment, setAlignment] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { nQuestions } = useContext(InitialPageContext);
  const history = useHistory();

  function handleNextQuestion() {
    const MAX_ARRAY = nQuestions;
    if (idx === MAX_ARRAY) {      
      return history.push('/report');
    }
    setIdx(idx + 1)
    setDisabled(true);
    setAlignment('')
    // this.setState({ nextQuestion: false });
    // this.setState({
    //   idx: idx + 1,
    //   stopTimer: false,
    //   toggle: false,
    //   disabled: false,
    // }, () => this.setState({ nextQuestion: true }));
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