import React from 'react';
import PaymentName from './PaymentName';
import PaymentRoom from './PaymentRoom';
import PaymentCard from './PaymentCard';
import PaymentPay from './PaymentPay';

import '../../styles/PaymentPage.css'; // Ana container stilleri
// ... PaymentName, PaymentRoom, PaymentCard, PaymentPay bileşenlerini import edin.

const PaymentPage = () => {
  return (
    <div className="payment-layout">
      {/* Sol taraftaki içerik */}
      <div className="payment-content">
        <div className="payment-box">
          <PaymentName />
        </div>

        <div className="payment-box">
          <PaymentRoom />
        </div>

        <div className="payment-box">
          <PaymentCard />
        </div>
      </div>

      {/* Sağ taraftaki özet kutusu */}
      <div className="payment-sidebar">
        <PaymentPay />
      </div>
    </div>
  );
};

export default PaymentPage;
