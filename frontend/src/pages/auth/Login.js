import React, { useState, useEffect } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedUserInfo = localStorage.getItem("userInfo");

  const initialUser = storedUserInfo ? JSON.parse(storedUserInfo) : { name: "" };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user: initialUser,
  });

  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(!!storedToken);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken && storedUserInfo) {
      setFormData({
        ...formData,
        user: JSON.parse(storedUserInfo),
      });
      setLoggedIn(true);
    }
  }, []);

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

        localStorage.setItem("authToken", responseData.token);
        localStorage.setItem("userInfo", JSON.stringify(responseData.user));

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("taskList");
    setLoggedIn(false);
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
            <Link to="/" className="mt-3">
          <i className="bi bi-house-door color-house"></i>
        </Link>
          </div>
        </form>
      </div>
      {isLoggedIn && (
        <div className="user-info">
          <h1>Bem-vindo, {formData.user.name}!</h1>
          <Link to="/todo-list" className="reset">
          <h3 className="text-center mt-2 mb-3 anote">Anote Suas Tarefas</h3>
          </Link>
          <div className="btn-logout">
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
