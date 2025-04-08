import React from "react";
import { CiCreditCard1 } from "react-icons/ci"; // Icon
import "./../../styles/PaymentPage.css";
import visaLogo from "./../../assets/images/booking/visa.png";
import mastercardLogo from "./../../assets/images/booking/mastercard.png";
import amexLogo from "./../../assets/images/booking/americanExpress.png";

const PaymentCard = ({
  // These props are received from the parent as controlled inputs:
  cardName,
  setCardName,
  cardSurname,
  setCardSurname,
  cardNumber,
  setCardNumber,
  expiryMonth,
  setExpiryMonth,
  expiryYear,
  setExpiryYear,
  cvc,
  setCvc,
}) => {
  // Format the card number input
  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  // Prevent numbers in the name fields
  const handleNameChange = (e) => {
    const input = e.target.value.replace(/[0-9]/g, "");
    setCardName(input);
  };
  const handleSurnameChange = (e) => {
    const input = e.target.value.replace(/[0-9]/g, "");
    setCardSurname(input);
  };

  // Prevent non-digit characters in CVC
  const handleCvcChange = (e) => {
    const input = e.target.value.replace(/[^\d]/g, "");
    setCvc(input);
  };

  // Generate month/year lists
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const currentYearValue = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYearValue + i);

  return (
    <div className="PaymentCard__container">
      <h2 className="PaymentCard__title">Step 3: Payment Details</h2>
      <p className="PaymentCard__note">
        We never charge your card without authorization.
      </p>

      <div className="PaymentCard__content">
        {/* Left column: Form */}
        <div className="PaymentCard__formWrapper">
          <form className="PaymentCard__form">
            <div className="PaymentCard__form-group">
              <label htmlFor="cardName" className="PaymentCard__label">
                First Name
              </label>
              <input
                type="text"
                id="cardName"
                placeholder="Enter first name"
                required
                className="PaymentCard__input"
                value={cardName}
                onChange={handleNameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                inputMode="text"
                title="Only letters and spaces allowed."
              />
            </div>

            <div className="PaymentCard__form-group">
              <label htmlFor="cardSurname" className="PaymentCard__label">
                Last Name
              </label>
              <input
                type="text"
                id="cardSurname"
                placeholder="Enter last name"
                required
                className="PaymentCard__input"
                value={cardSurname}
                onChange={handleSurnameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                inputMode="text"
                title="Only letters and spaces allowed."
              />
            </div>

            <div className="PaymentCard__form-group">
              <label htmlFor="cardNumber" className="PaymentCard__label">
                Card Number
              </label>
              {/* Card number input wrapper with icon */}
              <div className="PaymentCard__input-wrapper PaymentCard__input-wrapper--icon">
                <CiCreditCard1 className="PaymentCard__icon" />
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  className="PaymentCard__input PaymentCard__input--card"
                  maxLength="19"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  pattern="[0-9\s]+"
                  inputMode="numeric"
                  title="Only digits allowed."
                />
              </div>
            </div>

            <div className="PaymentCard__form-row">
              <div className="PaymentCard__form-group">
                <label className="PaymentCard__label">Expiry Date</label>
                <div className="PaymentCard__expiry-container">
                  <select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="PaymentCard__form-group">
                <label htmlFor="cvc" className="PaymentCard__label">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="1234"
                  required
                  className="PaymentCard__input PaymentCard__cvc"
                  minLength="3"
                  maxLength="4"
                  value={cvc}
                  onChange={handleCvcChange}
                  pattern="[0-9]{3,4}"
                  inputMode="numeric"
                  title="Only digits allowed."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right column: Accepted Payment Methods */}
        <div className="PaymentCard__acceptedWrapper">
          <div className="PaymentCard__accepted">
            <h4 className="PaymentCard__accepted-title">
              We accept the following payment methods
            </h4>
            <div className="PaymentCard__accepted-logos">
              <img src={visaLogo} alt="Visa" className="PaymentCard__logo" />
              <img src={mastercardLogo} alt="MasterCard" className="PaymentCard__logo" />
              <img src={amexLogo} alt="American Express" className="PaymentCard__logo" />
            </div>
          </div>
          <div className="PaymentCard__infoBox">
            <p>
              Please note that your card must be activated for online use.
              If you receive an error message, please contact your bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
