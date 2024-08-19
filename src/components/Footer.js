import React from 'react';
import './Footer.css';
import logo from '../assets/icons_assets/Logo.svg';
import Nav from '../components/Nav.js'

function Footer() {
  return (
    <footer className='footer' id='contact'>
      {/* <p>&copy; 2024 Little Lemon. All rights reserved.</p>
      <p>Contact us: info@littlelemon.com</p> */}
      <div className='footer-container'>
        <div>
          <img src={logo} alt="Little Lemon Logo"/>
        </div>
        <div className='footer-nav'>
          <h1>Navigation</h1>
          <Nav isVertical={true}/>
        </div>
        <div>
          <h1>Contact</h1>
        </div>
        <div>
          <h1>Connect</h1>
        </div>
      </div>


    </footer>
  );
}

export default Footer;

