import "./AdminOrders.css";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../api/axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const { data } = await API.get(
        "/orders"
      );

      setOrders(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/orders/${id}/status`,
        { status }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="admin-page">

      <Navbar />

      <div className="admin-container">

        <h1 className="admin-title">
          Admin Orders
        </h1>

        {loading ? (

          <h2 className="loading-text">
            Loading...
          </h2>

        ) : orders.length === 0 ? (

          <h2 className="loading-text">
            No Orders Found
          </h2>

        ) : (

          <div className="admin-orders">

            {orders.map((order) => (

              <div
                key={order._id}
                className="admin-card"
              >

                <div className="admin-top">

                  <div>

                    <h2>
                      {order.customerName}
                    </h2>

                    <p>
                      {order.phone}
                    </p>

                    <p>
                      {order.address}
                    </p>

                  </div>

                  <div className="status-box">
                    {order.status}
                  </div>

                </div>

                <div className="products-list">

                  {order.products.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="product-row"
                      >

                        <span>
                          {item.name}
                        </span>

                        <span>
                          x {item.quantity}
                        </span>

                      </div>
                    )
                  )}

                </div>

                <h3 className="total-price">
                  ₹{order.totalAmount}
                </h3>

                <div className="admin-buttons">

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Pending"
                      )
                    }
                  >
                    Pending
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Preparing"
                      )
                    }
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Delivered"
                      )
                    }
                  >
                    Delivered
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
}

export default AdminOrders;