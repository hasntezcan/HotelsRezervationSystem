import React from "react";
// İsteğe göre "PaymentPage.css" veya "PaymentRoom.css"
import "./../../styles/PaymentRoom.css";

const PaymentRoom = () => {
  return (
    <div className="PaymentRoom__container">
      <h2 className="PaymentRoom__title">Adım 2: Konaklama Yeri Detayları</h2>

      {/* Öne çıkanlar */}
      <div className="PaymentRoom__highlights">
        <h3 className="PaymentRoom__subtitle">Öne çıkanlar</h3>
        <ul className="PaymentRoom__grid-list">
          <li className="PaymentRoom__item-box">Ücretsiz otopark</li>
          <li className="PaymentRoom__item-box">Ücretsiz Kablosuz İnternet</li>
          <li className="PaymentRoom__item-box">Evcil Hayvan Dostu</li>
          <li className="PaymentRoom__item-box">24 Saat Resepsiyon</li>
        </ul>
      </div>

      {/* Oda Bilgisi: Odayı ayrı bir "room-box" içine alıyoruz */}
      <div className="PaymentRoom__room-box">
        <h3 className="PaymentRoom__subtitle">Luxury Tek Büyük Yataklı Oda</h3>
        <ul className="PaymentRoom__grid-list">
          <li className="PaymentRoom__item-box">Kahvaltı mevcut</li>
          <li className="PaymentRoom__item-box">1 büyük (Queen) Boy Yatak</li>
          <li className="PaymentRoom__item-box">Sigara içilen oda</li>
          <li className="PaymentRoom__item-box">Oda Servisi</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentRoom;
