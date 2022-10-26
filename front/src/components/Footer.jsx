import logo from "../images/logo.svg";
import vk from "../images/vk.svg";
import tg from "../images/tg.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer__content">
      <div className="container__landing">
        <footer className="footer">
          <div className="footer__info">
            <Link to="/">

              <img src={logo} alt="" className="footer__logo" />
            </Link>

            <h3>Основная информация</h3>
            <p>Регистрация</p>
            <p>Авторизация</p>
            <p>Политика конфидециальности</p>
            <h3>Выполнено командой OneWeb</h3>
            <p>© 2003 — 2022, ЕГЭ, ОГЭ</p>
          </div>
          <div className="footer__links">
            <Link to="/" className="nav__logo">
              <img src={tg} alt="" />
            </Link>
            <Link to="/" className="nav__logo">
              <img src={vk} alt="" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};
