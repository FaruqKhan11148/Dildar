import './Navbar.css';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          Dildar <span>Chicken</span>
        </Link>

        {/* HAMBURGER */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* LINKS */}
        <div className={`navbar-links ${open ? 'active' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <a href="/#products" onClick={() => setOpen(false)}>
            Products
          </a>

          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
