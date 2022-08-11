import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';
import { setKey } from '../services/localStorage';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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
    setKey('carrinho', cart);
  }

  function setQuantity(e, product) {
    console.log(e.target.value);
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);
    item.quantity = +e.target.value;
    item.subTotal = item.quantity * item.price;
    setCart(copyCart);
    setKey('carrinho', cart);
  }

  function removeFromCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (item && item.quantity > 0) {
      item.quantity -= 1;
      item.subTotal = item.quantity * item.price;
      setCart(copyCart);
    }
    // else {
    //   const arrayFiltered = copyCart.filter(
    //     (cartItem) => cartItem.id !== product.id,
    //   );
    //   setCart(arrayFiltered);
    // }
    setKey('carrinho', cart);
  }

  function removeItemFromCart(product) {
    const copyCart = [...cart];
    // const item = copyCart.find((cartItem) => cartItem.id === product.id);

    // if (item && item.quantity > 0) {
    //   item.quantity -= 1;
    //   item.subTotal = item.quantity * item.price;
    //   setCart(copyCart);
    // }
    // else {
    const arrayFiltered = copyCart.filter(
      (cartItem) => cartItem.id !== product.id,
    );
    setCart(arrayFiltered);
    // }
    // setKey('carrinho', cart);
  }

  function clearCart() {
    setCart([]);
    setKey('carrinho', cart);
  }

  const state = useMemo(
    () => (
      {
        cart,
        setCart,
        total,
        setTotal,
        removeItemFromCart,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
      }),
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
