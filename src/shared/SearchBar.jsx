import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../shared/search-bar.css";
import { startOfMonth } from "date-fns";
import { enUS } from "date-fns/locale";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([null, null]);
  const [defaultViewDate, setDefaultViewDate] = useState(startOfMonth(new Date()));
  const [calendarKey, setCalendarKey] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
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
    if (!destination || !dates[0] || !dates[1]) {
      alert("Please fill in all fields!");
      return;
    }

    const formatDateLocal = (date) => {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60000);
      return localDate.toISOString().split("T")[0];
    };

    const checkIn = formatDateLocal(dates[0]);
    const checkOut = formatDateLocal(dates[1]);

    if (onSearch) {
      onSearch(destination, checkIn, checkOut, adults, children);
    } else {
      navigate(`/hotels?city=${destination}&startDate=${checkIn}&endDate=${checkOut}&adults=${adults}&children=${children}`);
    }
  };

  const clearDates = () => {
    setDates([null, null]);
    setDefaultViewDate(startOfMonth(new Date()));
    setCalendarKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={`search-bar-container ${calendarOpen || dropdownOpen ? "overlay-active" : ""}`}>
      {calendarOpen || dropdownOpen ? <div className="blackout-overlay"></div> : null}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="search-input"
        />

        <div className="date-picker-container">
          <DatePicker
            key={calendarKey}
            selected={dates[0]}
            onChange={(update) => setDates(update)}
            startDate={dates[0]}
            endDate={dates[1]}
            selectsRange
            monthsShown={2}
            minDate={new Date()}
            placeholderText="Select dates"
            className="search-date-picker"
            dateFormat="dd MMMM yyyy"
            locale={enUS}
            defaultViewDate={defaultViewDate}
            onCalendarOpen={() => {
              setCalendarOpen(true);
              setDefaultViewDate(startOfMonth(new Date()));
            }}
            onCalendarClose={() => setCalendarOpen(false)}
            onKeyDown={(e) => e.preventDefault()}
          />
          {dates[0] && dates[1] && (
            <IoClose className="clear-date-btn" onClick={clearDates} />
          )}
        </div>

        <div
          className={`passenger-select ${dropdownOpen ? "active" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {adults} Adults - {children} Children
        </div>

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {dropdownOpen && (
        <div className="passenger-dropdown-container">
          <div className="passenger-dropdown" ref={dropdownRef}>
            <div className="guest-option">
              <span>Adults</span>
              <div className="counter">
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>

            <div className="guest-option">
              <span>Children</span>
              <div className="counter">
                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                <span>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>

            <button className="guest-close" onClick={() => setDropdownOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
