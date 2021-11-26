import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material';

function NumberOfQuestions() {
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
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  

  return(
    <Card sx={{ mx: 'auto', maxWidth: 'sm', minWidth: 275 }} fixed>
      <CardContent>
      <Typography variant='h5'>Questions{ '&' }Answers</Typography>
      <form onSubmit={formik.handleSubmit}>
          <InputLabel htmlFor="questions">How many questions?</InputLabel>
          <TextField
            id="questions"
            name="questions"
            max="20"
            type="number"
            value={formik.values.questions}
            onChange={formik.handleChange}
            error={formik.touched.questions && Boolean(formik.errors.questions)}
            helperText={formik.touched.questions && formik.errors.questions}
          />
          <Button color="primary" variant="contained" fullWidth  type="submit">
            Continue
          </Button>
      </form>
    </CardContent>
  </Card>
  )
}

export default NumberOfQuestions;