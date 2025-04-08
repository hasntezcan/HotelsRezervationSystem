import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const destination = params.get("destination");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const adults = parseInt(params.get("adults")) || 1;
  const children = parseInt(params.get("children")) || 0;

  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/hotels/search?query=${destination}`
        );
        const groupSize = adults + children;
        const data = response.data.filter(hotel => {
          // Only return hotels with enough capacity (if available)
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
      <CommonSection title="Search Results" />

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
                <strong>Destination:</strong> {destination} |{" "}
                <strong>Dates:</strong>{" "}
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "Not Specified"}{" "}
                -{" "}
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "Not Specified"}{" "}
                | <strong>Guests:</strong> {adults + children}
              </p>
            </Col>

            {loading ? (
              <Col lg="12">
                <h5 className="text-center">Loading hotels...</h5>
              </Col>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={hotel.hotelId}>
                  <TourCard tour={hotel} />
                </Col>
              ))
            ) : (
              <Col lg="12">
                <h4 className="text-center">No results found.</h4>
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
