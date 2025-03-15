import React from "react";
import logo from '../assets/icons_assets/Logo.svg';
import Nav from "./Nav";
import { Link } from "react-router-dom";
import './Header.css';
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

function Header() {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const hamburgerClass = isHamburgerClicked ? "header-hamburger-clicked" : "header-hamburger";
  const handleHamburgerClick = () => {
    // console.log("Hamburger clicked");
    setIsHamburgerClicked(!isHamburgerClicked);
  };

  return (
  <header className="header-container">
    <Link to="/">
      <img className="header-img" src={logo} alt="Little Lemon Logo"/>
    </Link>
    <div className={hamburgerClass} onClick={handleHamburgerClick}>
      <HamburgerMenu />
    </div>
    <Nav isVertical={false} isHamburgerClicked={isHamburgerClicked}/>
  </header>
  )
}

export default Header;