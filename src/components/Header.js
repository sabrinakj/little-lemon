import React from "react";
import logo from '../assets/icons_assets/Logo.svg';
import Nav from "./Nav";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
  <header id="home">
    <Link to="/" className="custom-link">
      <img className="header-img" src={logo} alt="Little Lemon Logo"/>
    </Link>
    <Nav isVertical={false}/>
  </header>
  )
}

export default Header;