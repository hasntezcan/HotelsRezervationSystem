import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom' // ✅ Added
import CommonSection from '../shared/CommonSection'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import { Col, Container, Row } from 'reactstrap'
import '../styles/hotel.css'

// Images for cities
import londonImg from '../assets/images/homePage/image6.jpg'
import parisImg from '../assets/images/homePage/image3.jpg'
import baliImg from '../assets/images/homePage/image2.jpg'
import tokyoImg from '../assets/images/homePage/image5.jpg'

const Hotels = () => {
  const [cities, setCities] = useState([])
  const [hotels, setHotels] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const location = useLocation(); // ✅ Get current URL
  const BASE_URL = 'http://localhost:8080/api/hotels'

  const cityImages = {
    London: londonImg,
    Paris: parisImg,
    Bali: baliImg,
    Tokyo: tokyoImg
  }

  // ✅ Read city + dates from query string on first load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cityParam = queryParams.get("city");
    const checkInParam = queryParams.get("startDate");
    const checkOutParam = queryParams.get("endDate");

    if (cityParam && checkInParam && checkOutParam) {
      setSelectedCity(cityParam);
      setCheckIn(checkInParam);
      setCheckOut(checkOutParam);
      setPage(0);
    }
  }, [location.search]);

  // 🔍 onSearch handler from SearchBar
  const handleSearch = (city, start, end) => {
    setSelectedCity(city)
    setCheckIn(start)
    setCheckOut(end)
    setPage(0)
  }

  // Fetch available cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }
    fetchCities()
  }, [])

  // Fetch hotels for selected city
  useEffect(() => {
    const fetchHotelsWithImages = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/search?query=${selectedCity}`)
        const hotelsData = await res.json()

        const hotelsWithImages = hotelsData.map((hotel) => ({
          ...hotel,
          imgUrl: hotel.primaryImageUrl || ''
        }))

        setHotels(hotelsWithImages)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching hotels or images:', err)
        setLoading(false)
      }
    }

    if (selectedCity) {
      fetchHotelsWithImages()
    }
  }, [selectedCity])

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
        backgroundImage={selectedCity ? cityImages[selectedCity] : null}
      />

      <section>
        <Container>
          <Row>
            {/* ✅ Now works for both Home and Hotels */}
            <SearchBar onSearch={handleSearch} />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {!selectedCity && (
              <>
                <h4>Select a City</h4>
                <div className="city-grid">
                  {cities.map((city) => (
                    <div
                      className="city-card"
                      key={city}
                      onClick={() => {
                        setSelectedCity(city)
                        setPage(0)
                      }}
                    >
                      <div className="city-img">
                        <img src={cityImages[city] || londonImg} alt={city} />
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
                            imgUrl: tour.imgUrl,
                            price: tour.pricePerNight,
                            location: tour.city,
                            rating: tour.starRating || 'Not rated'
                          }}
                          checkIn={checkIn}
                          checkOut={checkOut}
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
