import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default Routes;
