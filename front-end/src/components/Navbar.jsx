import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getKey } from '../services/localStorage';
import style from './style.module.css';

function Navbar() {
  const [data, setData] = useState({});
  const history = useHistory();

  const getUser = () => {
    const user = getKey('user');
    setData(user);
  };

  const toProdutcs = () => {
    history.push('/customer/products');
  };

  const toOrders = () => {
    history.push('/customer/orders');
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav className={ style.navbar }>
        { data.role === 'customer'
      && (
        <button
          className={ style.buttonProducts }
          type="button"
          onClick={ toProdutcs }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
      )}
        { data.role === 'customer'
      && (
        <button
          className={ style.buttonOrders }
          type="button"
          onClick={ toOrders }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </button>
      )}
        { data.role === 'seller'
      && (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          PEDIDOS
        </button>
      )}
        { data.role === 'administrator'
      && (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          GERENCIAR USUÁRIOS
        </button>
      )}
        <span
          className={ style.user }
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { data.name }
        </span>
        <button
          className={ style.buttonLogout }
          type="button"
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </nav>
      <hr />
    </>
  );
}

export default Navbar;
