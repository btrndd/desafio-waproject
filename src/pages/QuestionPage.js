import React from 'react';
import CardQuestion from '../components/CardQuestion.js';
import { Card, CardContent } from '@mui/material';

function QuestionPage() {
  return(
    <Card sx={{ mx: '20px', mt: '100px', minWidth: 275 }}>
      <CardContent>
        <CardQuestion />
      </CardContent>
    </Card>
  )
}

export default QuestionPage;