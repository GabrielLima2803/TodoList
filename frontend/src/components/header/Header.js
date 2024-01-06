import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div id="headerTop">
      <div className="house">
        <Link to="/">
          <i className="bi bi-house-door color-house"></i>
        </Link>
      </div>
      <div>
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