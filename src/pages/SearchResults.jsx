import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar";
import MapView from "../components/MapView";
import LoadingSpinner from "../shared/Loading/Spinner";

const SearchResults = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const destination = params.get("destination");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const adults = parseInt(params.get("adults")) || 1;
  const children = parseInt(params.get("children")) || 0;

  const [showMap, setShowMap]       = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/hotels/search?query=${destination}`
        );
        const groupSize = adults + children;
        const data = response.data.filter((hotel) => {
          return hotel.capacity == null || hotel.capacity >= groupSize;
        });

        setFilteredHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchHotels();
    }
  }, [destination, adults, children]);

  return (
    <>
      <CommonSection title={t("search_results.title")} />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <SearchBar />
            </Col>
          </Row>

          <div className="d-flex justify-content-end my-3">
           <button
             className="btn btn-outline-primary"
             onClick={() => setShowMap(v => !v)}
           >
             {showMap ? "List View" : "Map View"}
          </button>
         </div>

        </Container>
      </section>

      {showMap && filteredHotels.length > 0 && (
        <Container className="mb-4">
          <MapView
            center={[
              filteredHotels[0].latitude  || 0,
              filteredHotels[0].longitude || 0
            ]}
            zoom={filteredHotels.length === 1 ? 14 : 3}
            markers={filteredHotels.map(h => ({
              id:       h.hotelId,
              position: [h.latitude, h.longitude],
              popup:    `<strong>${h.name}</strong><br/>${h.city}`
            }))}
          />
        </Container>
      )}



      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4">
              <p>
                <strong>{t("search_results.destination")}:</strong> {destination} |{" "}
                <strong>{t("search_results.dates")}:</strong>{" "}
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : t("search_results.unspecified")}{" "}
                -{" "}
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : t("search_results.unspecified")}{" "}
                | <strong>{t("search_results.guests")}:</strong> {adults + children}
              </p>
            </Col>

            {loading ? (
              <LoadingSpinner />
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={hotel.hotelId}>
                  <TourCard tour={hotel} />
                </Col>
              ))
            ) : (
              <Col lg="12">
                <h4 className="text-center">{t("search_results.no_results")}</h4>
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
