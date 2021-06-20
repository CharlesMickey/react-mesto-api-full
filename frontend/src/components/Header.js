import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/Logo.svg";

function Header({ isLoggedIn, onLogOut, email }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип названия сайта Место"
      />
      {isLoggedIn ? (
        <p className={`header__text`}>
          {email}
          <Link
            className={`header__text header__text_link`}
            to={"/signin"}
            onClick={onLogOut}
          >
            Выйти
          </Link>
        </p>
      ) : (
        <Switch>
          <Route path={"/signin"}>
            <Link className={`header__text`} to={"/signup"}>
              Регистрация
            </Link>
          </Route>
          <Route path={"/signup"}>
            <Link className={`header__text`} to={"/signin"}>
              Вход
            </Link>
          </Route>
        </Switch>
      )}
    </header>
  );
}

export default Header;
