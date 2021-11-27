import React, { useContext } from 'react';
import { Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material';
import InitialPageContext from '../context/InitialPageContext';

function Start() {
  const { nQuestions, setNext } = useContext(InitialPageContext);
  return(
    <Card sx={{ mx: '20px', mt: '100px', maxWidth: 'sm', minWidth: 275 }} fixed>
      <CardContent>
        <Typography variant='h7'>You selected { nQuestions } questions.</Typography>
        <Button
            sx={{ mt: '10px', maxWidth: '300px' }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Start
          </Button>
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
      </CardContent>
    </Card>
  )
}

export default Start;