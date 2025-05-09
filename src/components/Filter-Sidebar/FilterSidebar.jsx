import React, { useState, useEffect } from 'react';
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
  FormGroup,
} from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './filter-sidebar.css';
import { getAmenityIcon } from '/src/assets/data/amenityIconConfig.jsx';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
};

const FilterSidebar = ({ onApply }) => {
  const { t, i18n } = useTranslation();
  const isDesktop = useIsDesktop();
  const [price, setPrice] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [showInline, setShowInline] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

  // ✅ Dil değiştiğinde amenities'i tekrar fetch et
  useEffect(() => {
    const lang = i18n.language || 'en';
    axios
      .get(`http://localhost:8080/api/hotelamenities?lang=${lang}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAmenities(res.data);
        } else {
          console.warn("Unexpected response for amenities:", res.data);
          setAmenities([]);
        }
      })
      .catch(() => {
        alert("Error fetching amenities");
        setAmenities([]);
      });
  }, [i18n.language]);

  const toggleAmenity = (id) =>
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );

  const applyFilters = () => {
    onApply({
      priceMin: price[0],
      priceMax: price[1],
      minRating: rating,
      amenityIds: selectedAmenities,
    });
    isDesktop ? setShowInline(false) : setOpenMobile(false);
  };

  const Form = (
    <div className="filter-form">
      <div className="filter-section-heading">{t("filter.price")} ($)</div>
      <Slider
        className="filter-slider"
        range
        min={0}
        max={1000}
        step={10}
        value={price}
        onChange={setPrice}
        handleStyle={[
          { borderColor: 'var(--accent-color)' },
          { borderColor: 'var(--accent-color)' }
        ]}
        trackStyle={[{ backgroundColor: 'var(--accent-color)' }]}
        railStyle={{ backgroundColor: '#e0e0e0' }}
      />
      <p className="text-muted">${price[0]} – ${price[1]}</p>

      <div className="filter-section-heading mt-3">{t("filter.rating")}</div>
      <Slider
        className="filter-slider"
        min={0}
        max={5}
        step={0.1}
        value={rating}
        onChange={setRating}
        handleStyle={{ borderColor: 'var(--accent-color)' }}
        trackStyle={{ backgroundColor: 'var(--accent-color)' }}
        railStyle={{ backgroundColor: '#e0e0e0' }}
      />
      <p className="text-muted">{rating.toFixed(1)}</p>

      <div className="filter-section-heading mt-3">{t("filter.features")}</div>
      <div className="amenity-list">
        {amenities.map(a => {
          const icon = getAmenityIcon(a.name);
          return (
            <FormGroup check key={a.amenityId} className="mb-1 d-flex align-items-center gap-1">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a.amenityId)}
                onChange={() => toggleAmenity(a.amenityId)}
              />
              {icon}
              <span>{a.name}</span>
            </FormGroup>
          );
        })}
      </div>

      <Button className="apply-btn mt-3 w-100" onClick={applyFilters}>
        {t("filter.apply_button")}
      </Button>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      {isDesktop && showInline && (
        <aside className="filter-inline">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0 d-flex align-items-center gap-1">
              <i className="ri-filter-3-line" /> {t("filter.title")}
            </h5>
            <Button size="sm" color="light" onClick={() => setShowInline(false)}>
              <i className="ri-close-line" />
            </Button>
          </div>
          {Form}
        </aside>
      )}

      {/* COLLAPSED BUTTON */}
      {isDesktop && !showInline && (
        <button
          className="filter-toggle-btn"
          onClick={() => setShowInline(true)}
          aria-label={t("filter.open_aria_label")}
        >
          <i className="ri-filter-3-line" />
        </button>
      )}

      {/* MOBILE */}
      {!isDesktop && (
        <>
          <Button className="filter-btn-mobile" onClick={() => setOpenMobile(true)}>
            <i className="ri-filter-3-line" />
          </Button>
          <Offcanvas
            isOpen={openMobile}
            toggle={() => setOpenMobile(false)}
            direction="start"
            className="offcanvas-filter"
            unmountOnClose={false}
          >
            <OffcanvasHeader toggle={() => setOpenMobile(false)}>
              {t("filter.title")}
            </OffcanvasHeader>
            <OffcanvasBody>{Form}</OffcanvasBody>
          </Offcanvas>
        </>
      )}
    </>
  );
};

export default FilterSidebar;
