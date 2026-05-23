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

    // NEW ORDER
    socket.on('newOrder', (newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
    });

    // ORDER UPDATED
    socket.on('orderUpdated', (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id.toString() === updatedOrder._id.toString()
            ? updatedOrder
            : order,
        ),
      );
    });

    return () => {
      socket.off('newOrder');
      socket.off('orderUpdated');
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

  // Refund
  const markAsRefunded = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');

      const { data } = await API.put(
        `/payment/refund/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('✅ REFUND SUCCESS:', data);

      fetchOrders();
    } catch (error) {
      console.log('❌ REFUND ERROR:', error);

      alert(
        error?.response?.data?.message || 'Refund failed',
      );
    }
  };

  return (
    <div className="admin-page">
      <Navbar />

      <div className="container py-5">
        <h1 className="admin-title text-center mb-5">Admin Orders Dashboard</h1>

        {orders.length === 0 ? (
          <h3 className="text-center">No Orders Yet</h3>
        ) : (
          orders
            .filter((order) => order.status !== 'Delivered')
            .map((order) => (
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
                <img src={order.product?.image} alt={order.product?.name} />

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
                  Payment:
                  {order.isPaid ? ' Paid ✅' : ' Unpaid ❌'}
                </p>
              </div>

              {/* ========================= */}
              {/* DELIVERY LOCATION */}
              {/* ========================= */}
              {order.location && (
                <div className="admin-location">
                  <h3>📍 Delivery Location</h3>

                  {/* DETAILED MAP */}
                  <iframe
                    title="delivery-location"
                    width="100%"
                    height="320"
                    style={{
                      border: 0,
                      borderRadius: '16px',
                      marginTop: '12px',
                    }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${order.location.lat},${order.location.lng}&z=17&output=embed`}
                  ></iframe>

                  {/* ROUTE BUTTON */}
                  <a
                    href={`https://www.google.com/maps/dir/${14.621866},${75.628707}/${order.location.lat},${order.location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="route-btn"
                  >
                    🚚 Open Fastest Route
                  </a>
                </div>
              )}

              {/* ========================= */}
              {/* ACTIONS */}
              {/* ========================= */}
              <div className="admin-actions">
                {/* PENDING → PREPARING */}
                {order.status === 'Pending Payment' && (
                  <>
                    <button
                      onClick={() => updateStatus(order._id, 'Preparing')}
                    >
                      Start Preparing
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, 'Cancelled')}
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* PREPARING → ON THE WAY */}
                {order.status === 'Preparing' && (
                  <button onClick={() => updateStatus(order._id, 'On The Way')}>
                    On The Way
                  </button>
                )}

                {/* ON THE WAY → DELIVERED */}
                {order.status === 'On The Way' && (
                  <button onClick={() => updateStatus(order._id, 'Delivered')}>
                    Delivered
                  </button>
                )}

                {/* FINAL STATES */}
                {order.status === 'Delivered' && (
                  <button disabled>Delivered Successfully</button>
                )}

                {/* {order.status === 'Cancelled' && (
                  <button disabled>Order Cancelled</button>
                )} */}
                {order.status === 'Cancelled' && (
                  <div className="refund-box">
                    <button disabled>Order Cancelled</button>

                    <div style={{ marginTop: '10px' }}>
                      <p>
                        <strong>Paid Amount:</strong> ₹{order.totalAmount}
                      </p>

                      <p>
                        <strong>Payment Method:</strong> {order.paymentMethod}
                      </p>

                      <p>
                        <strong>Customer Phone:</strong> {order.phone}
                      </p>

                      <p>
                        <strong>Refund Status:</strong>{' '}
                        {order.isRefunded ? 'Refunded ✅' : 'Not Refunded ❌'}
                      </p>

                      {!order.isRefunded && (
                        <button
                          onClick={() => markAsRefunded(order._id)}
                          style={{ marginTop: '10px' }}
                        >
                          Pay Back
                        </button>
                      )}
                    </div>
                  </div>
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
