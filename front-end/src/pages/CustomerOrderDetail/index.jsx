import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import OrderTable from '../../components/OrderTable';
import { getSaleDetails } from '../../services/api';
import style from './style.module.css';

function OrderDetail() {
  const [orderData, setOrderData] = useState();
  const params = useParams();

  const fetchSaleDetail = async () => {
    const { data } = await getSaleDetails(params.id);
    setOrderData(data[0]);
  };

  useEffect(() => {
    fetchSaleDetail();
  }, []);

  if (!orderData) {
    return (
      <span>Loading...</span>
    );
  }

  return (
    <>
      <Navbar />
      <h1>Detalhe do pedido</h1>
      <ul className={ style.saleHeader }>
        <li data-testid="customer_order_details__element-order-details-label-order-id">
          Pedido
          {' '}
          {String(orderData.id).padStart(Number('4'), '0')}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {orderData.seller.name}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {new Date(orderData.saleDate).toLocaleDateString('pt-br')}
        </li>
        <li
          data-testid={ `
          customer_order_details__element-order-details-label-delivery-status` }
        >
          {orderData.status}
        </li>
        <li>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled
          >
            Marcar como entregue
          </button>
        </li>
      </ul>
      <OrderTable
        orders={ orderData.products }
        total={ orderData.totalPrice }
      />
    </>
  );
}

export default OrderDetail;