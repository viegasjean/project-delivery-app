import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import OrderTable from '../../components/OrderTableSeller';
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

  const prepare = () => {
    updateSaleStatus(params.id, 'Preparando');
    fetchSaleDetail();
  };

  const dispatch = () => {
    updateSaleStatus(params.id, 'Em Trânsito');
    setPrepareButton(true);
    setDispatchButton(true);
  };

  return (
    <>
      <Navbar />
      <h1 className={ style.title }>Detalhe do pedido :</h1>
      <ul className={ style.saleHeader }>
        <li data-testid="seller_order_details__element-order-details-label-order-id">
          Pedido
          {' '}
          {String(orderData.id).padStart(Number('4'), '0')}
        </li>
        <li
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          Realizado em:
          {' '}
          {new Date(orderData.saleDate).toLocaleDateString('pt-br')}
        </li>
        <li>
          <label
            htmlFor="deliveryCheck"
            data-testid={ 'seller_order_details__'
              + 'element-order-details-label-delivery-status' }
          >
            Status:
            {' '}
            {orderData.status}
          </label>
        </li>
        <li>
          <button
            name="preparingCheck"
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            onClick={ () => prepare() }
            disabled={ orderData.status !== 'Pendente' }
          >
            PREPARAR
          </button>
          <button
            name="dispatchCheck"
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            onClick={ dispatch }
            disabled={ orderData.status !== 'Preparando' }
          >
            DESPACHAR
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
