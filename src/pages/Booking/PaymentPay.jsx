// PaymentPay.jsx
import React from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import defaultPhoto from "../../assets/images/hotelImages.jpg";
import "./../../styles/PaymentPage.css";

const PaymentPay = ({
  // Hotel Information
  hotelName = "Hilton Garden Inn",
  photo, 
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
  const actualPhoto = photo || defaultPhoto;

  // Validation for card number: after removing spaces it must be exactly 16 digits.
  const isCardNumberComplete = cardNumber.replace(/\s/g, "").length === 16;
  // CVC validation: must be either 3 or 4 digits.
  const isCvcValid = cvc.length === 3 || cvc.length === 4;
  // Email must contain "@" symbol.
  const isEmailValid = email.includes("@");

  // Check if all form fields are complete and valid
  const isFormComplete =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() && isEmailValid &&
    phone.trim() &&
    cardName.trim() &&
    cardSurname.trim() &&
    cardNumber.trim() && isCardNumberComplete &&
    expiryMonth.trim() &&
    expiryYear.trim() &&
    cvc.trim() && isCvcValid;

  const findMissingFields = () => {
    const missing = [];
    if (!firstName.trim()) missing.push("First Name");
    if (!lastName.trim()) missing.push("Last Name");
    if (!email.trim() || !isEmailValid)
      missing.push("Email (must contain '@')");
    if (!phone.trim()) missing.push("Phone");
    if (!cardName.trim()) missing.push("Card Name");
    if (!cardSurname.trim()) missing.push("Card Surname");
    if (!cardNumber.trim() || !isCardNumberComplete)
      missing.push("Complete Card Number (16 digits required)");
    if (!expiryMonth.trim()) missing.push("Expiry Month");
    if (!expiryYear.trim()) missing.push("Expiry Year");
    if (!cvc.trim() || !isCvcValid)
      missing.push("CVC (3 or 4 digits required)");
    return missing;
  };

  // Invoice generation function using jsPDF
  const generateInvoice = () => {
    const doc = new jsPDF();

    // Title and basic settings
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Name: ${firstName} ${lastName}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phone}`, 20, 60);
    
    // Payment card details
    doc.text(`Card Holder: ${cardName} ${cardSurname}`, 20, 80);
    doc.text(`Card Number: ${cardNumber}`, 20, 90);
    doc.text(`Expiry: ${expiryMonth}/${expiryYear}`, 20, 100);
    
    // Hotel and reservation details
    doc.text(`Hotel: ${hotelName}`, 20, 120);
    doc.text(`Address: ${address}`, 20, 130);
    doc.text(`Check-in: ${checkInDate}`, 20, 140);
    doc.text(`Check-out: ${checkOutDate}`, 20, 150);
    
    // Price and total payment info
    doc.text(`Total Price: $${price}`, 20, 170);
    
    // Save or display the PDF
    doc.save("invoice.pdf");
  };

  // Function to handle the payment button click
  const handlePayment = () => {
    if (!isFormComplete) {
      const missingFields = findMissingFields();
      alert(
        "Please fill in all fields correctly.\nMissing/Invalid Fields:\n" +
          missingFields.join("\n")
      );
      return;
    }
    
    // Initiate payment process (for example, send data to backend)
    onPaymentClick();
    
    // Generate invoice PDF after successful validation
    generateInvoice();
  };

  return (
    <div className="paymentPay-container">
      <div className="paymentPay-card">
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
