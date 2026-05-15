import "./CategoryCard.css";

function CategoryCard({
  title,
  image,
  price,
  onOrder,
}) {

  return (

    <div className="category-card">

      {/* IMAGE */}
      <div className="category-image-wrapper">

        <img
          src={image}
          alt={title}
          className="category-image"
        />

      </div>

      {/* OVERLAY */}
      <div className="category-overlay"></div>

      {/* CONTENT */}
      <div className="category-content">

        <p className="category-subtext">
          Fresh & Hygienic
        </p>

        <h2 className="category-title">
          {title}
        </h2>

        <p className="category-price">
          ₹{price}
        </p>

        <button
          className="category-btn"
          onClick={onOrder}
        >
          Order Now
        </button>

      </div>

    </div>

  );
}

export default CategoryCard;