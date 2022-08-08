import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../services/fetch';
import { emailRegex, minPass, okCode } from '../services/constants';
import MyContext from '../context/context';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { setRole } = useContext(MyContext);

  const login = async () => {
    const data = { email, password };
    const { status, responseData } = await fetchLogin(data);
    if (status === okCode) {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('name', responseData.userData.name);
      localStorage.setItem('email', responseData.userData.email);
      localStorage.setItem('role', responseData.userData.role);
      setRole(responseData.userData.role);
    } else {
      setError(true);
      setErrMsg(responseData.message);
    }
  };

  useEffect(() => {
    if (emailRegex.test(email) && password.length >= minPass) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <form className="block">
      <div className="field">
        <label htmlFor="email" className="label">
          Login:
          <div className="control">
            <input
              type="email"
              name="email"
              data-test-id="common_login__input-email"
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
          <input
            type="password"
            name="password"
            data-test-id="common_login__input-password"
            placeholder="Senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className="input"
          />
        </label>
      </div>
      <div className="field">
        <button
          type="button"
          data-test-id="common_login__button-login"
          disabled={ disabled }
          onClick={ login }
          className="button is-primary login-btn"
        >
          Login
        </button>
      </div>
      <div className="field">
        <Link
          to="/register"
          data-test-id="common_login__button-register"
          className="button login-btn"
        >
          Ainda não tenho conta
        </Link>
      </div>
      { error ? (
        <div className="block">
          <p
            className="invalid-text"
            data-test-id="common_login__element-invalid-email"
          >
            { errMsg }
          </p>
        </div>
      ) : null }
    </form>
  );
}

export default LoginForm;
