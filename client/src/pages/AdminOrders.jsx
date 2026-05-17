import './AdminOrders.css';

import { useEffect, useState } from 'react';
import API from '../api/axios';
import socket from '../socket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    socket.on('orderUpdated', (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on('newOrder', (newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
    });

    return () => {
      socket.off('orderUpdated');
      socket.off('newOrder');
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/admin/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <Navbar />

      <div className="container py-5">
        <h1 className="admin-title text-center mb-5">
          Admin Orders Dashboard
        </h1>

        {orders.length === 0 ? (
          <h3 className="text-center">No Orders Yet</h3>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="admin-card">
              <div className="admin-top">
                <div>
                  <h2>{order.customerName}</h2>
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                </div>

                <div className="admin-status">
                  <span>{order.status}</span>
                </div>
              </div>

              <div className="admin-product">
                <img src={order.product?.image} alt={order.product?.name} />

                <div>
                  <h3>{order.product?.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <h4>₹{order.totalAmount}</h4>
                </div>
              </div>

              <div className="admin-payment">
                <p>Payment: {order.paymentMethod}</p>
              </div>

              <div className="admin-actions">
                <button onClick={() => updateStatus(order._id, 'Preparing')}>
                  Preparing
                </button>

                <button onClick={() => updateStatus(order._id, 'On The Way')}>
                  On The Way
                </button>

                <button onClick={() => updateStatus(order._id, 'Delivered')}>
                  Delivered
                </button>

                <button onClick={() => updateStatus(order._id, 'Cancelled')}>
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AdminOrders;