import './CategoriesSection.css';

import { useNavigate } from 'react-router-dom';

import CategoryCard from './CategoryCard';

function CategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    {
      _id: 1,
      name: 'Chicken Breast',
      price: 220,
      image:
        'https://assets.tendercuts.in/product/C/H/594e4559-f6b7-417d-9aac-d0643b5711d3.jpg',
    },

    {
      _id: 2,
      name: 'Chicken Wings',
      price: 180,
      image:
        'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop',
    },

    {
      _id: 3,
      name: 'Fresh Curry Cut',
      price: 250,
      image:
        'https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const handleOrderNow = (product) => {
    navigate('/checkout', {
      state: {
        product,
      },
    });
  };

  return (
    <section className="categories-section" id="categories">
      {/* GLOW */}
      <div className="categories-glow-left"></div>

      <div className="categories-glow-right"></div>

      <div className="container position-relative">
        {/* TITLE */}
        <div className="text-center mb-5">
          <p className="categories-subtitle">Fresh Categories</p>

          <h2 className="categories-title">
            Explore Our
            <span> Chicken Cuts</span>
          </h2>

          <p className="categories-description">
            Freshly cut premium quality chicken available for fast home
            delivery.
          </p>
        </div>

        {/* CARDS */}
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-md-4" key={category._id}>
              <CategoryCard
                title={category.name}
                image={category.image}
                price={category.price}
                onOrder={() => handleOrderNow(category)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
