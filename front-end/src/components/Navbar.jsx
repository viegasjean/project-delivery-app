import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getKey } from '../services/localStorage';

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
    <nav>
      { data.role === 'customer'
      && (
        <button
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
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { data.name }
      </span>
      <button
        type="button"
        onClick={ logout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}

export default Navbar;
