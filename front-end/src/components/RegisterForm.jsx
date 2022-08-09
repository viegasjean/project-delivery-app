import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import { minName, emailRegex, minPass, created } from '../services/constants';
import { fetchRegister } from '../services/fetch';
import { setKey } from '../services/localStorage';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { setRole } = useContext(MyContext);

  const register = async () => {
    const data = { name, email, password, role: 'customer' };
    const { status, responseData } = await fetchRegister(data);
    if (status === created) {
      setKey('token', responseData.token);
      setKey('name', data.name);
      setKey('email', data.email);
      setKey('role', data.role);
      setRole(data.role);
    } else {
      setError(true);
      setErrMsg(responseData.message);
    }
  };

  useEffect(() => {
    if (
      name.length >= minName
      && emailRegex.test(email)
      && password.length >= minPass
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password]);

  return (
    <form>
      <div className="field">
        <label htmlFor="name" className="label">
          Nome:
          <div className="control">
            <input
              type="text"
              name="name"
              data-testid="common_register__input-name"
              placeholder="Nome Completo"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              className="input"
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email:
          <div className="control">
            <input
              type="email"
              name="email"
              data-testid="common_register__input-email"
              placeholder="Email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              className="input"
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label htmlFor="password" className="label">
          Senha:
          <div className="control">
            <input
              type="password"
              name="password"
              data-testid="common_register__input-password"
              placeholder="Senha"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              className="input"
            />
          </div>
        </label>
      </div>
      <div className="field">
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ disabled }
          onClick={ register }
          className="button is-primary login-btn"
        >
          Cadastrar
        </button>
      </div>
      <div className="field">
        <Link to="/login" className="button login-btn">
          Voltar para Login
        </Link>
      </div>
      {error ? (
        <div className="block">
          <p
            className="invalid-text"
            data-testid="common_login__element-invalid-email"
          >
            {errMsg}
          </p>
        </div>
      ) : null}
    </form>
  );
}

export default RegisterForm;
