// src/App.jsx
import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import formikForm from "./components/formikForm";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>React Form Handling — Controlled vs Formik</h1>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div>
          <RegistrationForm />
        </div>
        <div>
          <formikForm />
        </div>
      </div>
    </div>
  );
}
