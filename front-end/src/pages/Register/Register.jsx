import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from '../Login/style.module.css';

import { registerSchema } from '../../utils/schemas';
import { register } from '../../services/api';
import { created } from '../../services/constants';
import { setKey } from '../../services/localStorage';

function Register() {
  const [data, setData] = useState({
    name: '',
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
    const { name, email, password } = data;
    registerSchema.isValid({
      name,
      email,
      password,
    }).then((validation) => {
      if (validation) setIsDisabled(false);
      else setIsDisabled(true);
    });
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(data);
    if (res.status === created) {
      setKey('user', res.data);
      history.push('/customer/products');
    } else {
      setError(res.data);
    }
  };

  const toLogin = () => {
    history.push('/');
  };

  return (
    <div className={ style.container }>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            id="name"
            onChange={ handleChange }
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            onChange={ handleChange }
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            onChange={ handleChange }
            data-testid="common_register__input-password"
          />
        </label>
        <button
          className={ style.buttonRegister }
          type="button"
          onClick={ submit }
          disabled={ isDisabled }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        <button
          className={ style.buttonRegister }
          type="button"
          onClick={ toLogin }
        >
          Voltar para Login
        </button>
      </form>
      { error && (
        <span
          data-testid="common_register__element-invalid_register"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Register;
