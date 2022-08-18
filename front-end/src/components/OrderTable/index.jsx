import React from 'react';
import propTypes from 'prop-types';
import style from './style.module.css';

function OrderTable({ orders, enableDelete = false, total }) {
  return (
    <table>
      <thead className={ style.tableHead }>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-total</th>
          {enableDelete && (
            <th>Remover item</th>
          )}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={ order.id }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-<${index}>`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-name-<${index}>`
              }
            >
              {order.name}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-quantity-<${index}>`
              }
            >
              {order.salesProducts.quantity}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-<${index}>`
              }
            >
              {order.price}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-total-price-<${index}>`
              }
            >
              {(order.salesProducts.quantity * order.price).toFixed(2)}
            </td>
            {enableDelete && (
              <td>
                <button
                  data-testid={
                    `customer_checkout__element-order-table-remove-<${index}>`
                  }
                  type="button"
                >
                  Remover
                </button>
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td>
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              Total:
              {' '}
              {Number(total).toFixed(2).replace('.', ',')}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

  );
}

OrderTable.propTypes = {
  orders: propTypes.arrayOf(propTypes.shape({
    // id: propTypes.string,
  })).isRequired,
  enableDelete: propTypes.bool.isRequired,
  total: propTypes.number.isRequired,
};

export default OrderTable;
