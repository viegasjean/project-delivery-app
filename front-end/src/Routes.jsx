import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartProvider from './context/cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login/Login';
import Products from './pages/Products';
import Register from './pages/Register/Register';
import CustomerOrders from './pages/CustomerOrders/CustomerOrders';
import SellerOrders from './pages/SellerOrders/SellerOrders';
import Admin from './pages/Admin/Admin';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/admin/manage" component={ Admin } />
      <CartProvider>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </CartProvider>
    </Switch>
  );
}

export default Routes;
