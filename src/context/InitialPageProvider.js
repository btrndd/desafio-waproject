import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InitialPageContext from './InitialPageContext';


function InitialPageProvider({ children }) {
  const [next, setNext] = useState(false);

  const contextValue = {
    next,
    setNext,
  };

  return (
    <InitialPageContext.Provider value={ contextValue }>
      { children }
    </InitialPageContext.Provider>
  );
}

InitialPageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default InitialPageProvider;