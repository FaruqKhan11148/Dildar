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
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
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
      const token = localStorage.getItem('adminToken');

      const { data } = await API.get('/admin/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // ORDER STATUS UPDATE
  // =========================
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');

      await API.put(
        `/admin/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // PAYMENT VERIFICATION
  // =========================
  const verifyPayment = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');

      await API.put(
        `/admin/orders/${id}/status`,
        {
          status: 'Preparing',
          paymentStatus: 'Verified',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // PAYMENT REJECT
  // =========================
  const rejectPayment = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');

      await API.put(
        `/admin/orders/${id}/status`,
        {
          status: 'Cancelled',
          paymentStatus: 'Rejected',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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

              {/* ========================= */}
              {/* TOP */}
              {/* ========================= */}
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

              {/* ========================= */}
              {/* PRODUCT */}
              {/* ========================= */}
              <div className="admin-product">
                <img
                  src={order.product?.image}
                  alt={order.product?.name}
                />

                <div>
                  <h3>{order.product?.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <h4>₹{order.totalAmount}</h4>
                </div>
              </div>

              {/* ========================= */}
              {/* PAYMENT */}
              {/* ========================= */}
              <div className="admin-payment">
                <p>Payment Method: {order.paymentMethod}</p>

                <p>
                  Payment Status:
                  {' '}
                  {order.paymentStatus || 'Pending'}
                </p>

                {/* SCREENSHOT */}
                {order.paymentScreenshot && (
                  <a
                    href={order.paymentScreenshot}
                    target="_blank"
                    rel="noreferrer"
                    className="payment-proof-btn"
                  >
                    View Payment Screenshot
                  </a>
                )}
              </div>

              {/* ========================= */}
              {/* ACTIONS */}
              {/* ========================= */}
              <div className="admin-actions">

                {/* PAYMENT VERIFICATION */}
                {order.paymentStatus !== 'Verified' &&
                  order.status !== 'Cancelled' && (
                    <>
                      <button
                        onClick={() => verifyPayment(order._id)}
                      >
                        Verify Payment
                      </button>

                      <button
                        onClick={() => rejectPayment(order._id)}
                      >
                        Reject Payment
                      </button>
                    </>
                  )}

                {/* ON THE WAY */}
                {order.paymentStatus === 'Verified' &&
                  order.status === 'Preparing' && (
                    <button
                      onClick={() =>
                        updateStatus(order._id, 'On The Way')
                      }
                    >
                      On The Way
                    </button>
                  )}

                {/* DELIVERED */}
                {order.status === 'On The Way' && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, 'Delivered')
                    }
                  >
                    Delivered
                  </button>
                )}

                {/* CANCEL */}
                {order.status !== 'Delivered' &&
                  order.status !== 'Cancelled' && (
                    <button
                      onClick={() =>
                        updateStatus(order._id, 'Cancelled')
                      }
                    >
                      Cancel
                    </button>
                  )}
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