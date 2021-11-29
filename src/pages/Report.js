import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Report() {
  const score = JSON.parse(localStorage.getItem('report')).score;
  const { questionsNumber } = JSON.parse(localStorage.getItem('questionsNumber'));

  return(
    <Card sx={{ mx: '20px', mt: '100px', minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: "20px"}}>
          Your Results
        </Typography>
        <div>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Number of questions: { questionsNumber }
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Total score: { score }
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Mistakes: { questionsNumber - score }
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default Report;