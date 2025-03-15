import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useState } from "react";

function Nav({ isHamburgerClicked, isVertical }) {
  // console.log('isHamburgerClicked', isHamburgerClicked);

  const navClass = isVertical ? "nav-ul-list-vertical" : "nav-ul-list";
  let navContainerClass = isHamburgerClicked ? "nav-container" : "nav-container-hidden";
  // console.log(navContainerClass);

  const [isSideNavOpen, setIsSideNavOpen] = useState(isHamburgerClicked);
  // console.log("isSideNavOpen", isSideNavOpen);
  const displayStatus = isSideNavOpen ? "nav-list" : "display-none";
  // console.log("displayStatus", displayStatus);
  const handleSidenavClosing = () => {
    // console.log("isSideNavOpen", isSideNavOpen);
    setIsSideNavOpen(!isSideNavOpen);
    // console.log("isSideNavOpen", isSideNavOpen);
  };

  return (
    <nav className={navContainerClass}>
      <ul className={navClass}>
        <li className={displayStatus} onClick={handleSidenavClosing}>X</li>
        <li className="nav-list"></li>
        <li className="nav-list">
          <Link to="/" className="nav-custom-link">Home</Link>
        </li>
        <li className="nav-list">
          <Link to="/about" className="nav-custom-link">About</Link>
        </li>
        <li className="nav-list">
          <Link to="/menu" className="nav-custom-link">Menu</Link>
        </li>
        <li className="nav-list">
          <Link to="/reservation" className="nav-custom-link">Reservation</Link>
        </li>
        <li className="nav-list">
          <Link to="/orderonline" className="nav-custom-link">Order Online</Link>
        </li>
        <li className="nav-list">
          <Link to="/login" className="nav-custom-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
