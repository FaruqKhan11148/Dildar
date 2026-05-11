import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">

      {/* BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f"
        alt="chicken"
        className="hero-bg"
      />

      {/* OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
      <div className="container hero-content text-center">

        <h1 className="hero-title">
          Fresh Chicken
          <span>Delivered Fast</span>
        </h1>

        <p className="hero-subtitle">
          Premium quality fresh chicken delivered
          hygienically to your doorstep.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">

          <Link to="/products" className="btn-order">
            Order Now
          </Link>

          <Link to="/products" className="btn-view">
            View Products
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;