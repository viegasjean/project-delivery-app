import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './context';

function Provider({ children }) {
  const [role, setRole] = useState('');

  const state = useMemo(() => ({
    role, setRole,
  }), [role]);

  return (
    <MyContext.Provider value={ state }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
