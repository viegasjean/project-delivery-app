import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartProvider from './context/cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login/Login';
import Products from './pages/Products';
import Register from './pages/Register/Register';
import Orders from './pages/Orders';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/register" component={ Register } />
       {/* creio que essa não seja a rota correta, usei para testar o componente, porém fucionou */}
      <Route exact path="/sale" component={ Orders } /> 
      <CartProvider>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </CartProvider>
    </Switch>
  );
}

export default Routes;
