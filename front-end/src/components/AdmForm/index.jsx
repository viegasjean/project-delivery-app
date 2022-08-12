import React from 'react';
import style from './style.module.css';

function Form() {
  return (
    <div className={ style.container }>
      <h1>Cadastrar novo usuário</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            id="password"
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="role"
            id="role"
          >
            <option value="administrator">Administrator</option>
            <option value="sellet">Vendedor</option>
            <option value="customer">Comprador</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Form;
