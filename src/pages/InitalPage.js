import React, { useContext } from 'react';
import InitialPageContext from '../context/InitialPageContext';
import NumberOfQuestions from './NumberOfQuestions';
import Start from './Start';

function InitialPage() {
  const { next } = useContext(InitialPageContext);
  return(
    <>
      { next ? <Start /> : <NumberOfQuestions /> }
    </>
  )
}

export default InitialPage;