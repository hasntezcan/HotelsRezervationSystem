import React from "react";
import { useLocation } from "react-router-dom";
import hotels from "../assets/data/hotels"; 
import { Container, Row, Col } from "reactstrap";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar"; // ✅ SearchBar'ı ekledik

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const city = params.get("city");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const people = params.get("people");

  let filteredHotels = hotels.filter(
    (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
  );

  if (people) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.maxGroupSize >= parseInt(people)
    );
  }

  return (
    <>
      <CommonSection title="Arama Sonuçları" />
      
      {/* ✅ Arama Çubuğunu Buraya Ekledik */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </section>

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
