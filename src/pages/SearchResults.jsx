import React from "react";
import { useLocation } from "react-router-dom";
import hotels from "../assets/data/hotels"; // Güncellenmiş otel listesi
import "../shared/search-results.css"; // Stil dosyası

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const people = params.get("people");

  // Seçilen şehirdeki otelleri filtrele
  const filteredHotels = hotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());

  return (
    <div className="search-results">
      <h2>Arama Sonuçları</h2>
      <p>
        <strong>Şehir:</strong> {city} | 
        <strong> Tarih:</strong> {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()} | 
        <strong> Kişi Sayısı:</strong> {people}
      </p>

      {filteredHotels.length > 0 ? (
        <div className="hotel-list">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.photo} alt={hotel.hotelName} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.hotelName}</h3>
                <p><strong>Adres:</strong> {hotel.address}</p>
                <p><strong>Fiyat:</strong> ${hotel.pricePerNight} / gece</p>
                <p><strong>Puan:</strong> {hotel.rating} ⭐</p>
                <p><strong>Olanaklar:</strong> {hotel.amenities.join(", ")}</p>
                <button className="book-button">Rezervasyon Yap</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchResults;
