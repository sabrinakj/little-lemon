import React from 'react';
import './Footer.css';
import logo from '../assets/icons_assets/small_logo.png';
import Nav from '../components/Nav.js'

function Footer() {
  return (
    <footer className='footer' id='contact'>
      <div className='footer-container'>
        <div className='footer-logo-bg'>
          <img className='footer-img' src={logo} alt="Little Lemon Logo"/>
        </div>

        <div className='footer-element'>
          <h2 className='footer-nav'>Navigation</h2>
          {/*
          <p>Home</p>
          <p>About</p>
          <p>Menu</p>
          <p>Reservation</p>
          <p>Order Online</p>
          <p>Login</p> */}
          <Nav isVertical={true} />
        </div>

        <div className='footer-element'>
          <h2>Contact</h2>
          <p>
            9601 Best street way<br/>Chicago Illinois
          </p>
          <p>(456)-567-6789</p>
          <p>bookings@littlelemon.com</p>


        </div>

        <div className='footer-element'>
          <h2>Social Media Links</h2>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Youtube</p>
        </div>

      </div>


    </footer>
  );
}

export default Footer;

