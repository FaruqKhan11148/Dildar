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

  const [paymentScreenshot, setPaymentScreenshot] = useState('');

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

  const placeOrder = async () => {
    try {
      setLoading(true);

      if (!formData.customerName || !formData.phone || !formData.address) {
        alert('Please fill all details');

        setLoading(false);

        return;
      }

      if (!paymentScreenshot) {
        alert('Please add payment screenshot');

        setLoading(false);

        return;
      }

      const orderData = {
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

        paymentScreenshot: paymentScreenshot?.name || '',

        paymentMethod: 'PhonePe QR',
      };

      const { data } = await API.post('/orders', orderData);
      console.log(data);
      console.log(data._id);
      navigate(`/order-status/${data._id}`);
    } catch (error) {
      console.log(error);

      alert('Order Failed');
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
          <h2>Pay Using PhonePe QR</h2>

          <img
            src="https://i.ibb.co/8gZ1G6F/qr-demo.png"
            alt="QR Code"
            className="qr-image"
          />

          <p>Scan QR and complete payment</p>
          <h2>OR</h2>
          <h5>Pay : +91 6363120602</h5>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPaymentScreenshot(e.target.files[0])}
          />
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

          <button onClick={placeOrder} disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
