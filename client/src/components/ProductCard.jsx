import "./ProductCard.css";
import { useContext } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">

      {/* BADGE */}
      <div className="product-badge">
        Fresh
      </div>

      {/* IMAGE */}
      <div className="product-image-wrapper">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-image-overlay"></div>

      </div>

      {/* CONTENT */}
      <div className="product-content">

        {/* CATEGORY + RATING */}
        <div className="product-top-row">

          <span className="product-category">
            {product.category}
          </span>

          <div className="product-rating">
            <FaStar />
            <span>4.9</span>
          </div>

        </div>

        {/* NAME */}
        <h2 className="product-name">
          {product.name}
        </h2>

        {/* DESCRIPTION */}
        <p className="product-desc">
          {product.description}
        </p>

        {/* DELIVERY */}
        <div className="product-delivery">
          🚚 Fast Delivery Available
        </div>

        {/* BOTTOM ROW */}
        <div className="product-bottom">

          {/* PRICE */}
          <div className="product-price">

            <p>Starting From</p>

            <div className="price-row">
              <span className="price">₹{product.price}</span>
              <span className="unit">/kg</span>
            </div>

          </div>

          {/* BUTTON */}
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;