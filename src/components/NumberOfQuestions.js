import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material';
import InitialPageContext from '../context/InitialPageContext';

function NumberOfQuestions() {
  const { setNext, setNQuestions } = useContext(InitialPageContext);
  const validationSchema = yup.object({
    questions: yup
      .number()
      .integer()
      .positive()
      .min(1)
      .max(20)
      .nullable(true),
  });

    const formik = useFormik({
      initialValues: {
        questions: '',
      },
      validationSchema: validationSchema,
      onSubmit: (value) => { 
        setNext(true);
        setNQuestions(value.questions);
      },
    });  

  return(
    <Card sx={{ mx: '20px', mt: '100px', maxWidth: 'sm', minWidth: 275 }}>
      <CardContent>
      <Typography variant='h5'>Questions{ '&' }Answers</Typography>
      <form onSubmit={formik.handleSubmit}>
          <InputLabel sx={{ mt: '20px' }} htmlFor="questions">How many questions?</InputLabel>
          <TextField
            id="questions"
            name="questions"
            max="20"
            type="number"
            sx={{ mt: '10px' }}
            value={formik.values.questions}
            onChange={formik.handleChange}
            error={formik.touched.questions && Boolean(formik.errors.questions)}
            helperText={formik.touched.questions && formik.errors.questions}
          />
          <Button
            sx={{ mt: '10px', maxWidth: '300px' }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Continue
          </Button>
      </form>
    </CardContent>
  </Card>
  )
}

export default NumberOfQuestions;