import './Contact.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Message sent successfully! We will contact you soon 🚚');
  };

  return (
    <div className="contact-page">
      {/* GLOW BACKGROUNDS */}
      <div className="contact-glow-left"></div>
      <div className="contact-glow-right"></div>

      <div className="contact-content">
        <Navbar />

        <div className="container py-5">
          {/* HEADER */}
          <div className="text-center contact-header">
            <p className="contact-subtitle">Get In Touch</p>

            <h1 className="contact-title">
              Contact <span>Dildar Chicken</span>
            </h1>

            <p className="contact-desc">
              We are always ready to deliver fresh, hygienic and premium quality
              chicken directly to your doorstep 🚚
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="row g-5">
            {/* LEFT */}
            <div className="col-lg-6">
              <div className="contact-stack">
                {/* PHONE */}
                <a href="tel:+919876543210" className="contact-link">
                  <div className="contact-card red">
                    <div className="icon-box red">
                      <FaPhone />
                    </div>

                    <div>
                      <h2>Phone</h2>
                      <p>+91 9876543210</p>
                    </div>
                  </div>
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <div className="contact-card green">
                    <div className="icon-box green">
                      <FaWhatsapp />
                    </div>

                    <div>
                      <h2>WhatsApp</h2>
                      <p>Fast customer support anytime</p>
                    </div>
                  </div>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://instagram.com/dildarchicken"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <div className="contact-card pink">
                    <div className="icon-box pink">
                      <FaInstagram />
                    </div>

                    <div>
                      <h2>Instagram</h2>
                      <p>@dildarchicken</p>
                    </div>
                  </div>
                </a>

                {/* LOCATION */}
                <div className="contact-card red">
                  <div className="icon-box red">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h2>Location</h2>
                    <p>Mangalore, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-6">
              <div className="contact-form-box">
                <h2>Send Message</h2>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-direct-btn"
                >
                  Chat Directly On WhatsApp
                </a>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Your Name" required />

                  <input type="text" placeholder="Phone Number" required />

                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    required
                  ></textarea>

                  <button type="submit">
                    <FaPaperPlane />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Contact;
