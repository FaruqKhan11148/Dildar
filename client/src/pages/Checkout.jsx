import "./Checkout.css";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import API from "../api/axios";

function Checkout() {

  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      customerName: "",
      phone: "",
      address: "",
    });

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const placeOrder = async () => {

    try {

      setLoading(true);

      const orderData = {

        customerName:
          formData.customerName,

        phone:
          formData.phone,

        address:
          formData.address,

        products: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),

        totalAmount: totalPrice,

      };

      const { data } = await API.post(
        "/orders",
        orderData
      );

      clearCart();

      navigate(
        `/order-status/${data._id}`
      );

    } catch (error) {

      console.log(error);

      alert("Order Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="checkout-page">

      <Navbar />

      <div className="checkout-container">

        <h1>
          Checkout
        </h1>

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
          ></textarea>

        </div>

        {/* SUMMARY */}
        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="checkout-item"
            >

              <p>
                {item.name}
                {" "}x{" "}
                {item.quantity}
              </p>

              <p>
                ₹
                {item.price * item.quantity}
              </p>

            </div>

          ))}

          <h3>
            Total: ₹{totalPrice}
          </h3>

          <button
            onClick={placeOrder}
            disabled={loading}
          >

            {
              loading
                ? "Placing Order..."
                : "Place Order"
            }

          </button>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Checkout;