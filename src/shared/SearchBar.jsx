import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../shared/search-bar.css";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city || !startDate || !endDate) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    navigate(
      `/search-results?city=${city}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&adults=${adults}&children=${children}&pets=${pets}`
    );
  };

  return (
    <div className="search-bar">
      {/* Şehir Seçimi */}
      <input
        type="text"
        placeholder="Şehir Seçin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Tarih Seçimi */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Başlangıç Tarihi"
        className="date-picker"
        dateFormat="dd/MM/yyyy"
        locale={tr}
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        placeholderText="Bitiş Tarihi"
        className="date-picker"
        dateFormat="dd/MM/yyyy"
        locale={tr}
      />

      {/* Yolcu Seçimi */}
      <div className="guest-selector">
        <button
          type="button"
          className="guest-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {adults} Yetişkin - {children} Çocuk {pets ? " - Evcil Hayvan Var" : ""}
        </button>

        {dropdownOpen && (
          <div className="guest-dropdown">
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

            <div className="guest-option">
              <span>Evcil Hayvan</span>
              <input
                type="checkbox"
                checked={pets}
                onChange={() => setPets(!pets)}
              />
            </div>

            <button className="guest-close" onClick={() => setDropdownOpen(false)}>
              Tamam
            </button>
          </div>
        )}
      </div>

      {/* Arama Butonu */}
      <button onClick={handleSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;
