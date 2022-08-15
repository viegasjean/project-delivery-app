import React, { UseEffect, UseState } from 'react';
import style from './style.module.css';

function sales() {
  const [salesData, SetSalesData] = UseState([]);

  UseEffect(async () => {
    const results = await fetch('http://localhost:3001/sale') // hardcoded pois não a função criada não funcionou
      .then((res) => res.json());
    SetSalesData(await results);
    console.log(results);
  }, []);

  return (
    <section>
      <div className={ style.sales }>
        { salesData.map((sale) => (
          <div
            key={ sale.id }
            className={ style.card }
            data-testid={ `customer_orders__element-order-id-${sale.id}` }
          >
            <h3 data-testid={ `customer_orders__element-order-id-${sale.id}` }>
              00
              {sale.id}
            </h3>
            <p data-testid={ `customer_orders__element-order-date-${sale.id}` }>
              {new Intl.DateTimeFormat('pt-BR').format(sale.date)}
            </p>
            <p data-testid={ `customer_orders__element-card-price-${sale.id}` }>
              R$
              {sale.totalPrice}
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${sale.id}` }>
              {sale.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default sales;
