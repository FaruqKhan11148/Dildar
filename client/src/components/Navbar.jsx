import './Navbar.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);

  const adminToken = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

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

          {/* 🔥 ADMIN BUTTON */}
          {!adminToken ? (
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="admin-btn"
            >
              Admin Login
            </Link>
          ) : (
            <>
              <Link
                to="/admin/orders"
                onClick={() => setOpen(false)}
                className="admin-btn"
              >
                Admin Panel
              </Link>

              <button
                onClick={handleLogout}
                className="admin-logout-btn"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;