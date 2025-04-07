import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import { Col, Container, Row } from 'reactstrap'
import '../styles/hotel.css'

const Hotels = () => {
  const [cities, setCities] = useState([])
  const [hotels, setHotels] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const BASE_URL = 'http://localhost:8080/api/hotels'

  const cityHeaderImages = {
    London: '/hotel_images/london-header.jpg',
    Paris: '/hotel_images/paris-header.jpg',
    Bali: '/hotel_images/bali-header.jpg',
    Tokyo: '/hotel_images/tokyo-header.jpg'
  }

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }

    fetchCities()
  }, [])

  // Fetch hotels when city selected
  const handleCitySelect = async (city) => {
    try {
      setSelectedCity(city)
      setPage(0)
      setLoading(true)
      const response = await fetch(`${BASE_URL}/city?name=${city}`)
      const data = await response.json()
      setHotels(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching hotels:', error)
      setLoading(false)
    }
  }

  const toursPerPage = 8
  const start = page * toursPerPage
  const end = start + toursPerPage
  const displayList = selectedCity ? hotels : []
  const currentTours = displayList.slice(start, end)
  const pageCount = Math.ceil(displayList.length / toursPerPage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page, selectedCity])

  return (
    <>
      <CommonSection
        title={selectedCity ? `${selectedCity} Hotels` : 'All Cities'}
        backgroundImage={selectedCity ? cityHeaderImages[selectedCity] : null}
      />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {/* City Cards */}
            {!selectedCity && (
              <>
                <h4>Select a City</h4>
                <div className="city-grid">
                  {cities.map((city) => (
                    <div
                      className="city-card"
                      key={city}
                      onClick={() => handleCitySelect(city)}
                    >
                      <div className="city-img">
                        <img src={cityHeaderImages[city] || '/hotel_images/default.jpg'} alt={city} />
                      </div>
                      <div className="city-info">
                        <h5>{city}</h5>
                        <span className="see-hotels">See Hotels</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hotels-bottom-line"></div>
              </>
            )}

            {/* Hotel List */}
            {selectedCity && (
              <>
                {loading ? (
                  <h5 className="text-center">Loading hotels...</h5>
                ) : (
                  <>
                    {currentTours.map((tour) => (
                      <Col lg="3" md="6" sm="6" className="mb-4" key={tour.hotelId}>
                        <TourCard
                          tour={{
                            ...tour,
                            title: tour.name,
                            imgUrl: tour.photo, // Should be like: /hotel_images/hotel-img01.jpg
                            price: tour.pricePerNight,
                            location: tour.city,
                            rating: tour.starRating || 'Not rated'
                          }}
                        />
                      </Col>
                    ))}

                    <Col lg="12">
                      <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                        {[...Array(pageCount).keys()].map((number) => (
                          <span
                            key={number}
                            onClick={() => setPage(number)}
                            className={page === number ? 'active__page' : ''}
                          >
                            {number + 1}
                          </span>
                        ))}
                      </div>
                    </Col>

                    <Col lg="12" className="mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setSelectedCity(null)
                          setPage(0)
                        }}
                      >
                        Back to Cities
                      </button>
                    </Col>
                  </>
                )}
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Hotels
