import Navbar from '../components/Navbar';

import Hero from '../components/Hero';

import ProductsSection from '../components/ProductsSection';

import Footer from '../components/Footer';

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <Hero />

      <ProductsSection />

      <Footer />
    </div>
  );
}

export default Home;
