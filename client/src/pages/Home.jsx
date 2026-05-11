import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <Hero />

      <CategoriesSection />

      <ProductsSection />

      <Footer />
    </div>
  );
}

export default Home;