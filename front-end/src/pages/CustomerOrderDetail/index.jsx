import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import OrderTable from '../../components/OrderTable';
import { getSaleDetails, updateSaleStatus } from '../../services/api';
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
  }, [orderData]);

  if (!orderData) {
    return (
      <span>Loading...</span>
    );
  }

  const receive = () => {
    updateSaleStatus(params.id, 'Entregue');
    fetchSaleDetail();
  };

  return (
    <>
      <Navbar />
      <h1 className={ style.title }>Detalhe do pedido :</h1>
      <ul className={ style.saleHeader }>
        <li data-testid="customer_order_details__element-order-details-label-order-id">
          Pedido
          {' '}
          {String(orderData.id).padStart(Number('4'), '0')}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Vendedor:
          {' '}
          {orderData.seller.name}
        </li>
        <li
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          Realizado em:
          {' '}
          {new Date(orderData.saleDate).toLocaleDateString('pt-br')}
        </li>
        <li>
          <label
            htmlFor="deliveryCheck"
            data-testid={ 'customer_order_details__'
              + 'element-order-details-label-delivery-status' }
          >
            Status:
            {' '}
            {orderData.status}
          </label>
        </li>
        <li>
          <button
            name="deliveryCheck"
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ orderData.status !== 'Em Trânsito' }
            onClick={ receive }
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
