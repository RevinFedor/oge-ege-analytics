import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";

export const Header = () => {
  return (
    <header>
      <nav className="nav">
        <Link to="/landingpage" className="nav__logo">
          <img src={logo} alt="" />
        </Link>
        <div className="nav__user">
          <div className="nav__study">
            <button className="nav__btn">Зарегестрироваться</button>
            <button className="nav__btn nav__btn-active">Войти</button>
          </div>
        </div>
      </nav>
    </header>
  );
};
