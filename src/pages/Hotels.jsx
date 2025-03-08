import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import { Col, Container, Row } from 'reactstrap'
import hotels from '../assets/data/hotels'
import '../styles/hotel.css'

// Belirlediğin HD fotoğrafları import ediyoruz:
import londonImg from '../assets/images/homePage/image6.jpg'
import parisImg from '../assets/images/homePage/image3.jpg'
import baliImg from '../assets/images/homePage/image2.jpg'
import tokyoImg from '../assets/images/homePage/image5.jpg'

const Hotels = () => {
  const [page, setPage] = useState(0)
  const [selectedCity, setSelectedCity] = useState(null)
  
  // Otellerdeki şehir listesini oluşturuyoruz:
  const cities = [...new Set(hotels.map(h => h.city))]

  // Her şehir için uygun arka plan fotoğrafını belirliyoruz:
  const cityImages = {}
  cities.forEach((city) => {
    const hotelsForCity = hotels.filter(h => h.city === city)
    if (city.toLowerCase() === 'london') {
      cityImages[city] = londonImg
    } else if (city.toLowerCase() === 'paris') {
      cityImages[city] = parisImg
    } else if (city.toLowerCase() === 'bali') {
      cityImages[city] = baliImg
    } else if (city.toLowerCase() === 'tokyo') {
      cityImages[city] = tokyoImg
    } else {
      // Diğer şehirler için, varsa ilk otelin fotoğrafı:
      cityImages[city] = hotelsForCity[0]?.photo
    }
  })

  // Seçili şehir varsa, ona ait otelleri filtreliyoruz:
  const filteredHotels = selectedCity ? hotels.filter(h => h.city === selectedCity) : []

  // Sayfalama:
  const toursPerPage = 8
  const start = page * toursPerPage
  const end = start + toursPerPage
  const displayList = selectedCity ? filteredHotels : hotels
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
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {/* Şehir seçilmediyse, şehir kartlarını göster */}
            {!selectedCity && (
              <>
                <h4>Select a City</h4>
                <div className="city-grid">
                  {cities.map((city) => {
                    const cityCount = hotels.filter(h => h.city === city).length
                    return (
                      <div
                        className="city-card"
                        key={city}
                        onClick={() => {
                          setSelectedCity(city)
                          setPage(0)
                        }}
                      >
                        <div className="city-img">
                          <img src={cityImages[city]} alt={city} />
                        </div>
                        <div className="city-info">
                          <h5>{city}</h5>
                          <p>{cityCount} hotels</p>
                          <span className="see-hotels">See Hotels</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="hotels-bottom-line"></div>
              </>
            )}

            {/* Şehir seçildiğinde, o şehirdeki otelleri listeler */}
            {selectedCity && (
              <>
                {currentTours.map(tour => (
                  <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))}
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount).keys()].map(number => (
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
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Hotels


/*
import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
// import tourData from '../assets/data/tours'
import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'


const Tours = () => {
   const [pageCount, setPageCount] = useState(0)
   const [page, setPage] = useState(0)

   const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
   const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

   useEffect(() => {
      const pages = Math.ceil(tourCount / 8)
      setPageCount(pages)
      window.scrollTo(0,0)
   }, [page, tourCount, tours])

   return (
      <>
         <CommonSection title={"All Tours"} />
         <section>
            <Container>
               <Row>
                  <SearchBar />
               </Row>
            </Container>
         </section>

         <section className='pt-0'>
            <Container>
               {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
               {error && <h4 className='text-center pt-5'>{error}</h4>}
               {
                  !loading && !error &&
                  <Row>
                     {
                        tours?.map(tour => (<Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}> <TourCard tour={tour} /> </Col>))
                     }

                     <Col lg='12'>
                        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                           {[...Array(pageCount).keys()].map(number => (
                              <span key={number} onClick={() => setPage(number)}
                                 className={page === number ? 'active__page' : ''}
                              >
                                 {number + 1}
                              </span>
                           ))}
                        </div>
                     </Col>
                  </Row>
               }
            </Container>
         </section>
         <Newsletter />
      </>
   )
}

export default Tours
*/