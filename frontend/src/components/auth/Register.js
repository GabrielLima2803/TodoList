import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <form className="container-def">
          <h1 className="text-center mb-5 mt-2">Register</h1>
          <div className="container-user container-def form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Usuário"
            />
            <label htmlFor="floatingInput">Usuário</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label htmlFor="floatingInput">
              Email
            </label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Senha"
            />
            <label htmlFor="floatingInput">
              Senha
            </label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Confirma Senha"
            />
            <label htmlFor="floatingInput">
              Confirmar Senha
            </label>
          </div>
          <button type="submit" className="button-entrar">
            Registrar
          </button>
          <div className="links">
            <Link className="forgot-password-link" to="/forgot-password">
              <div>Esqueci Senha?</div>
            </Link>
            <Link className="register-link" to="/login">
              <div>Não tem conta? Login</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
