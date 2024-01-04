import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return(
    <div className="login-container">
    <div className="login-form">
      <form className="container-def">
        <h1 className="text-center mb-5 mt-2">Reset de senha</h1>
        <div className="container-user container-def form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="email"
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="container-pass container-def form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="code"
          />
          <label for="floatingInput">
            Code
          </label>
        </div>
        <div className="container-pass container-def form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingInput"
            placeholder="Nova senha"
          />
          <label for="floatingInput">
            Nova Senha
          </label>
        </div>
        <button type="submit" className="button-entrar">
          Resetar
        </button>
        <div className="links">
          <Link className="register-link" to="/register">
            <div>Não tem conta? Register</div>
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
  };
  
  export default ResetPassword;