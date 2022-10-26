import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../images/logo.svg";

export const Header = () => {
  return (
    <header>
      <nav className="nav">
        <div className="nav__links">
          <Link to="/" className="nav__logo">
            <img src={logo} alt="" />
          </Link>
          <NavLink to="/egeoge" className="nav__links-item">
            ЕГЭ/ОГЭ
          </NavLink>
          <NavLink to="/ballsystem" className="nav__links-item">
            Бальная система
          </NavLink>
        </div>

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
