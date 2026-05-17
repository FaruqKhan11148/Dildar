import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Contact from './pages/Contact';

import Checkout from './pages/Checkout';

import OrderStatus from './pages/OrderStatus';

import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/order-status/:id" element={<OrderStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
