import React, { useState, useEffect } from "react";
import Typed from 'typed.js';
import "./HomeCss.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    document.body.classList.add("home-background");
    const options = {
      strings: [
        "Seja bem-vindo a sua lista de tarefas.",
        "Primeiro faça o login para adicionar tarefas à sua lista.",
        "Clique no ícone abaixo para fazer o login."
      ],
      typeSpeed: 50, 
      backSpeed: 30, 
      backDelay: 1500, 
      startDelay: 500, 
      showCursor: false, 
      loop: true, 
    };

    const typed = new Typed(".type p", options);

    const storedToken = localStorage.getItem("authToken");
    setLoggedIn(!!storedToken);

    return () => {
      document.body.classList.remove("home-background");
      typed.destroy();
    };
  }, []);

  return (
    <div className="container-black">
      <div className="redes login-home">
        <a className="reset-1" href="https://github.com/GabrielLima2803" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github icone mr-4"></i>
        </a>
        <a className="reset-1" href="https://www.linkedin.com/in/gabriel-lima-5a04a2294/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin icone"></i>
        </a>
      </div>
      <div className="center">
        <div className="type typed-text">
          <p></p>
        </div>
        <div className="login-home">
          {isLoggedIn ? (
            <>
              <p>Você já está logado</p>
              <Link className="reset-1" to="/todo-list">
                <button className="btn btn-light">Ir para lista de tarefas</button>
              </Link>
            </>
          ) : (
            <Link className="reset-1" to="/login">
              <i className="bi bi-person-circle icone"></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
