import React from "react";
import "./../../styles/PaymentPage.css"; 

const PaymentPay = ({ hotel }) => {
  const { price, name, photo, address } = hotel;

  return (
    <div className="paymentPay-container">
      <div className="paymentPay-card">
        <img src={photo} alt={name} className="paymentPay-img" />
        <div className="paymentPay-content">
          <h3 className="paymentPay-name">{name}</h3>
          <p className="paymentPay-address">{address}</p>
          <div className="paymentPay-price">
            <span>Fiyat:</span> ${price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPay;
