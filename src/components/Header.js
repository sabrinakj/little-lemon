import React from "react";
import logo from '../assets/icons_assets/Logo.svg';
import Nav from "./Nav";
import './Header.css';

function Header() {
  return (
  <header id="home">
    <img src={logo} alt="Little Lemon Logo"/>
    <Nav isVertical={false}/>
  </header>
  )
}

export default Header;