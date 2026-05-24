import './Checkout.css';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';

// 👉 IMPORTANT: make sure this file exists
import LocationPicker from '../components/LocationPicker';

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const product = state?.product;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    location: null,
  });

  const totalPrice = product ? product.price * quantity : 0;

  const increaseQuantity = () => setQuantity((q) => q + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  // =========================
  // PAYMENT HANDLER
  // =========================
  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!product) {
        alert('Product not found');
        return;
      }

      // ❌ FIXED: removed address check
      if (!formData.customerName || !formData.phone || !formData.location) {
        alert('Please fill all details & select location');
        return;
      }

      const { data } = await API.post('/payment/create-order', {
        amount: totalPrice,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        name: 'Chicken Shop',
        description: 'Fresh Chicken Order',
        image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',

        handler: async function (response) {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              customerName: formData.customerName,
              phone: formData.phone,

              // ✅ NEW LOCATION SYSTEM
              location: formData.location,

              product: {
                productId: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
              },

              quantity,
              totalAmount: totalPrice,
            };

            const token = localStorage.getItem('userToken');
            const verifyRes = await API.post(
              '/payment/verify-payment',
              verifyData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            const orderId = verifyRes.data?.order?._id;

            if (!orderId) {
              alert('Payment successful but order failed');
              return;
            }

            navigate(`/order-status/${orderId}`);
          } catch (err) {
            alert(
              err?.response?.data?.message || 'Payment verification failed',
            );
          }
        },

        prefill: {
          name: formData.customerName,
          contact: formData.phone,
        },

        theme: {
          color: '#ef4444',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-container">
        <h1>Checkout</h1>

        {/* PRODUCT CARD */}
        <div className="checkout-cart">
          <h2>Selected Product</h2>

          <div className="checkout-cart-item">
            <div className="checkout-cart-left">
              <img
                className="checkout-cart-img"
                src={product?.image}
                alt={product?.name}
              />

              <div>
                <h3>{product?.name}</h3>
                <p>₹{product?.price}</p>
                <p>Total: ₹{totalPrice}</p>
              </div>
            </div>

            <div className="checkout-cart-right qty-box">
              <button className="qty-btn" onClick={decreaseQuantity}>
                <FaMinus />
              </button>

              <span>{quantity} KG</span>

              <button className="qty-btn" onClick={increaseQuantity}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="checkout-form">
          <input
            name="customerName"
            placeholder="Full Name"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                customerName: e.target.value,
              }))
            }
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />

          {/* MAP LOCATION PICKER */}
          <div style={{ marginTop: '15px' }}>
            <LocationPicker
              setLocation={(loc) =>
                setFormData((prev) => ({
                  ...prev,
                  location: loc,
                }))
              }
            />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="checkout-summary">
          <h2>Total: ₹{totalPrice}</h2>

          <button onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
