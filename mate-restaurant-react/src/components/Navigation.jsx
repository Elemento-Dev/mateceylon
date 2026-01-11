import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="nav-level-1">
          <div className="nav-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Mate Response" />
            </Link>
          </div>

          <Link to="/reservation" className="nav-cta">
            MAKE A RESERVATION
          </Link>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`menu-overlay ${isOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>&times;</button>
        <div className="menu-links">
          <Link to="/" onClick={toggleMenu}>HOME</Link>
          <Link to="/menu" onClick={toggleMenu}>MENUS</Link>
          <Link to="/services" onClick={toggleMenu}>SERVICES</Link>
          <Link to="/gallery" onClick={toggleMenu}>GALLERY</Link>
          <Link to="/about" onClick={toggleMenu}>ABOUT</Link>
          <Link to="/reservation" onClick={toggleMenu}>RESERVATION</Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
