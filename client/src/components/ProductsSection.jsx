import "./ProductsSection.css";

import { useEffect, useState } from "react";
import API from "../api/axios";   // 👈 changed here

import ProductCard from "./ProductCard";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // 👇 changed here (clean + scalable)
      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="products-section">

      {/* GLOW BACKGROUNDS */}
      <div className="products-glow-left"></div>
      <div className="products-glow-right"></div>

      <div className="container products-content">

        {/* HEADER */}
        <div className="products-header text-center">

          <p className="products-subtitle">
            Fresh Daily Stock
          </p>

          <h2 className="products-title">
            Premium Fresh <span>Chicken Products</span>
          </h2>

          <p className="products-description">
            Freshly cut hygienic chicken delivered quickly
            to your doorstep with premium quality and
            affordable prices.
          </p>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="products-loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="row g-4">

              {products.map((product) => (
                <div className="col-sm-6 col-lg-4" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}

            </div>

            {/* EMPTY STATE */}
            {products.length === 0 && (
              <div className="empty-state text-center">
                <h2>No Products Found</h2>
                <p>Products will appear here soon.</p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default ProductsSection;