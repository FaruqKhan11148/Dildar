import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';

import AdminOrders from './pages/AdminOrders';
import AdminLogin from './admin/pages/AdminLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrders from './pages/MyOrders';

function App() {
  const isAdmin = localStorage.getItem('adminToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/checkout" element={<Checkout />} />

        {/* SINGLE ORDER TRACKING */}
        <Route path="/order-status/:id" element={<OrderStatus />} />

        {/* USER ALL ORDERS */}
        <Route path="/my-orders" element={<MyOrders />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route
          path="/admin/orders"
          element={isAdmin ? <AdminOrders /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
