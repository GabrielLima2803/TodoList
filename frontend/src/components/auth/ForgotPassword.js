import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
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
          <h1 className="text-center mb-5 mt-2">Esqueci Senha</h1>

          <div className="container-user container-def form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <button type="submit" className="button-entrar">
            Enviar
          </button>
          <div className="links">
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <div>
                <p className="success-message">{successMessage}</p>
                <Link className="forgot-password-link" to="/reset-password">
                  Reset de senha
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
