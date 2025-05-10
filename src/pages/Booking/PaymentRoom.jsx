import React, { useState, useEffect } from "react";
import "./../../styles/PaymentRoom.css";

const PaymentRoom = ({ hotelId }) => {
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (!hotelId) return;

  fetch(`http://localhost:8080/api/hotels/${hotelId}/amenities`)
    .then(res => {
      if (!res.ok) throw new Error("Amenity listesi alınamadı");
      return res.text();
    })
    .then(text => {
      const list = text
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
      setAmenities(list);
    })
    .catch(err => setError(err.message));
}, [hotelId]);
  return (
    <div className="PaymentRoom__container">
      <h2 className="PaymentRoom__title">Step 2: Accommodation Details</h2>

      {/* Otel Amenities */}
      <h3 className="PaymentRoom__subtitle">Hotel Amenities</h3>
      {error && <p className="error">{error}</p>}
      {!error && amenities.length === 0 && (
        <p>Yükleniyor veya müsait amenity yok.</p>
      )}
      {!error && amenities.length > 0 && (
        <ul className="PaymentRoom__grid-list">
          {amenities.map((a, idx) => (
            <li key={idx} className="PaymentRoom__item-box">
              {a}
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default PaymentRoom;
