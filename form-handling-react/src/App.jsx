// src/App.jsx
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Form Handling in React — Controlled vs Formik</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <RegistrationForm />
        </div>
        <div style={{ flex: 1 }}>
          <FormikForm />
        </div>
      </div>
    </div>
  );
}
