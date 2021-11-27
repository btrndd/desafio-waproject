import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InitialPageContext from './InitialPageContext';


function InitialPageProvider({ children }) {
  const [next, setNext] = useState(false);
  const [nQuestions, setNQuestions] = useState(NaN);
  const [questions, setQuestions] = useState([]);

  const contextValue = {
    next,
    setNext,
    nQuestions,
    setNQuestions,
    questions,
    setQuestions,
  };

  return (
    <InitialPageContext.Provider value={ contextValue }>
      { children }
    </InitialPageContext.Provider>
  );
}

InitialPageProvider.propTypes = {
  children: PropTypes.element,
};

export default InitialPageProvider;