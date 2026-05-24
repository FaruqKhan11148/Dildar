import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');

      const { data } = await API.get('/orders/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        paddingTop: '100px',
      }}
    >
      <Navbar />

      <div
        style={{
          width: '90%',
          maxWidth: '700px',
          margin: 'auto',
        }}
      >
        <h1 style={{ marginBottom: '25px' }}>My Orders</h1>

        {orders.length === 0 ? (
          <h3>No Orders Found</h3>
        ) : (
          orders.map((order) => (
            <Link
              key={order._id}
              to={`/order-status/${order._id}`}
              style={{
                display: 'block',
                background: '#111',
                padding: '18px',
                borderRadius: '16px',
                marginBottom: '16px',
                textDecoration: 'none',
                color: 'white',
                border: '1px solid #222',
              }}
            >
              <h2>{order.product?.name}</h2>

              <p>Status: {order.status}</p>

              <p>Total: ₹{order.totalAmount}</p>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyOrders;