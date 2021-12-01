import { ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function CardQuestion({ idx, setDisabled, alignment, setAlignment, arrayAnswers, answers }) {
  const [isSorted, setIsSorted] = useState(false)

  useEffect(() => {
    arrayAnswers(idx);      
    setIsSorted(true);
  }, []);  
    
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;  
    }

    const questions = JSON.parse(localStorage.getItem('questions'));    

    const handleClickAnswer = ({ target }) => {
      const score = JSON.parse(localStorage.getItem('report'));
      console.log(target.name)
      if (target.value === 'correct') {        
        const report = {
          ...score,
          score: (score.score + 1),
          [`question${idx + 1}`]: [questions[idx].question, target.name, questions[idx].correct_answer]
        };
        localStorage.setItem('report', JSON.stringify(report));
      } else if (target.value !== 'correct') {
        const report = {
          ...score,
          score: (score.score),          
          [`question${idx + 1}`]: [questions[idx].question, target.name, questions[idx].correct_answer],
        };
        localStorage.setItem('report', JSON.stringify(report));
      }           
      setAlignment('correct');
      setDisabled(false);
    }     

    return (        
        <>
          <div>
            <Typography variant="h4" sx={{ mb: "10px" }}>Question {idx + 1}</Typography>
            <Typography variant="body2" sx={{ mb: "10px" }}>{decodeHTML(questions[idx].category)}</Typography>
            <Typography variant="button">
              { decodeHTML(questions[idx].question) }
            </Typography>
          </div>
          <ToggleButtonGroup
            color="success"
            size="small"
            sx={{ mt: "20px", mb: "20px" }}
            orientation="vertical"
            value={ alignment }
            exclusive
            onClick={(event) => handleClickAnswer(event) }
          >
            { isSorted && answers }
          </ToggleButtonGroup>
        </>
    );
  }

  export default CardQuestion;