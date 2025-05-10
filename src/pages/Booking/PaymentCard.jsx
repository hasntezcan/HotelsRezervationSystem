import React from "react";
import { useTranslation } from "react-i18next";
import { CiCreditCard1 } from "react-icons/ci";
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
  const { t } = useTranslation();

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

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  return (
    <div className="PaymentCard__container">
      <h2 className="PaymentCard__title">{t("payment_card.title")}</h2>
      <p className="PaymentCard__note">{t("payment_card.note")}</p>

      <div className="PaymentCard__content">
        <div className="PaymentCard__formWrapper">
          <form className="PaymentCard__form">
            {/* First Name */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardName" className="PaymentCard__label">
                {t("payment_card.first_name")}
              </label>
              <input
                id="cardName"
                type="text"
                placeholder={t("payment_card.placeholder_first_name")}
                required
                className="PaymentCard__input"
                value={cardName}
                onChange={handleNameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                title={t("payment_card.only_letters")}
              />
            </div>
            {/* Last Name */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardSurname" className="PaymentCard__label">
                {t("payment_card.last_name")}
              </label>
              <input
                id="cardSurname"
                type="text"
                placeholder={t("payment_card.placeholder_last_name")}
                required
                className="PaymentCard__input"
                value={cardSurname}
                onChange={handleSurnameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                title={t("payment_card.only_letters")}
              />
            </div>
            {/* Card Number */}
            <div className="PaymentCard__form-group">
              <label htmlFor="cardNumber" className="PaymentCard__label">
                {t("payment_card.card_number")}
              </label>
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
                  title={t("payment_card.only_digits")}
                />
              </div>
            </div>
            {/* Expiry & CVC */}
            <div className="PaymentCard__form-row">
              <div className="PaymentCard__form-group">
                <label className="PaymentCard__label">
                  {t("payment_card.expiry")}
                </label>
                <div className="PaymentCard__expiry-container">
                  <select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">{t("payment_card.month")}</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">{t("payment_card.year")}</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* CVC */}
              <div className="PaymentCard__form-group" style={{ position: "relative" }}>
                <label htmlFor="cvc" className="PaymentCard__label">
                  {t("payment_card.cvc")}
                </label>
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
                  title={t("payment_card.only_digits")}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Accepted Payment Methods */}
        <div className="PaymentCard__acceptedWrapper">
          <div className="PaymentCard__accepted">
            <h4 className="PaymentCard__accepted-title">
              {t("payment_card.accepted_title")}
            </h4>
            <div className="PaymentCard__accepted-logos">
              <img src={visaLogo} alt="Visa" className="PaymentCard__logo" />
              <img src={mastercardLogo} alt="MasterCard" className="PaymentCard__logo" />
              <img src={amexLogo} alt="American Express" className="PaymentCard__logo" />
            </div>
          </div>
          <div className="PaymentCard__infoBox">
            <p>{t("payment_card.info_text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
