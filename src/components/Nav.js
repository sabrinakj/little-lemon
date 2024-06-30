import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li href="#home">
          <Link to="/">Home</Link>
        </li>
        <li href="#about">
          <Link to="/about">About</Link>
        </li>
        <li href="#menu">
          <Link to="/menu">Menu</Link>
        </li>
        <li href="#reservation">
          <Link to="/reservation">Reservation</Link>
        </li>
        <li href="#orderonline">
          <Link to="/orderonline">Order Online</Link>
        </li>
        <li href="#login">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
