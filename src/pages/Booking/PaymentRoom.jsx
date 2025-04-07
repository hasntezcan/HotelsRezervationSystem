import React from "react";
import "./../../styles/PaymentPage.css"; // Ana container stilleri

const PaymentRoom = () => {
  return (
    <div className="PaymentRoom__container">
      <h2 className="PaymentRoom__title">Adım 2: Konaklama yeri detayları</h2>

      {/* Konaklama yerinde öne çıkanlar */}
      <div className="PaymentRoom__highlights">
        <h3 className="PaymentRoom__subtitle">Konaklama yerinde öne çıkanlar</h3>
        <ul className="PaymentRoom__icons-list">
          <li className="PaymentRoom__icon-item">Ücretsiz otopark</li>
          <li className="PaymentRoom__icon-item">Ücretsiz Kablosuz İnternet</li>
          <li className="PaymentRoom__icon-item">Evcil Hayvan Dostu</li>
          {/* İsterseniz buraya başka öne çıkan özellikler ekleyebilirsiniz */}
        </ul>
      </div>

      {/* Oda Bilgisi */}
      <div className="PaymentRoom__room-info">
  <h3 className="PaymentRoom__room-title">Luxury Tek Büyük Yataklı Oda</h3>
  <ul className="PaymentRoom__room-included-list">
    <li className="PaymentRoom__room-included-item">Ücretsiz Kablosuz İnternet</li>
    <li className="PaymentRoom__room-included-item">Kahvaltı mevcut (otelde ödeyin)</li>
    <li className="PaymentRoom__room-included-item">1 büyük (Queen) Boy Yatak</li>
    <li className="PaymentRoom__room-included-item">Sigara içilen</li>
  </ul>
</div>

    </div>
  );
};

export default PaymentRoom;
