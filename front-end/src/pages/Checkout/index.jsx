import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CartContext } from '../../context/cart';
import { getUsers, saveSale, saveSalesProducts } from '../../services/api';
import { getKey } from '../../services/localStorage';
import style from './style.module.css';

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
      <Navbar />
      <section className={ style.cartContext }>
        {cart && cart
          .filter((item) => (item.quantity > 0))
          .map((item, index) => (
            <div
              key={ item.id }
              className={ style.cartItem }
            >
              <h3
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                Item:
                {' '}
                { index + 1 }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                Produto:
                {' '}
                { item.name }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                Quantidade:
                {' '}
                { item.quantity }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                Preço: R$
                { item.price.replace(/\./, ',') }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                Subtotal:  R$
                { item.subTotal.toFixed(2).replace(/\./, ',') }

              </h3>
              <button
                className={ style.removeButton }
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
      </section>
      <section>
        <div className={ style.adress }>
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
            placeholder="Endereço de entrega"
            type="text"
            name="deliveryAddress"
            onChange={ handleChange }
          />
          <input
            data-testid="customer_checkout__input-addressNumber"
            placeholder="Número de entrega"
            type="text"
            name="deliveryNumber"
            onChange={ handleChange }
          />
          <h3
            data-testid="customer_checkout__element-order-total-price"
          >
            Total: R$
            { sale.totalPrice.toFixed(2).replace(/\./, ',') }
          </h3>
          <button
            className={ style.finishOrder }
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            Finalizar Pedido
          </button>
        </div>
      </section>
    </>

  );
}
