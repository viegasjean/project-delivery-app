/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

function OrderTable({ orders, enableDelete, total }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>descrição</th>
          <th>quantidade</th>
          <th>valor unitario</th>
          <th>sub-total</th>
          {enableDelete && (
            <th>Remover item</th>
          )}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={ order.id }>
            <td
              data-testid={ `customer_order_details__element-order-table-item-number-<${index}>` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-<${index}>` }
            >
              {order.name}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-quantity-<${index}>` }
            >
              {order.salesProducts.quantity}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-sub-total-<${index}>` }
            >
              {order.price}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-total-price-<${index}>` }
            >
              {(order.salesProducts.quantity * order.price).toFixed(2)}
            </td>
            {enableDelete && (
              <td>
                <button
                  data-testid={ `customer_checkout__element-order-table-remove-<${index}>` }
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

export default OrderTable;
