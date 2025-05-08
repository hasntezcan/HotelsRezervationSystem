import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci"; // Icon
import "./../../styles/PaymentPage.css";
import visaLogo from "./../../assets/images/booking/visa.png";
import mastercardLogo from "./../../assets/images/booking/mastercard.png";
import amexLogo from "./../../assets/images/booking/americanExpress.png";

const PaymentCard = ({
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
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const handleNameChange = (e) => {
    setCardName(e.target.value.replace(/[0-9]/g, ""));
  };
  const handleSurnameChange = (e) => {
    setCardSurname(e.target.value.replace(/[0-9]/g, ""));
  };

  const handleCvcChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.slice(0, 4);
    setCvc(input);
  };

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  return (
    <div className="PaymentCard__container">
      <h2 className="PaymentCard__title">Step 3: Payment Details</h2>
      <p className="PaymentCard__note">We never charge your card without authorization.</p>

      <div className="PaymentCard__content">
        <div className="PaymentCard__formWrapper">
          <form className="PaymentCard__form">
            {/* First Name */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardName" className="PaymentCard__label">First Name</label>
              <input
                id="cardName"
                type="text"
                placeholder="Enter first name"
                required
                className="PaymentCard__input"
                value={cardName}
                onChange={handleNameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                title="Only letters and spaces allowed."
              />
            </div>
            {/* Last Name */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardSurname" className="PaymentCard__label">Last Name</label>
              <input
                id="cardSurname"
                type="text"
                placeholder="Enter last name"
                required
                className="PaymentCard__input"
                value={cardSurname}
                onChange={handleSurnameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                title="Only letters and spaces allowed."
              />
            </div>
            {/* Card Number */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardNumber" className="PaymentCard__label">Card Number</label>
              <div className="PaymentCard__input-wrapper PaymentCard__input-wrapper--icon">
                <CiCreditCard1 className="PaymentCard__icon" />
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  required
                  className="PaymentCard__input PaymentCard__input--card"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  pattern="[0-9\s]+"
                  inputMode="numeric"
                  title="Only digits allowed."
                />
              </div>
            </div>
            {/* Expiry & CVC */}
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
                    {months.map((m) => (<option key={m} value={m}>{m}</option>))}
                  </select>
                  <select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">Year</option>
                    {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                  </select>
                </div>
              </div>
              {/* CVC and Promo Button */}
              <div className="PaymentCard__form-group promo-group" style={{ position: 'relative' }}>
                <label htmlFor="cvc" className="PaymentCard__label">CVC</label>
                <input
                  id="cvc"
                  type="text"
                  placeholder="1234"
                  required
                  className="PaymentCard__input PaymentCard__cvc"
                  minLength={3}
                  maxLength={4}
                  value={cvc}
                  onChange={handleCvcChange}
                  pattern="[0-9]{3,4}"
                  inputMode="numeric"
                  title="Only digits allowed."
                />
                <button
                  type="button"
                  className="apply-promo-btn"
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '-100px',
                    width: '80px',
                    height: '36px'
                  }}
                  onClick={() => setShowPromoModal(true)}
                >Promo</button>
                {showPromoModal && (
                  <div className="promo-popup-overlay">
                    <div className="promo-popup" role="dialog">
                      <h3>Enter Promo Code</h3>
                      <input
                        type="text"
                        className="promo-input"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                      />
                      <div className="promo-popup-buttons">
                        <button
                          className="promo-apply-btn"
                          onClick={() => setShowPromoModal(false)}
                        >Apply</button>
                        <button
                          className="promo-cancel-btn"
                          onClick={() => setShowPromoModal(false)}
                        >Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* Accepted Payment Methods */}
        <div className="PaymentCard__acceptedWrapper">
          <div className="PaymentCard__accepted">
            <h4 className="PaymentCard__accepted-title">We accept the following payment methods</h4>
            <div className="PaymentCard__accepted-logos">
              <img src={visaLogo} alt="Visa" className="PaymentCard__logo" />
              <img src={mastercardLogo} alt="MasterCard" className="PaymentCard__logo" />
              <img src={amexLogo} alt="American Express" className="PaymentCard__logo" />
            </div>
          </div>
          <div className="PaymentCard__infoBox">
            <p>Please note that your card must be activated for online use. If you receive an error message, please contact your bank.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
