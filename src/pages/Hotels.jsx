import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import MapView from '../components/MapView';
import FilterSidebar from '../components/Filter-Sidebar/FilterSidebar';
import { Col, Container, Row } from 'reactstrap';
import '../styles/hotel.css';
import { useTranslation } from 'react-i18next';

// hero
import londonImg from '../assets/images/homePage/image6.jpg';
import parisImg from '../assets/images/homePage/image3.jpg';
import baliImg from '../assets/images/homePage/image2.jpg';
import tokyoImg from '../assets/images/homePage/image5.jpg';

const BASE = 'http://localhost:8080/api/hotels';

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */
const cityImages = { London: londonImg, Paris: parisImg, Bali: baliImg, Tokyo: tokyoImg };
const parseNumber = v => (v == null ? null : Number(v));

/** Map DTO → TourCard-friendly object */
const mapDTO = h => ({
  hotelId: h.hotelId,
  name: h.name,
  city: h.city,
  pricePerNight: parseNumber(h.pricePerNight ?? h.minPrice),
  starRating: parseNumber(h.starRating ?? h.avgRating),
  latitude: parseNumber(h.latitude),
  longitude: parseNumber(h.longitude),
  description: h.description || h.shortDescription || h.longDescription || '',
  imgUrl: h.imageUrl || h.primaryImageUrl || '',
  amenities: h.amenities || '', // CSV
});

/** TRUE if hotel satisfies sidebar filters */
const passLocalFilters = (h, f) => {
  if (!f) return true;
  const { priceMin, priceMax, minRating, amenityIds } = f;
  if (priceMin != null && h.pricePerNight < priceMin) return false;
  if (priceMax != null && h.pricePerNight > priceMax) return false;
  if (minRating != null && (h.starRating ?? 0) < minRating) return false;
  if (amenityIds && amenityIds.length) {
    const ids = (h.amenities || '').split(',').map(s => s.trim());
    if (!amenityIds.every(id => ids.includes(id.toString()))) return false;
  }
  return true;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const Hotels = () => {
  const { t } = useTranslation();
  const loc = useLocation();
  const navigate = useNavigate();

  // master meta
  const [cities, setCities] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // ui state
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [showMap, setShowMap] = useState(false); 

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  /* -----------------------   helper builders   -------------------- */
  const cleaned = useCallback(() => {
    const f = { ...filters };
    if (f.priceMin === 0) delete f.priceMin;
    if (f.priceMax === 1000) delete f.priceMax; // slider max
    if (f.minRating === 0) delete f.minRating;
    if (!f.amenityIds?.length) delete f.amenityIds;
    return f;
  }, [filters]);

  const filterQS = useCallback(() => {
    const p = new URLSearchParams();
    const f = cleaned();
    if (selectedCity) p.append('city', selectedCity);
    Object.entries(f).forEach(([k, v]) => {
      if (k === 'amenityIds') v.forEach(id => p.append('amenityIds', id));
      else p.append(k, v);
    });
    return p.toString();
  }, [selectedCity, cleaned]);

  /* -----------------------   data fetch   ------------------------- */
  const fetchHotels = useCallback(async () => {
    if (!selectedCity && !searchTerm) return;
    setLoading(true);

    try {
      let list = [];
      const hasFilter = Object.keys(cleaned()).length > 0;

      if (searchTerm && !hasFilter) {
        const r = await fetch(`${BASE}/search?query=${encodeURIComponent(searchTerm)}`);
        list = (await r.json()).map(mapDTO);
      } else if (searchTerm && hasFilter) {
        const r = await fetch(`${BASE}/filter?${filterQS()}`);
        list = (await r.json()).map(mapDTO)
          .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.city.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        const r = await fetch(`${BASE}/filter?${filterQS()}`);
        list = (await r.json()).map(mapDTO);
      }

      if (searchTerm && !hasFilter && Object.keys(filters).length) {
        list = list.filter(h => passLocalFilters(h, filters));
      }

      setHotels(list);
      setPage(0);
    } catch (e) {
      console.error('fetchHotels', e);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCity, searchTerm, filters, cleaned, filterQS]);

  /* -----------------------   init meta   -------------------------- */
  useEffect(() => {
    fetch(`${BASE}/cities`).then(r => r.json()).then(setCities).catch(console.error);
    fetch('http://localhost:8080/api/hotelamenities').then(r => r.json()).then(setAmenities).catch(() => setAmenities([]));
  }, []);

  /* url params */
  useEffect(() => {
    const q = new URLSearchParams(loc.search);
    if (q.get('city')) setSelectedCity(q.get('city'));
    if (q.get('startDate')) setCheckIn(q.get('startDate'));
    if (q.get('endDate')) setCheckOut(q.get('endDate'));
  }, [loc.search]);

  /* watch deps */
  useEffect(() => { fetchHotels(); }, [fetchHotels]);

  /* -----------------------   handlers   --------------------------- */
  const onSearch = (q, start, end) => {
    setSearchTerm(q);
    setSelectedCity(null);
    setFilters({});
    setCheckIn(start);
    setCheckOut(end);
  };
  const back = () => { setSelectedCity(null); setSearchTerm(''); setFilters({}); setHotels([]); setPage(0); };

  // hotelse tıklanınca resetle (örn. header'da /hotels linkiyle)
  useEffect(() => {
    if (loc.pathname === '/hotels' && !loc.search) {
      back();
    }
  }, [loc.pathname, loc.search]);

  // Hotels.jsx’in üstünde, render’dan önce
  const markers = hotels.map(h => ({
       id: h.hotelId,
       position: [h.latitude, h.longitude],
       popup: (
        <div
        className="map-popup-compact"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          // checkIn / checkOut varsa ekleyelim
          const qs = checkIn && checkOut
            ? `?startDate=${encodeURIComponent(checkIn)}&endDate=${encodeURIComponent(checkOut)}`
            : ''
          navigate(`/hotels/${h.hotelId}${qs}`)
        }}
      >
           <img
             src={h.imgUrl}
             alt={h.name}
             className="map-popup-compact__img"
           />
           <div className="map-popup-compact__title">
             {h.name}
          </div>
           <div className="map-popup-compact__rating">
             {(h.starRating ?? '–')} ★
           </div>
           <div className="map-popup-compact__price">
             ${h.pricePerNight}
           </div>
         </div>
      )
     }));


  /* -----------------------   pagination   ------------------------- */
  const perPage = 8;
  const slice = hotels.slice(page * perPage, page * perPage + perPage);
  const pageCount = Math.ceil(hotels.length / perPage);

  const gridMode = !selectedCity && !searchTerm;
  const listMode = !gridMode;
  const title = selectedCity ? `${selectedCity} ${t('hotels_page.hotels')}`
    : searchTerm ? `${t('hotels_page.search_results')}: “${searchTerm}”`
      : t('hotels_page.all_cities');

        /* -----------------------   render   ----------------------------- */
  return (
    <>
      <CommonSection
        title={title}
        backgroundImage={selectedCity ? cityImages[selectedCity] : null}
      />

      {/* search bar */}
      <section className="search-section">
        <Container>
          <div className="search-bar-wrapper">
            <SearchBar onSearch={onSearch} />
          </div>

          {listMode && (
            <div className="d-flex justify-content-end my-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowMap(v => !v)}
              >
                {showMap                                  // ? t('hotels_page.list_view')
                  ? t('hotels_page.list_view')        // :  t('hotels_page.map_view')} <- eklersin sezom
                  : t('hotels_page.map_view')}        
              </button>
            </div>
          )}
                            
        </Container>
      </section>

   {/* MAP - VIEW */}
    {showMap && listMode && hotels.length > 0 && (
      <section className="map-section pt-0">
        <div className="map-layout container-lg">
          <div>
            <FilterSidebar amenities={amenities} onApply={setFilters} />
          </div>

          <div className="map-holder">
            {loading ? (
              <h5 className="text-center">{t('hotels_page.loading')}</h5>
            ) : (
              <MapView
                center={[hotels[0].latitude, hotels[0].longitude]}
                zoom={selectedCity ? 12 : 2}
                markers={markers}
                
              />
            )}
          </div>
        </div>
      </section>
    )}



      {/* 🏙  grid (şehir seçimi) */}
      {gridMode && (
        <section className="pt-0">
          <Container>
            <h4>{t('hotels_page.select_city')}</h4>
            <div className="city-grid">
              {cities.map((c) => (
                <div
                  key={c}
                  className="city-card"
                  onClick={() => {
                    setSelectedCity(c);
                    setPage(0);
                  }}
                >
                  <div className="city-img">
                    <img src={cityImages[c] || londonImg} alt={c} />
                  </div>
                  <div className="city-info">
                    <h5>{c}</h5>
                    <span className="see-hotels">
                      {t('hotels_page.see_hotels')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 📋  list (filtre + sonuçlar) */}
      {listMode && !showMap && (
  <section className="pt-0 results-section">
    <Container fluid="lg">
      <div className="results-layout">
        {/* sticky sidebar */}
        <FilterSidebar amenities={amenities} onApply={setFilters} />

        {/* kartlar */}
        <div className="hotel-list-wrapper">
          {/* BURADAN BAŞLIYOR */}
          <div className="hotel-grid">
            {loading ? (
              <h5 className="text-center w-100 mt-5">
                {t('hotels_page.loading')}
              </h5>
            ) : slice.length === 0 ? (
              <h5 className="text-center w-100 mt-5">
                {t('hotels_page.no_results')}
              </h5>
            ) : (
              slice.map(h => (
                <div className="hotel-grid-item" key={h.hotelId}>
                  <TourCard
                    tour={{
                      ...h,
                      title: h.name,
                      price: h.pricePerNight,
                      location: h.city,
                      rating: h.starRating ?? t('hotels_page.not_rated'),
                    }}
                    checkIn={checkIn}
                    checkOut={checkOut}
                  />
                </div>
              ))
            )}
          </div>
          {/* VE BURADA BİTİYOR */}

          {/* pagination & back */}
          {!loading && pageCount > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map(i => (
                  <span
                    key={i}
                    onClick={() => setPage(i)}
                    className={page === i ? 'active__page' : ''}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-3">
            <button className="btn btn-secondary" onClick={back}>
              {t('hotels_page.back')}
            </button>
          </div>
        </div>
      </div>
    </Container>
  </section>
)}
    </>
  );
};

export default Hotels;
