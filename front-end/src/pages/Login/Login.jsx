import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './style.module.css';

import { loginSchema } from '../../utils/schemas/index';
import { login } from '../../services/api';
import { okCode } from '../../services/constants';
import { setKey } from '../../services/localStorage';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    const { email, password } = data;
    loginSchema.isValid({
      email,
      password,
    }).then((validation) => {
      if (validation) setIsDisabled(false);
      else setIsDisabled(true);
    });
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(data);
    if (res.status === okCode) {
      setKey('deliveryUser', res.data);
      if (res.data.role === 'administrator') {
        history.push('/admin/manage');
      } else if (res.data.role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/customer/products');
      }
    } else {
      setError(res.data);
    }
  };

  const toRegister = () => {
    history.push('/register');
  };

  return (
    <div className={ style.container }>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            onChange={ handleChange }
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={ handleChange }
            data-testid="common_login__input-password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          onClick={ submit }
          disabled={ isDisabled }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ toRegister }
        >
          Ainda não tenho conta
        </button>
      </form>
      { error && (
        <span
          data-testid="common_login__element-invalid-email"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Login;