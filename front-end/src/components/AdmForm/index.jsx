import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { adminRegisterSchema } from '../../utils/schemas';
import { register } from '../../services/api';
import { created } from '../../services/constants';
import { getKey } from '../../services/localStorage';

function Form() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { token } = getKey('user');
    const res = await register(data, token);
    if (res.status === created) {
      setData({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
      setError('');
    } else {
      setError(res.data);
    }
  };

  useEffect(() => {
    const { name, email, password, role } = data;
    adminRegisterSchema.isValid({
      name,
      email,
      password,
      role,
    }).then((validation) => {
      if (validation) setIsDisabled(false);
      else setIsDisabled(true);
    });
  }, [data]);

  return (
    <div className={ style.container }>
      <h1>Cadastrar novo usuário</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            onChange={ handleChange }
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            id="name"
            value={ data.name }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            onChange={ handleChange }
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            id="email"
            value={ data.email }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ handleChange }
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            id="password"
            value={ data.password }
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
            name="role"
            id="role"
            value={ data.role }
          >
            <option value="administrator">Administrator</option>
            <option value="seller">Vendedor</option>
            <option value="customer">Comprador</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          disabled={ isDisabled }
          onClick={ submit }
        >
          Cadastrar
        </button>
      </form>
      { error && (
        <span
          data-testid="admin_manage__element-invalid-register"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Form;
