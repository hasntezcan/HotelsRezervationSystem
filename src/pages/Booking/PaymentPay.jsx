import React from "react";
import defaultPhoto from "../../assets/images/hotelImages.jpg";
import "./../../styles/PaymentPage.css";

const PaymentPay = ({
  // Hotel Information
  hotelName = "Hilton Garden Inn",
  photo, // We'll decide in code if we use this or defaultPhoto
  address = "",
  checkInDate = "",
  checkOutDate = "",
  price = 0,

  // PaymentName Data (Step 1)
  firstName = "",
  lastName = "",
  email = "",
  phone = "",

  // PaymentCard Data (Step 3)
  cardName = "",
  cardSurname = "",
  cardNumber = "",
  expiryMonth = "",
  expiryYear = "",
  cvc = "",

  onPaymentClick = () => {}
}) => {
  // Determine which photo to actually use
  // If "photo" is null, undefined, or an empty string, use defaultPhoto
  const actualPhoto = photo || defaultPhoto;

  // Check if all necessary fields are completed
  const isFormComplete =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    phone.trim() &&
    cardName.trim() &&
    cardSurname.trim() &&
    cardNumber.trim() &&
    expiryMonth.trim() &&
    expiryYear.trim() &&
    cvc.trim();

  // Identify missing fields
  const findMissingFields = () => {
    const missing = [];
    if (!firstName.trim()) missing.push("First Name");
    if (!lastName.trim()) missing.push("Last Name");
    if (!email.trim()) missing.push("Email");
    if (!phone.trim()) missing.push("Phone");
    if (!cardName.trim()) missing.push("Card Name");
    if (!cardSurname.trim()) missing.push("Card Surname");
    if (!cardNumber.trim()) missing.push("Card Number");
    if (!expiryMonth.trim()) missing.push("Expiry Month");
    if (!expiryYear.trim()) missing.push("Expiry Year");
    if (!cvc.trim()) missing.push("CVC");
    return missing;
  };

  const handlePayment = () => {
    if (!isFormComplete) {
      const missingFields = findMissingFields();
      alert(
        "Please complete all fields.\n\nMissing Fields:\n" +
          missingFields.join("\n")
      );
      return;
    }
    onPaymentClick();
  };

  return (
    <div className="paymentPay-container">
      <div className="paymentPay-card">
        {/* Hotel Image */}
        <img src={actualPhoto} alt={hotelName} className="paymentPay-img" />

        <div className="paymentPay-content">
          <h3 className="paymentPay-name">{hotelName}</h3>
          <p className="paymentPay-address">{address}</p>
          <p className="paymentPay-dates">
            Date: {checkInDate} - {checkOutDate}
          </p>
          <div className="paymentPay-price">Price: ${price}</div>

          <button className="myGreenBookNowButton" onClick={handlePayment}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPay;
