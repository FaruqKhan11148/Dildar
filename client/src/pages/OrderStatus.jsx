import "./OrderStatus.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../api/axios";

function OrderStatus() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchOrder();

    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchOrder = async () => {

    try {

      const { data } = await API.get(
        `/orders/${id}`
      );

      setOrder(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const steps = [
    "Pending",
    "Preparing",
    "Delivered",
  ];

  const currentStep =
    order
      ? steps.indexOf(order.status)
      : 0;

  const isCancelled =
    order?.status === "Cancelled";

  return (
    <div className="status-page">

      <Navbar />

      <div className="status-container">

        {loading ? (

          <h1 className="loading-text">
            Loading...
          </h1>

        ) : !order ? (

          <h1 className="loading-text">
            Order Not Found
          </h1>

        ) : (

          <>
            <p className="status-subtitle">
              Track Your Order
            </p>

            <h1 className="status-title">
              Order Status
            </h1>

            <div className="status-card">

              <h2>
                {order.customerName}
              </h2>

              <p>
                {order.address}
              </p>

              <div className="status-price">
                ₹{order.totalAmount}
              </div>

            </div>

            {/* CANCELLED */}
            {isCancelled ? (

              <div className="cancel-box">

                <h2>
                  ❌ Order Cancelled
                </h2>

                <p>
                  Refund will be processed soon.
                </p>

              </div>

            ) : (

              /* STATUS STEPS */
              <div className="steps-container">

                {steps.map((step, index) => (

                  <div
                    key={index}
                    className={`step 
                    ${index <= currentStep
                      ? "active"
                      : ""}
                    `}
                  >

                    <div className="step-circle">
                      {index + 1}
                    </div>

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