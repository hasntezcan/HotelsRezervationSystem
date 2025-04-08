import React from "react";
import "./../../styles/PaymentPage.css";

const PaymentName = ({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  phone, setPhone
}) => {

  // Remove any digits from the "First Name" input
  const handleFirstNameChange = (e) => {
    const onlyLetters = e.target.value.replace(/[0-9]/g, "");
    setFirstName(onlyLetters);
  };

  // Remove any digits from the "Last Name" input
  const handleLastNameChange = (e) => {
    const onlyLetters = e.target.value.replace(/[0-9]/g, "");
    setLastName(onlyLetters);
  };

  // Remove any non-digit characters from the "Mobile Number" input
  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits);
  };

  return (
    <div className="PaymentName__container">
      <h2 className="PaymentName__title">Step 1: Your Information</h2>
      <p className="PaymentName__note">* Required fields</p>
      <form className="PaymentName__form">
        <div className="PaymentName__form-group">
          <label>First Name *</label>
          <input
            type="text"
            placeholder="Enter your first name"
            required
            className="PaymentName__input"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>Last Name *</label>
          <input
            type="text"
            placeholder="Enter your last name"
            required
            className="PaymentName__input"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="Your email address"
            required
            className="PaymentName__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            placeholder="Your phone number"
            required
            className="PaymentName__input"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentName;
//