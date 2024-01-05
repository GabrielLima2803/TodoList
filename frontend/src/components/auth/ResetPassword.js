import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.msg);
        setError(null);
      } else {
        setSuccessMessage(null);
        setError(data.error || "Erro interno do servidor");
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
          <h1 className="text-center mb-5 mt-2">Reset de senha</h1>

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
              type="text"
              className="form-control"
              id="codeInput"
              name="code"
              placeholder="Code"
              onChange={handleChange}
            />
            <label htmlFor="codeInput">Code</label>
          </div>
          <div className="container-pass container-def form-floating">
            <input
              type="password"
              className="form-control"
              id="newPasswordInput"
              name="newPassword"
              placeholder="Nova Senha"
              onChange={handleChange}
            />
            <label htmlFor="newPasswordInput">Nova Senha</label>
          </div>
          <button type="submit" className="button-entrar">
            Resetar
          </button>
          <div className="links">
            {error && <p className="error-message mt-2">{error}</p>}
            {successMessage && (
              <div>
                <p className="success-message mt-2">{successMessage}</p>
                <Link className="register-link" to="/login">
                  <div>Login</div>
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
