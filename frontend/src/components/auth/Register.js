import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Usuário registrado com sucesso!");
        setError(null);
      } else {
        setSuccessMessage(null);
        setError(data.msg || "Erro interno do servidor");
      }
    } catch (error) {
      setSuccessMessage(null);
      setError("Erro ao fazer a requisição. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form className="container-def" onSubmit={handleSubmit}>
          <h1 className="text-center mb-5 mt-2">Junte-se</h1>
  
          <div className="container-user container-def form-floating">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              placeholder="Usuário"
              onChange={handleChange}
            />
            <label htmlFor="nameInput">Usuário</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <label htmlFor="emailInput">Email</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
            />
            <label htmlFor="passwordInput">Senha</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              name="confirmPassword"
              placeholder="Confirma Senha"
              onChange={handleChange}
            />
            <label htmlFor="confirmPasswordInput">Confirmar Senha</label>
          </div>
          <button type="submit" className="button-entrar">
            Registrar
          </button>
          {error && <p className="error-message text-center mt-2">{error}</p>}
          {successMessage && (
            <p className="success-message text-center mt-2">{successMessage}</p>
          )}
          <div className="links">
            <Link className="register-link mt-1" to="/login">
              Já tem uma conta?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
