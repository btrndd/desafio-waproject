import React, { useContext } from 'react';
import InitialPageContext from '../context/InitialPageContext';
import NumberOfQuestions from '../components/NumberOfQuestions';
import Start from '../components/Start';

function InitialPage() {
  const { next } = useContext(InitialPageContext);
  return(
    <>
      { next ? <Start /> : <NumberOfQuestions /> }
    </>
  )
}

export default InitialPage;