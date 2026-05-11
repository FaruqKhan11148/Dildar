import "./CategoriesSection.css";

import CategoryCard from "./CategoryCard";

function CategoriesSection() {
  const categories = [
    {
      title: "Chicken Breast",
      image:
        "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Chicken Wings",
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Fresh Curry Cut",
      image:
        "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="categories-section">

      {/* GLOW */}
      <div className="categories-glow-left"></div>

      <div className="categories-glow-right"></div>

      <div className="container position-relative">

        {/* TITLE */}
        <div className="text-center mb-5">

          <p className="categories-subtitle">
            Fresh Categories
          </p>

          <h2 className="categories-title">
            Explore Our
            <span> Chicken Cuts</span>
          </h2>

          <p className="categories-description">
            Freshly cut premium quality chicken
            categories available for fast and hygienic
            home delivery.
          </p>

        </div>

        {/* CARDS */}
        <div className="row g-4">

          {categories.map((category, index) => (
            <div
              className="col-md-4"
              key={index}
            >
              <CategoryCard
                title={category.title}
                image={category.image}
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default CategoriesSection;