import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <form className="container-def">
          <h1 className="text-center mb-5 mt-2">Login</h1>
          <div className="container-user container-def form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Usuário"
            />
            <label for="floatingInput">Usuário</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Senha"
            />
            <label htmlFor="password" for="floatingInput">
              Senha
            </label>
          </div>
          <button type="submit" className="button-entrar">
            Entrar
          </button>
          <div className="links">
            <Link className="forgot-password-link" to="/forgot-password">
              <div>Esqueci Senha?</div>
            </Link>
            <Link className="register-link" to="/register">
              <div>Não tem conta? Register</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
