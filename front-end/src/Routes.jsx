import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartProvider from './context/cart';
import Login from './pages/Login/Login';
import Products from './pages/Products';
import Register from './pages/Register/Register';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/register" component={ Register } />
      <CartProvider>
        <Route exact path="/customer/products" component={ Products } />
      </CartProvider>
    </Switch>
  );
}

export default Routes;
