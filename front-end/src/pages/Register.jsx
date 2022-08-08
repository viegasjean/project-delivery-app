import React from 'react';
import RegisterForm from '../components/RegisterForm';
import RoleRedirection from '../components/RoleRedirection';

function Register() {
  return (
    <section>
      <h1>Cadastro</h1>
      <RegisterForm />
      <RoleRedirection />
    </section>
  );
}

export default Register;
