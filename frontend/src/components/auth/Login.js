import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user: { name: "" },
  });

  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setError(null);
        console.log("Usuário logado com sucesso. Token:", responseData.token);
        console.log("Usuário:", responseData.user);
        setFormData((prevData) => ({
          ...prevData,
          user: responseData.user,
        }));
        setLoggedIn(true);
      } else {
        setError(responseData.msg || "Erro interno do servidor");
      }
    } catch (error) {
      setError("Erro ao fazer a requisição. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className={`login-form ${isLoggedIn ? "hidden" : ""}`}>
        <form className="container-def" onSubmit={handleSubmit}>
          <h1 className="text-center mb-5 mt-2">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="container-user container-def form-floating">
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
          <button type="submit" className="button-entrar">
            Entrar
          </button>
          <div className="links">
            <Link className="forgot-password-link" to="/forgot-password">
              <div>Esqueci Senha?</div>
            </Link>
            <Link className="register-link" to="/register">
              <div>Não tem conta? Registrar</div>
            </Link>
          </div>
        </form>
      </div>
      {isLoggedIn && (
        <div className="user-info">
          <h1>Bem-vindo, {formData.user.name}!</h1>
          {/* Adicione outras informações do usuário conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default Login;
