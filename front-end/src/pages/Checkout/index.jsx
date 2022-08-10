import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart';

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, cartItem) => {
      acc += cartItem.subTotal;
      return acc;
    }, 0));
  });

  return (
    <>
      <section>
        {cart && cart
          .filter((item) => (item.quantity > 0))
          .map((item, index) => (
            <div
              key={ item.id }
            >
              <h3
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { item.name }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { item.quantity }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { item.price.replace(/\./, ',') }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { item.subTotal.toFixed(2).replace(/\./, ',') }

              </h3>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                type="button"
              >
                REMOVE
              </button>
            </div>
          )) }
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          { total.toFixed(2).replace(/\./, ',') }
        </h2>
      </section>
      <section>
        <select
          data-testid="customer_checkout__select-seller"
        >
          <option>VENDEDOR</option>
        </select>
        <input
          data-testid="customer_checkout__input-address "
          type="text"
        />
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="text"
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </section>
    </>

  );
}
