import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";



function Nav({ isVertical }) {
  const navClass = isVertical ? "ul-list-vertical" : "ul-list";
  return (
    <nav className="nav-container">
      <ul className={navClass}>
        <li className="list">
          <Link to="/" className="custom-link">Home</Link>
        </li>
        <li className="list">
          <Link to="/about" className="custom-link">About</Link>
        </li>
        <li className="list">
          <Link to="/menu" className="custom-link">Menu</Link>
        </li>
        <li className="list">
          <Link to="/reservation" className="custom-link">Reservation</Link>
        </li>
        <li className="list">
          <Link to="/orderonline" className="custom-link">Order Online</Link>
        </li>
        <li className="list">
          <Link to="/login" className="custom-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
