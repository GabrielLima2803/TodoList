import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setLoggedIn(!!storedToken);

    if (isLoggedIn) {
      const storedUserInfo = localStorage.getItem("userInfo");
      const user = storedUserInfo ? JSON.parse(storedUserInfo) : { name: "" };
      setUserName(user.name);
    }
  }, [isLoggedIn]);

  return (
    <div id="headerTop">
      <div className="house">
        <Link to="/">
          <i className="bi bi-house-door color-house"></i>
        </Link>
      </div>
      <div>
        {isLoggedIn && <p className="AuthName">{`Lista de tarefas de ${userName}`}</p>}
      </div>
      <div className="linksTop">
        <Link to="/login" className="text-black text">
          <span className="borde-Ultimo">
            <i className="bi bi-person"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
