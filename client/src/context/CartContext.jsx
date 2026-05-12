import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext =
  createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState(() => {

      const savedCart =
        localStorage.getItem("cartItems");

      return savedCart
        ? JSON.parse(savedCart)
        : [];

    });

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {

    setCartItems((prevItems) => {

      const existingItem =
        prevItems.find(
          (item) =>
            item._id === product._id
        );

      if (existingItem) {

        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );

      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  };

  // REMOVE ITEM
  const removeFromCart = (id) => {

    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item._id !== id
      )
    );

  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );

  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );

  };

  // CLEAR CART
  const clearCart = () => {

    setCartItems([]);

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;