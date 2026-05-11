import "./Products.css";

import Navbar from "../components/Navbar";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

function Products() {
  return (
    <div className="products-page">

      <Navbar />

      {/* HEADER */}
      <div className="container text-center products-header">

        <h1 className="products-title">
          Fresh Products
        </h1>

        <p className="products-desc">
          Choose fresh and hygienic chicken products
          delivered to your doorstep.
        </p>

      </div>

      {/* PRODUCTS */}
      <ProductsSection />

      <Footer />

    </div>
  );
}

export default Products;