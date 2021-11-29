import React from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';

function Report() {
  const { score } = JSON.parse(localStorage.getItem('report'));
  const report = JSON.parse(localStorage.getItem('report'));
  const reportKeys = Object.keys(report);
  const questionsKeys = reportKeys.filter((key) => key !== 'score');
  const { questionsNumber } = JSON.parse(localStorage.getItem('questionsNumber'));

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;  
  }

  const list = () => {
    return questionsKeys.map((key, index) => { return (
      <Paper elevation={0} key={ index } variant="outlined square" sx={{ mt: "10px", padding: "10px", backgroundColor: "#F8F8F8" }}>
        <Typography variant="h6" sx={{ mt: "10px" }}>
            { `Question ${index + 1}` }: 
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: "18px" }}>
          { decodeHTML(report[key][0]) }
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: "10px", fontSize: "18px" }}>
            Your answer: 
        </Typography>
        <Typography variant="subtitle1">
            { decodeHTML(report[key][1]) }
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: "10px", fontSize: "18px" }}>
        Correct answer: 
        </Typography>
        <Typography variant="subtitle1">
          { decodeHTML(report[key][2]) }
        </Typography>
      </Paper>
    )})
  }

  return(
    <Card sx={{ mx: '20px', mt: '100px', minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: "20px"}}>
          Your Results
        </Typography>
        <Paper elevation={0} sx={{ px: "15px" }}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Number of questions: { questionsNumber }
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "left",  }}>
            Total score: { score }
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Mistakes: { questionsNumber - score }
          </Typography>
        </Paper>
        <Paper elevation={0} variant="outlined" sx={{ mt: "10px", padding: "20px" }}>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Detailed Report
          </Typography>
          { list() }
        </Paper>
      </CardContent>
    </Card>
  )
}

export default Report;