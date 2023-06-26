import React from "react";
import { Link } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <div>
      <nav>
        <h3>Product List</h3>
        <span>
          <Link to="/">Home</Link>
          <Link to="/registration">Регистрация</Link>
          <Link to="/authenication">Войти</Link>
        </span>
      </nav>
    </div>
  );
}

export default Header;
