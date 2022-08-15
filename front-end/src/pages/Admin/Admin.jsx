import React from 'react';
import Navbar from '../../components/Navbar';
import Form from '../../components/AdmForm';
import style from './style.module.css';

function Admin() {
  return (
    <>
      <Navbar />
      <main className={ style.main }>
        <Form />
      </main>
    </>
  );
}

export default Admin;
