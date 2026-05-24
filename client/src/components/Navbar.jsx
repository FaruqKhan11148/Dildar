import './Navbar.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);

  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    user = null;
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Chicken<span>Hub</span>
        </Link>

        {/* HAMBURGER */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* LINKS */}
        <div className={`navbar-links ${open ? 'active' : ''}`}>
          <div style={{}} className="close-icon" onClick={() => setOpen(false)}>
            <FaTimes />
          </div>
          {/* COMMON LINKS */}
          <span className="user-badge">👋 {user?.name || 'User'}</span>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <a href="/#products" onClick={closeMenu}>
            Products
          </a>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {/* ================= USER SECTION ================= */}
          <div className="nav-section">
            {userToken ? (
              <div className="user-box">
                <Link to="/my-orders" className="user-link">
                  My Orders
                </Link>
                <br />
                <button className="user-logout-btn" onClick={handleUserLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="user-login-btn" onClick={closeMenu}>
                User Login
              </Link>
            )}
          </div>

          {/* ================= ADMIN SECTION ================= */}
          <div className="nav-section">
            {!adminToken ? (
              <Link to="/admin/login" className="admin-btn" onClick={closeMenu}>
                Admin Login
              </Link>
            ) : (
              <div className="admin-box">
                <Link
                  to="/admin/orders"
                  className="admin-btn"
                  onClick={closeMenu}
                >
                  Admin Panel
                </Link>

                <button
                  onClick={handleAdminLogout}
                  className="admin-logout-btn"
                >
                  Admin Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
