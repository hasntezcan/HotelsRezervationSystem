import React from 'react';
import PaymentName from '../Booking/PaymentName';
import PaymentRoom from '../Booking/PaymentRoom';
import PaymentCard from '../Booking/PaymentCard';
import PaymentPay from '../Booking/PaymentPay';

import '../../styles/PaymentPage.css'; // Ana container stilleri
import { Payment } from '@mui/icons-material';

const PaymentPage = () => {
  return (
    <div className="payment-layout">
      <div className="payment-content">
        <PaymentName />
        <PaymentRoom />
        <PaymentCard />
      </div>
      
      <div className="payment-sidebar">
        <PaymentPay
          hotelName="Hilton Garden Inn"
          price={140}
          photo={hotelImage}
          address="123 Street, City, Country"
        />
      </div>
    </div>
  );
};

export default PaymentPage;
