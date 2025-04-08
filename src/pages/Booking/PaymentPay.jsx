import React from "react";
import "./../../styles/PaymentPage.css"; 
import defaultPhoto from "./../../assets/images/hotelImages.jpg"; // Örnek resim, fallback olarak kullanabiliriz

const PaymentPay = ({
  hotelName = "Hilton Garden Inn",
  photo = defaultPhoto,
  address = "123 Street, City, Country",
  checkInDate = "2025-05-12",
  checkOutDate = "2025-05-15",
  price = 140,
  onPaymentClick = () => alert("Ödeme İşlemi Başlatıldı!")
}) => {
  return (
    <div className="paymentPay-container">
      <div className="paymentPay-card">
        {/* Otel fotoğrafı */}
        <img src={photo} alt={hotelName} className="paymentPay-img" />

        <div className="paymentPay-content">
          {/* Otel adı */}
          <h3 className="paymentPay-name">{hotelName}</h3>

          {/* Otel adresi */}
          <p className="paymentPay-address">{address}</p>

          {/* Kalınacak tarih bilgisi */}
          <p className="paymentPay-dates">
            Tarih: {checkInDate} - {checkOutDate}
          </p>

          {/* Fiyat bilgisi */}
          <div className="paymentPay-price">
            <span>Fiyat: </span> ${price}
          </div>

          {/* Ödeme butonu */}
          <button className="paymentPay-button" onClick={onPaymentClick}>
            Ödeme Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPay;
