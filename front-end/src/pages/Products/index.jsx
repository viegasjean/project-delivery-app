import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CartContext } from '../../context/cart';
import { getProducts } from '../../services/api';
import style from './style.module.css';

function Products() {
  const { cart,
    setCart,
    addToCart,
    removeFromCart,
    setQuantity,
  } = useContext(CartContext);
  const history = useHistory();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts().then((res) => {
      setCart(
        res.data.map((product) => ({ ...product, quantity: 0, subTotal: 0 })),
      );
    });
    // setCart(getKey('carrinho'));
  }, []);

  useEffect(() => {
    setTotal(cart.reduce((acc, cartItem) => {
      acc += cartItem.subTotal;
      return acc;
    }, 0));
  });

  return (
    <>
      <Navbar />
      <section className={ style.cardcontainer }>
        {cart && cart.map((product) => (
          <div
            key={ product.id }
            className={ style.card }
          >
            <h4
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              { product.name }
            </h4>
            <h4
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              { product.price.replace(/\./, ',') }
            </h4>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              alt="foto ilutrativa do produto"
              src={ product.urlImage }
            />

            <button
              className={ style.buttonAdd }
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              onClick={ () => addToCart(product) }
            >
              +1
            </button>

            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              // defaultValue={ 0 }
              min={ 0 }
              value={ product.quantity }
              onChange={ (e) => setQuantity(e, product) }
            />

            <button
              className={ style.buttonRemove }
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onClick={ () => removeFromCart(product) }
            >
              Remove
            </button>

          </div>))}
      </section>
      <footer className={ style.footer }>
        <button
          type="button"
          data-testid="customer_products__checkout-bottom-value"
        >
          Total: R$
          {total.toFixed(2).replace(/\./, ',') }
        </button>
        <button
          type="button"
          onClick={ () => {
            history.push('/customer/checkout');
          } }
          data-testid="customer_products__button-cart"
          disabled={ total === 0 }
        >
          CARRINHO
        </button>
      </footer>
    </>

  );
}

export default Products;
