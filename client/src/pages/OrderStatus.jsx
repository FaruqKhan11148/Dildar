import './OrderStatus.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';

function OrderStatus() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ORDER ON LOAD
  // =========================
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // =========================
  // SOCKET REAL-TIME UPDATE
  // =========================
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('orderUpdated', (updatedOrder) => {
      if (updatedOrder?._id?.toString() === id) {
        setOrder(updatedOrder);
      }
    });

    return () => {
      socket.off('orderUpdated');
      socket.off('connect');
    };
  }, [id]);

  const steps = [
    'Pending Payment',
    'Payment Verification',
    'Preparing',
    'On The Way',
    'Delivered',
  ];

  const currentStep = order ? steps.indexOf(order.status) : 0;
  const isCancelled = order?.status === 'Cancelled';

  return (
    <div className="status-page">
      <Navbar />

      <div className="status-container">
        {loading ? (
          <h1 className="loading-text">Loading...</h1>
        ) : !order ? (
          <h1 className="loading-text">Order Not Found</h1>
        ) : (
          <>
            <p className="status-subtitle">Track Your Order</p>
            <h1 className="status-title">Order Status</h1>

            <div className="status-card">
              <h2>{order.customerName}</h2>
              <p>{order.address}</p>

              <div className="status-product">
                <img
                  src={order.product?.image}
                  alt={order.product?.name}
                  className="status-product-img"
                />

                <div>
                  <h3>{order.product?.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                </div>
              </div>

              <div className="status-price">₹{order.totalAmount}</div>

              <div className="payment-status">
                <p>Payment Method: {order.paymentMethod}</p>
                <p>
                  Payment Status: {order.isPaid ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>

            {isCancelled ? (
              <div className="cancel-box">
                <h2>❌ Order Cancelled</h2>
                <p>Refund will be processed soon.</p>
              </div>
            ) : (
              <div className="steps-container">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`step ${
                      index <= currentStep ? 'active' : ''
                    }`}
                  >
                    <div className="step-circle">{index + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default OrderStatus;