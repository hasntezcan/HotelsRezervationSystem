import React from "react";
import { useLocation } from "react-router-dom";
import hotels from "../assets/data/hotels"; 
import { Container, Row, Col } from "reactstrap";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const city = params.get("city");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const people = params.get("people");

  // 1) Şehir filtresi
  let filteredHotels = hotels.filter(
    (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
  );

  // 2) Kişi sayısı filtresi (örneğin maxGroupSize >= people ise müsait)
  if (people) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.maxGroupSize >= parseInt(people)
    );
  }

  // 3) Tarih filtresi (opsiyonel - sadece örnek)
  //    Bu kısım tamamen senin mantığına bağlı; basitçe startDate ve endDate var mı diye bakabilirsin
  //    Gerçek senaryoda otelin o tarihlerde dolu/boş bilgisini bilmek gerekir.
  //    Şimdilik, "city + capacity" örneği yeterli olduğu için geçiyorum.

  return (
    <>
      <CommonSection title="Arama Sonuçları" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4">
              <p>
                <strong>Şehir:</strong> {city} |{" "}
                <strong>Tarih:</strong>{" "}
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "Belirtilmedi"}{" "}
                -{" "}
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "Belirtilmedi"}{" "}
                | <strong>Kişi Sayısı:</strong> {people}
              </p>
            </Col>

            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={hotel._id}>
                  {/* TourCard içinde "tour" prop’u veriyoruz */}
                  <TourCard tour={hotel} />
                </Col>
              ))
            ) : (
              <Col lg="12">
                <h4 className="text-center">Sonuç bulunamadı.</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResults;


/*
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
*/