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

const amenityIcons = {
  wifi: 'ri-wifi-line',
  breakfast: 'ri-restaurant-2-line',
  swimming: 'ri-swim-line',
  pool: 'ri-swim-line',
  gym: 'ri-dumbbell-line',
  bar: 'ri-cup-line',
  beach: 'ri-sailboat-line',
  view: 'ri-building-2-line',
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
};

const FilterSidebar = ({ amenities = [], onApply }) => {
  const isDesktop = useIsDesktop();
  const [price, setPrice] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [showInline, setShowInline] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

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
      <div className="filter-section-heading">Price ($)</div>
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

      <div className="filter-section-heading mt-3">Minimum Rating</div>
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

      <div className="filter-section-heading mt-3">Amenities</div>
      <div className="amenity-list">
        {amenities.map(a => {
          const key = a.name.toLowerCase().split(' ')[0];
          const icon = amenityIcons[key] || 'ri-checkbox-blank-line';
          return (
            <FormGroup check key={a.amenityId} className="mb-1 d-flex align-items-center gap-1">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a.amenityId)}
                onChange={() => toggleAmenity(a.amenityId)}
              />
              <i className={icon} />
              <span>{a.name}</span>
            </FormGroup>
          );
        })}
      </div>

      <Button className="apply-btn mt-3 w-100" onClick={applyFilters}>
        Apply
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
              <i className="ri-filter-3-line" /> Filters
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
          aria-label="Open filters"
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
            className="offcanvas-sm"
            unmountOnClose={false}
          >
            <OffcanvasHeader toggle={() => setOpenMobile(false)}>Filters</OffcanvasHeader>
            <OffcanvasBody>{Form}</OffcanvasBody>
          </Offcanvas>
        </>
      )}
    </>
  );
};

export default FilterSidebar;