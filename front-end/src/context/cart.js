import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (!item) {
      setCart([...cart, { ...product, quantity: 1, subTotal: +product.price }]);
    } else {
      item.quantity += 1;
      item.subTotal = item.quantity * item.price;
      setCart(copyCart);
    }
  }

  function setQuantity(e, product) {
    console.log(e.target.value);
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);
    item.quantity = e.target.value;
    item.subTotal = item.quantity * item.price;
    setCart(copyCart);
  }

  function removeFromCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      item.subTotal = item.quantity * item.price;
      setCart(copyCart);
    } else {
      const arrayFiltered = copyCart.filter(
        (cartItem) => cartItem.id !== product.id,
      );
      setCart(arrayFiltered);
    }
  }

  function clearCart() {
    setCart([]);
  }

  const state = useMemo(
    () => (
      { cart, setCart, addToCart, removeFromCart, setQuantity, clearCart }),
    [cart],
  );

  return (
    <CartContext.Provider
      value={ state }
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
