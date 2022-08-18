import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getSalesByCustomerId } from '../../services/api';
import { getKey } from '../../services/localStorage';

import style from './style.module.css';

function CustomerOrders() {
  const [salesData, SetSalesData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getSalesByCustomerId(getKey('user').id)
      .then(({ data }) => {
        SetSalesData(data);
      });
  }, []);

  return (
    <section>
      <Navbar />
      <div className={ style.sales }>
        { salesData.map((sale) => (
          <button
            type="button"
            key={ sale.id }
            className={ style.card }
            data-testid={ `customer_orders__element-order-id-${sale.id}` }
            onClick={ () => history.push(`/customer/orders/${sale.id}`) }
          >
            <h3 data-testid={ `customer_orders__element-order-id-${sale.id}` }>
              Pedido
              00
              {sale.id}
            </h3>
            <p data-testid={ `customer_orders__element-order-date-${sale.id}` }>
              {new Intl.DateTimeFormat('pt-BR').format(sale.date)}
            </p>
            <p data-testid={ `customer_orders__element-card-price-${sale.id}` }>
              Total:
              {' '}
              {sale.totalPrice.replace(/\./, ',')}
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${sale.id}` }>
              Status:
              {' '}
              {sale.status}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CustomerOrders;
