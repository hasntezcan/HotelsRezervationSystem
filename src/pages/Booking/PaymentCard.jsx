import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci"; // İkon
import "./../../styles/PaymentPage.css";
import visaLogo from "./../../assets/images/booking/visa.png";
import mastercardLogo from "./../../assets/images/booking/mastercard.png";
import amexLogo from "./../../assets/images/booking/americanExpress.png";

const PaymentCard = () => {
  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    // Yıl/ay kontrolü vb.
    alert("Ödeme işlemi gerçekleştirildi!");
  };

  // Kart numarası format
  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const handleNameChange = (e) => {
    const input = e.target.value.replace(/[0-9]/g, "");
    setCardName(input);
  };

  const handleSurnameChange = (e) => {
    const input = e.target.value.replace(/[0-9]/g, "");
    setCardSurname(input);
  };

  const handleCvcChange = (e) => {
    const input = e.target.value.replace(/[^\d]/g, "");
    setCvc(input);
  };

  // Ay / Yıl
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const currentYearValue = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYearValue + i);

  return (
    <div className="PaymentCard__container">
      <h2 className="PaymentCard__title">Adım 3: Ödeme detayları</h2>
      <p className="PaymentCard__note">
        Hiçbir zaman hiçbir kart ücreti tahsil etmeyiz
      </p>

      <div className="PaymentCard__content">
        {/* Sol sütun */}
        <div className="PaymentCard__formWrapper">
          <form className="PaymentCard__form" onSubmit={handlePayment}>
            <div className="PaymentCard__form-group">
              <label htmlFor="cardName" className="PaymentCard__label">
                Adı
              </label>
              <input
                type="text"
                id="cardName"
                placeholder="Adı"
                required
                className="PaymentCard__input"
                value={cardName}
                onChange={handleNameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                inputMode="text"
                title="Sadece harfler ve boşluk kullanılabilir."
              />
            </div>

            <div className="PaymentCard__form-group">
              <label htmlFor="cardSurname" className="PaymentCard__label">
                Soyadı
              </label>
              <input
                type="text"
                id="cardSurname"
                placeholder="Soyadı"
                required
                className="PaymentCard__input"
                value={cardSurname}
                onChange={handleSurnameChange}
                pattern="[A-Za-zÇĞİÖŞÜçğıöşü\s]+"
                inputMode="text"
                title="Sadece harfler ve boşluk kullanılabilir."
              />
            </div>

            <div className="PaymentCard__form-group">
              <label htmlFor="cardNumber" className="PaymentCard__label">
                Kart Numarası
              </label>
              {/* Sadece kart numarası alanı için ayrı wrapper + özel sınıf */}
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
                  title="Sadece rakamlar kullanılabilir."
                />
              </div>
            </div>

            <div className="PaymentCard__form-row">
              <div className="PaymentCard__form-group">
                <label className="PaymentCard__label">Son Kullanma Tarihi</label>
                <div className="PaymentCard__expiry-container">
                  <select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                    className="PaymentCard__select"
                  >
                    <option value="">Ay</option>
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
                    <option value="">Yıl</option>
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
                  Güvenlik Kodu (CVC)
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="1234"
                  required
                  className="PaymentCard__input PaymentCard__cvc"
                  maxLength="4"
                  value={cvc}
                  onChange={handleCvcChange}
                  pattern="[0-9]+"
                  inputMode="numeric"
                  title="Sadece rakamlar kullanılabilir."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sağ sütun */}
        <div className="PaymentCard__acceptedWrapper">
          <div className="PaymentCard__accepted">
            <h4 className="PaymentCard__accepted-title">
              Aşağıdaki ödeme yöntemlerini kabul ediyoruz
            </h4>
            <div className="PaymentCard__accepted-logos">
              <img src={visaLogo} alt="Visa" className="PaymentCard__logo" />
              <img
                src={mastercardLogo}
                alt="MasterCard"
                className="PaymentCard__logo"
              />
              <img src={amexLogo} alt="American Express" className="PaymentCard__logo" />
            </div>
          </div>
          <div className="PaymentCard__infoBox">
            <p>
              Online kullanımdan önce kredi ve banka kartlarınızın aktive edilmesi gerekebilir.
              Bir hata mesajı alırsanız, lütfen bankanızla irtibat kurun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
