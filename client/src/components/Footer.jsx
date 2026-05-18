import './Footer.css';

import {
  FaWhatsapp,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      {/* GLOW BACKGROUNDS */}
      <div className="footer-glow-left"></div>

      <div className="footer-glow-right"></div>

      <div className="footer-container">
        {/* GRID */}
        <div className="footer-grid">
          {/* BRAND */}
          <div className="footer-box">
            <h2 className="footer-logo">
              <span>Chicken</span>
              <span className="text-red">Chicken</span>
            </h2>

            <p className="footer-text">
              Premium quality fresh chicken delivered hygienically and quickly
              to your doorstep.
            </p>

            <div className="footer-socials">
              <div className="social-icon whatsapp">
                <FaWhatsapp size={20} />
              </div>

              <div className="social-icon instagram">
                <FaInstagram size={20} />
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer-box">
            <h3 className="footer-title">Quick Links</h3>

            <ul className="footer-list">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <a href="#products">Products</a>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* DELIVERY */}
          <div className="footer-box">
            <h3 className="footer-title">Delivery</h3>

            <ul className="footer-list">
              <li>Fast Home Delivery</li>
              <li>Fresh Daily Stock</li>
              <li>Premium Quality</li>
              <li>Hygienic Packaging</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-box">
            <h3 className="footer-title">Contact</h3>

            <div className="footer-contact">
              <p>
                <FaPhone className="icon red" />
                +91 9876543210
              </p>

              <p>
                <FaWhatsapp className="icon green" />
                WhatsApp Support
              </p>

              <p>
                <FaMapMarkerAlt className="icon red" />
                Mangalore, Karnataka
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© 2026 ---- Chicken. All rights reserved.</p>

          <button
            className="scroll-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
