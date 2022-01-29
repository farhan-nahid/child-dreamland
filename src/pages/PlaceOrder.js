import React, { useEffect } from 'react';
import PlaceOrderFrom from '../components/PlaceOrderComponents/PlaceOrderFrom/PlaceOrderFrom';

const PlaceOrder = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <PlaceOrderFrom />
    </>
  );
};

export default PlaceOrder;
