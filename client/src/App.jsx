import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';

import AdminOrders from './pages/AdminOrders';
import AdminLogin from './admin/pages/AdminLogin';


function App() {
  const isAdmin = localStorage.getItem('adminToken');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-status/:id" element={<OrderStatus />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin/orders"
          element={
            isAdmin ? <AdminOrders /> : <Navigate to="/admin/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;