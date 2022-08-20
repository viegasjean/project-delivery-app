import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getSalesBySellerId } from '../../services/api';
import { getKey } from '../../services/localStorage';

import style from './style.module.css';

function SellerOrders() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getSalesBySellerId(getKey('user').id)
      .then(({ data }) => {
        setSales(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={ style.sales }>
        {sales.map((sale) => {
          const { id,
            status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
          return (
            <button
              type="button"
              key={ id }
              onClick={ () => history.push(`/seller/orders/${id}`) }
              className={ style.card }
            >
              <h1
                data-testId={ `seller_orders__element-order-id-${id}` }
              >
                {id}
              </h1>

              <h1
                data-testId={ `seller_orders__element-delivery-status-${id}` }
              >
                {status}
              </h1>

              <h1
                data-testId={ `seller_orders__element-delivery-order-date-${id}` }
              >
                { new Date(saleDate).toLocaleDateString() }
              </h1>

              <h1
                data-testId={ `seller_orders__element-delivery-card-price-${id}` }
              >
                { totalPrice.replace(/\./, ',') }
              </h1>

              <h1
                data-testId={ `seller_orders__element-delivery-card-address-${id}` }
              >
                { `${deliveryAddress}, ${deliveryNumber}` }
              </h1>

            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SellerOrders;
