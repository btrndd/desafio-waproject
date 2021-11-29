import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import InitialPageContext from '../context/InitialPageContext';
import axios from 'axios';

function Start() {
  const { setNext, setQuestions } = useContext(InitialPageContext);
  const [isFetch, setIsFetch] = useState(false);
  const history = useHistory();

  const questionsNumber = JSON.parse(localStorage.getItem('questionsNumber')).questionsNumber;

  const options = {
    url: `https://opentdb.com/api.php?amount=${questionsNumber}`,
    method: 'GET',
    timeout: 4000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  async function handleStartBtn() {
    setIsFetch(true);  
    const request = await axios(options);
    setQuestions(request.data.results);
    localStorage.setItem('questions', JSON.stringify(request.data.results));
    history.push('/questions');
  }

  return(
    <Card sx={{ mx: '20px', mt: '100px', minWidth: 275 }}>
      <CardContent>
        <Typography variant='h6'>You selected { questionsNumber } questions.</Typography>
        <div>
          { isFetch ? (  
            <Button
                sx={{ mt: '10px', maxWidth: '300px' }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={ handleStartBtn }
              >
                <CircularProgress color="inherit" />
              </Button>
            ) : (
              <Button
                sx={{ mt: '10px', maxWidth: '300px' }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={ handleStartBtn }
              >
                Start
              </Button>
            ) }
            <Button
              sx={{ mt: '10px', maxWidth: '300px' }}
              color="error"
              variant="outlined"
              fullWidth
              type="submit"
              onClick={ () => setNext(false) }
            >
              Cancel
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Start;