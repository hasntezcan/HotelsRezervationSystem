import React, { useState } from "react";
import "./../../styles/PaymentPage.css";

const PaymentName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleFirstNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    setLastName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  return (
    <div className="PaymentName__container">
      <h2 className="PaymentName__title">Adım 1: Bilgileriniz</h2>
      <p className="PaymentName__note">* doldurulması zorunlu alanlar</p>
      <form className="PaymentName__form">
        <div className="PaymentName__form-group">
          <label htmlFor="firstName">Adı *</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bu odada kalacak misafirlerden birinin adını yazın"
            required
            className="PaymentName__input"
            value={firstName}
            onChange={handleFirstNameChange}
            pattern="^[A-Za-zÇĞİÖŞÜçğıöşü\s]+$"
            title="Sadece harfler ve boşluk kullanılabilir."
          />
        </div>
        <div className="PaymentName__form-group">
          <label htmlFor="lastName">Soyadı *</label>
          <input
            type="text"
            id="lastName"
            placeholder="Soyad"
            required
            className="PaymentName__input"
            value={lastName}
            onChange={handleLastNameChange}
            pattern="^[A-Za-zÇĞİÖŞÜçğıöşü\s]+$"
            title="Sadece harfler ve boşluk kullanılabilir."
          />
        </div>
        <div className="PaymentName__form-group">
          <label htmlFor="email">E-posta adresi *</label>
          <input
            type="email"
            id="email"
            placeholder="Onay e-posta adresiniz"
            required
            className="PaymentName__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="PaymentName__form-group">
          <label htmlFor="phone">Cep telefon numarası *</label>
          <input
            type="tel"
            id="phone"
            placeholder="Telefon numaranızı girin"
            required
            className="PaymentName__input"
            value={phone}
            onChange={handlePhoneChange}
            pattern="^[0-9]+$"
            title="Sadece rakamlar kullanılabilir."
          />
        </div>
      
      </form>
    </div>
  );
};

export default PaymentName;
