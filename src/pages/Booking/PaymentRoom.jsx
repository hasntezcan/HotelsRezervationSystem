import React from "react";
import "./../../styles/PaymentRoom.css";

const PaymentRoom = () => {
  return (
    <div>
      <h2 className="PaymentRoom__title">Step 2: Accommodation Details</h2>

      {/* Highlights */}
      <h3 className="PaymentRoom__subtitle">Highlights</h3>
      <ul className="PaymentRoom__grid-list">
        <li className="PaymentRoom__item-box">Free Parking</li>
        <li className="PaymentRoom__item-box">Free WiFi</li>
        <li className="PaymentRoom__item-box">Pet Friendly</li>
        <li className="PaymentRoom__item-box">24-Hour Reception</li>
      </ul>

      {/* Room Information: Only one container (room-box) for the "Luxury Single Room" */}
      <div className="PaymentRoom__room-box">
        <h3 className="PaymentRoom__subtitle">Luxury Single Room with Queen Bed</h3>
        <ul className="PaymentRoom__grid-list">
          <li className="PaymentRoom__item-box">Breakfast Available</li>
          <li className="PaymentRoom__item-box">1 Large (Queen) Bed</li>
          <li className="PaymentRoom__item-box">Smoking Room</li>
          <li className="PaymentRoom__item-box">Room Service</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentRoom;
