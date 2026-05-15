import "./ProductCard.css";

import { FaStar } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const handleOrderNow = () => {

    navigate("/checkout", {
      state: {
        product,
      },
    });

  };

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

        {/* BOTTOM */}
        <div className="product-bottom">

          {/* PRICE */}
          <div className="product-price">

            <p>Starting From</p>

            <div className="price-row">

              <span className="price">
                ₹{product.price}
              </span>

              <span className="unit">
                /kg
              </span>

            </div>

          </div>

          {/* ORDER */}
          <button
            className="add-btn btn-order"
            onClick={handleOrderNow}
          >
            Order Now
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;