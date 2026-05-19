import './Checkout.css';

import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { FaMinus, FaPlus } from 'react-icons/fa';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import API from '../api/axios';

function Checkout() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const product = state?.product;

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
  });

  const totalPrice = product.price * quantity;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  // =========================
  // PAYMENT
  // =========================
  const handlePayment = async () => {
    try {
      setLoading(true);

      // =========================
      // VALIDATION
      // =========================
      if (!formData.customerName || !formData.phone || !formData.address) {
        alert('Please fill all details');

        setLoading(false);

        return;
      }

      // =========================
      // CREATE RAZORPAY ORDER
      // =========================
      const { data } = await API.post('/payment/create-order', {
        amount: totalPrice,
      });

      // =========================
      // RAZORPAY OPTIONS
      // =========================
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.amount,

        currency: data.currency,

        name: 'Faruq Chicken Shop',

        description: 'Chicken Order Payment',

        image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',

        order_id: data.id,

        handler: async function (response) {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              customerName: formData.customerName,

              phone: formData.phone,

              address: formData.address,

              product: {
                productId: product._id,

                name: product.name,

                image: product.image,

                price: product.price,
              },

              quantity,

              totalAmount: totalPrice,
            };

            const verifyRes = await API.post(
              '/payment/verify-payment',
              verifyData,
            );

            navigate(`/order-status/${verifyRes.data._id}`);
          } catch (error) {
            console.log(error);

            alert('Payment Verification Failed');
          }
        },

        prefill: {
          name: formData.customerName,

          contact: formData.phone,
        },

        theme: {
          color: '#f59e0b',
        },

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay Using UPI',

                instruments: [
                  {
                    method: 'upi',
                  },
                ],
              },
            },

            sequence: ['block.upi'],

            preferences: {
              show_default_blocks: true,
            },
          },
        },
      };

      // =========================
      // OPEN RAZORPAY
      // =========================
      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.log(error);

      alert('Payment Failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-container">
        <h1>Order</h1>

        {/* PRODUCT */}
        <div className="checkout-cart">
          <h2>Selected Product</h2>

          <div className="checkout-cart-item">
            {/* LEFT */}
            <div className="checkout-cart-left">
              <img
                src={product.image}
                alt={product.name}
                className="checkout-cart-img"
              />

              <div>
                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

                <p>Total: ₹{totalPrice}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="checkout-cart-right">
              <div className="qty-box">
                <button onClick={decreaseQuantity} className="qty-btn">
                  <FaMinus />
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQuantity} className="qty-btn">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="checkout-form">
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            rows="5"
            onChange={handleChange}
          />
        </div>

        {/* PAYMENT */}
        <div className="payment-box">
          <h2>Secure UPI Payment</h2>

          <p>Pay securely using PhonePe, GPay, Paytm or any UPI app.</p>
        </div>

        {/* SUMMARY */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-item">
            <p>
              {product.name} x {quantity}
            </p>

            <p>₹{totalPrice}</p>
          </div>

          <h3>Total: ₹{totalPrice}</h3>

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
