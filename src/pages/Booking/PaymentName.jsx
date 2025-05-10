import React from "react";
import { useTranslation } from "react-i18next";
import "./../../styles/PaymentPage.css";

const PaymentName = ({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  phone, setPhone
}) => {
  const { t } = useTranslation();

  const handleFirstNameChange = (e) => {
    const onlyLetters = e.target.value.replace(/[0-9]/g, "");
    setFirstName(onlyLetters);
  };

  const handleLastNameChange = (e) => {
    const onlyLetters = e.target.value.replace(/[0-9]/g, "");
    setLastName(onlyLetters);
  };

  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits);
  };

  return (
    <div className="PaymentName__container">
      <h2 className="PaymentName__title">{t("payment_info.step1")}</h2>
      <p className="PaymentName__note">{t("payment_info.required_note")}</p>
      <form className="PaymentName__form">
        <div className="PaymentName__form-group">
          <label>{t("payment_info.first_name")} *</label>
          <input
            type="text"
            placeholder={t("payment_info.first_name_placeholder")}
            required
            className="PaymentName__input"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>{t("payment_info.last_name")} *</label>
          <input
            type="text"
            placeholder={t("payment_info.last_name_placeholder")}
            required
            className="PaymentName__input"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>{t("payment_info.email")} *</label>
          <input
            type="email"
            placeholder={t("payment_info.email_placeholder")}
            required
            className="PaymentName__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="PaymentName__form-group">
          <label>{t("payment_info.phone")} *</label>
          <input
            type="tel"
            placeholder={t("payment_info.phone_placeholder")}
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
