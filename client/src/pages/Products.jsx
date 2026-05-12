import "./Products.css";

import Navbar from "../components/Navbar";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

function Products() {

  return (
    <div className="products-page">

      <Navbar />

      <ProductsSection />

      <Footer />

    </div>
  );
}

export default Products;