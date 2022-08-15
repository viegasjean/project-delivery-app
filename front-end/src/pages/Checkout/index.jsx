import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/cart';
import { getUsers, saveSale, saveSalesProducts } from '../../services/api';
import { getKey } from '../../services/localStorage';

export default function Checkout() {
  const { cart, removeItemFromCart } = useContext(CartContext);
  // const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [sale, setSale] = useState({
    sellerId: '',
    userId: getKey('user').id,
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    saleDate: new Date(),
    status: 'Pendente',
  });
  const history = useHistory();

  useEffect(() => {
    getUsers('seller').then(({ data }) => { setSellers(data); });
  }, []);

  useEffect(() => {
    setSale({
      ...sale,
      totalPrice: cart.reduce((acc, cartItem) => {
        acc += cartItem.subTotal;
        return acc;
      }, 0),
    });
  }, [cart]);

  const handleChange = ({ target: { value, name } }) => {
    setSale({
      ...sale,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { token } = getKey('user');
    saveSale(sale, token)
      .then(({ data }) => {
        console.log(data);

        const salesProducts = cart.filter((item) => item.quantity > 0)
          .map((item) => ({
            saleId: data.id, productId: item.id, quantity: item.quantity,
          }));

        console.log('salesProducts', salesProducts);

        saveSalesProducts(salesProducts, token);

        history.push(`/customer/orders/${data.id}`);
      });
  };

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
                onClick={ () => {
                  removeItemFromCart(item);
                } }
              >
                REMOVE
              </button>
            </div>
          )) }
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          { sale.totalPrice.toFixed(2).replace(/\./, ',') }
        </h2>
      </section>
      <section>
        <select
          data-testid="customer_checkout__select-seller"
          name="sellerId"
          onChange={ handleChange }
          onClick={ handleChange }
        >
          {sellers && sellers.map((seller) => (
            <option
              key={ seller.id }
              value={ seller.id }
            >
              {seller.name}
            </option>
          ))}

        </select>
        <input
          data-testid="customer_checkout__input-address "
          type="text"
          name="deliveryAddress"
          onChange={ handleChange }
        />
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="text"
          name="deliveryNumber"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleSubmit }
        >
          FINALIZAR PEDIDO
        </button>
      </section>
    </>

  );
}
