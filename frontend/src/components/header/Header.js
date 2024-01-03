import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div id="headerTop">
      <div class="house">
        <Link to="/">
          <i class="bi bi-house-door color-house"></i>
        </Link>
      </div>
      <div>
      </div>
      <div class="linksTop">
        <Link to="/login" class="text-black text">
          <span class="borde-Ultimo">
            <i class="bi bi-person"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;