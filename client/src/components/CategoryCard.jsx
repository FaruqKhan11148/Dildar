import './CategoryCard.css';
import { Link } from "react-router-dom";

function CategoryCard({ title, image }) {
  return (
    <div className="category-card">
      {/* IMAGE */}
      <div className="category-image-wrapper">
        <img src={image} alt={title} className="category-image" />
      </div>

      {/* OVERLAY */}
      <div className="category-overlay"></div>

      {/* CONTENT */}
      <div className="category-content">
        <p className="category-subtext">Fresh & Hygienic</p>

        <h2 className="category-title">{title}</h2>

        <Link to="/products" className="category-btn">
          Explore
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
