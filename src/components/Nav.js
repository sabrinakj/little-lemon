import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav({ isVertical, isHamburgerClicked, setIsHamburgerClicked }) {
  const navClass = isVertical ? "nav-ul-list-vertical" : "nav-ul-list";
  const navContainerClass = isHamburgerClicked ? "nav-container" : "nav-container-hidden";
  const showCloseButton = isHamburgerClicked ? "show-close-sidenav-button" : "hide-close-sidenav-button";
  return (
    <nav className={navContainerClass}>

      <div className="nav-no-mobile">
       <ul className={navClass}>
          <li className="nav-list">
            <Link to="/" className="nav-custom-link">Home</Link>
          </li>
          <li className="nav-list">
            <Link to="/about" className="nav-custom-link">About</Link>
          </li>
          <li className="nav-list">
            <Link to="/menu" className="nav-custom-link" state={{ isInOrderOline: false }}>Menu</Link>
          </li>
          <li className="nav-list">
            <Link to="/reservation" className="nav-custom-link">Reservation</Link>
          </li>
          <li className="nav-list">
            <Link to="/menu" className="nav-custom-link" state={{ isInOrderOline: true }}>Order Online</Link>
          </li>
          <li className="nav-list">
            <Link to="/login" className="nav-custom-link">Login</Link>
          </li>
        </ul>
      </div>

      <div className="nav-mobile">
        <ul className={navClass}>
          <li className={showCloseButton} onClick={setIsHamburgerClicked}>X</li>
          <li className="nav-list"></li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/" className="nav-custom-link">Home</Link>
          </li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/about" className="nav-custom-link">About</Link>
          </li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/menu" className="nav-custom-link" state={{ isInOrderOline: false }}>Menu</Link>
          </li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/reservation" className="nav-custom-link">Reservation</Link>
          </li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/menu" className="nav-custom-link" state={{ isInOrderOline: true }}>Order Online</Link>
          </li>
          <li className="nav-list" onClick={setIsHamburgerClicked}>
            <Link to="/login" className="nav-custom-link">Login</Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default Nav;
