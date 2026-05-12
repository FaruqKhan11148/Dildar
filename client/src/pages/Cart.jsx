import './Cart.css';

import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  FaTrash,
  FaMinus,
  FaPlus,
} from 'react-icons/fa';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { CartContext } from '../context/CartContext';

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">

      {/* GLOW BACKGROUNDS */}
      <div className="cart-glow-left"></div>
      <div className="cart-glow-right"></div>

      <div className="cart-content">

        <Navbar />

        <div className="container py-5">

          {/* HEADER */}
          <div className="text-center cart-header">

            <p className="cart-subtitle">
              Fresh Orders
            </p>

            <h1 className="cart-title">
              Your Cart
            </h1>

            <p className="cart-desc">
              Review your selected chicken
              products before placing order.
            </p>

          </div>

          {/* EMPTY CART */}
          {cartItems.length === 0 ? (

            <div className="cart-empty">

              <h2>
                Cart is Empty 🛒
              </h2>

              <p>
                Add fresh products to continue.
              </p>

            </div>

          ) : (

            <>

              {/* ITEMS */}
              <div className="cart-items">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="cart-card"
                  >

                    {/* LEFT */}
                    <div className="cart-left">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-img"
                      />

                      <div>

                        <p className="cart-badge">
                          Fresh Chicken
                        </p>

                        <h2 className="cart-name">
                          {item.name}
                        </h2>

                        <p className="cart-price">
                          ₹{item.price}
                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="cart-right">

                      {/* QUANTITY */}
                      <div className="qty-box">

                        <button
                          onClick={() =>
                            decreaseQuantity(item._id)
                          }
                          className="qty-btn"
                        >
                          <FaMinus />
                        </button>

                        <span className="qty-number">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item._id)
                          }
                          className="qty-btn"
                        >
                          <FaPlus />
                        </button>

                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                        className="remove-btn"
                      >
                        <FaTrash />
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* TOTAL */}
              <div className="cart-summary">

                <p className="summary-subtitle">
                  Order Summary
                </p>

                <h2 className="summary-total">
                  Total:
                  <span>
                    ₹{totalPrice}
                  </span>
                </h2>

                <p className="summary-note">
                  Fast delivery available 🚚
                </p>

                <button
                  className="checkout-btn"
                  onClick={() =>
                    navigate('/checkout')
                  }
                >
                  Proceed To Checkout
                </button>

              </div>

            </>

          )}

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Cart;