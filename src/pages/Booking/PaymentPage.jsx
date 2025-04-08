import React, { useState } from "react";
import PaymentName from "./PaymentName";
import PaymentRoom from "./PaymentRoom";
import PaymentCard from "./PaymentCard";
import PaymentPay from "./PaymentPay";
import "./../../styles/PaymentPage.css"; // This should be your PaymentPage.css file

const PaymentPage = () => {
  // PaymentName (Step 1) Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // PaymentCard (Step 3) Information
  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  // Hotel Information (optional)
  const [hotelName] = useState("Grand Royal Hotel");
  const [photo] = useState(null); // You can add your own image here
  const [address] = useState("123 Street, City, Country");
  const [checkInDate] = useState("2025-05-12");
  const [checkOutDate] = useState("2025-05-15");
  const [price] = useState(140);

  // When the Payment button is clicked
  const handlePaymentClick = () => {
    alert("Payment process initiated!");
  };

  return (
    <div className="payment-layout">
      {/* Left Column: Steps 1, 2 and 3 */}
      <div className="payment-content">
        {/* Step 1: Your Information */}
        <div className="payment-box">
          <PaymentName
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        </div>

        {/* Step 2: Accommodation Details */}
        <div className="payment-box">
          <PaymentRoom />
        </div>

        {/* Step 3: Card Information */}
        <div className="payment-box">
          <PaymentCard
            cardName={cardName}
            setCardName={setCardName}
            cardSurname={cardSurname}
            setCardSurname={setCardSurname}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryMonth={expiryMonth}
            setExpiryMonth={setExpiryMonth}
            expiryYear={expiryYear}
            setExpiryYear={setExpiryYear}
            cvc={cvc}
            setCvc={setCvc}
          />
        </div>
      </div>

      {/* Right Column: PaymentPay Summary */}
      <div className="payment-sidebar">
        <PaymentPay
          // Hotel Information
          hotelName={hotelName}
          photo={photo}
          address={address}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          price={price}

          // PaymentName Data
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}

          // PaymentCard Data
          cardName={cardName}
          cardSurname={cardSurname}
          cardNumber={cardNumber}
          expiryMonth={expiryMonth}
          expiryYear={expiryYear}
          cvc={cvc}

          // Payment function
          onPaymentClick={handlePaymentClick}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
