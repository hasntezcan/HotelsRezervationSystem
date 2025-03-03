import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../shared/search-bar.css";
import { startOfMonth } from "date-fns";
import { tr } from "date-fns/locale";
import { IoClose } from "react-icons/io5";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [dates, setDates] = useState([null, null]);
  const [defaultViewDate, setDefaultViewDate] = useState(startOfMonth(new Date())); // Default month to current month
  const [calendarKey, setCalendarKey] = useState(0); // Used to force re-render of DatePicker
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!city || !dates[0] || !dates[1]) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    navigate(
      `/search-results?city=${city}&startDate=${dates[0].toISOString()}&endDate=${dates[1].toISOString()}&adults=${adults}&children=${children}&pets=${pets}`
    );
  };

  const clearDates = () => {
    setDates([null, null]); // Reset date selection
    setDefaultViewDate(startOfMonth(new Date())); // Reset to current month
    setCalendarKey(prevKey => prevKey + 1); // Force DatePicker to re-render
  };

  return (
    <div className={`search-bar-container ${calendarOpen || dropdownOpen ? "overlay-active" : ""}`}>
      {calendarOpen || dropdownOpen ? <div className="blackout-overlay"></div> : null}

      <div className="search-bar">
        {/* City Selection */}
        <input
          type="text"
          placeholder="Nereye gitmek istersin?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />

        {/* Date Selection */}
        <div className="date-picker-container">
          <DatePicker
            key={calendarKey} // Forces DatePicker to re-render when reset
            selected={dates[0]}
            onChange={(update) => setDates(update)}
            startDate={dates[0]}
            endDate={dates[1]}
            selectsRange
            monthsShown={2} // Display two months side by side
            minDate={new Date()}
            placeholderText="Tarih Seçin"
            className="search-date-picker"
            dateFormat="dd MMMM yyyy"
            locale={tr}
            defaultViewDate={defaultViewDate} // Ensures calendar starts from current month
            onCalendarOpen={() => setCalendarOpen(true)}
            onCalendarClose={() => setCalendarOpen(false)}
          />
          {dates[0] && dates[1] && (
            <IoClose className="clear-date-btn" onClick={clearDates} />
          )}
        </div>

        {/* Passenger Selection */}
        <div
          className={`passenger-select ${dropdownOpen ? "active" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {adults} Yetişkin - {children} Çocuk {pets ? " - Evcil Hayvan Var" : ""}
        </div>

        {/* Search Button */}
        <button onClick={handleSearch} className="search-button">
          Ara
        </button>
      </div>

      {/* Passenger Dropdown */}
      {dropdownOpen && (
        <div className="passenger-dropdown-container">
          <div className="passenger-dropdown" ref={dropdownRef}>
            <div className="guest-option">
              <span>Yetişkin</span>
              <div className="counter">
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>

            <div className="guest-option">
              <span>Çocuk</span>
              <div className="counter">
                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                <span>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>

            <div className="guest-option pet-option">
              <label>
                <input
                  type="checkbox"
                  checked={pets}
                  onChange={() => setPets(!pets)}
                />
                <span>Evcil Hayvan</span>
              </label>
            </div>

            <button className="guest-close" onClick={() => setDropdownOpen(false)}>
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
