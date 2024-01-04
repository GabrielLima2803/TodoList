import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return(
      <div className="login-container">
      <div className="login-form">
        <form className="container-def">
          <h1 className="text-center mb-5 mt-2">Esqueci Senha</h1>
          <div className="container-user container-def form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="email"
            />
            <label for="floatingInput">Email</label>
          </div>
          <button type="submit" className="button-entrar">
            Enviar
          </button>
          <div className="links">
            <Link className="forgot-password-link" to="/reset-password">
              <div>Reset de senha?</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
    )
};
  
  export default ForgotPassword;