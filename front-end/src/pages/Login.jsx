import React from 'react';
import LoginForm from '../components/LoginForm';
import RoleRedirection from '../components/RoleRedirection';

function Login() {
  return (
    <section>
      <LoginForm />
      <RoleRedirection />
    </section>
  );
}

export default Login;
