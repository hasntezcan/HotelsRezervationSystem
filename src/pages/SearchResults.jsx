import React from "react";
import { useLocation } from "react-router-dom";
import hotels from "../assets/data/hotels"; 
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

  let filteredHotels = hotels.filter(
    (hotel) => hotel.city.toLowerCase() === destination.toLowerCase()
  );

  if (adults + children) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.maxGroupSize >= adults + children
    );
  }

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
                <strong>Destination:</strong> {destination} | 
                <strong> Dates:</strong>{" "}
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

            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={hotel._id}>
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
